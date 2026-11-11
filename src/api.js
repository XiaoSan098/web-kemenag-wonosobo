/**
 * Klien API admin — mendukung 3 mode penyimpanan & autentikasi secara berurutan:
 * 1. Supabase (Auth + PostgreSQL + Storage) bila VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY aktif
 * 2. Backend Express + MySQL (server/index.js)
 * 3. Mode Luring / Penyimpanan Lokal Browser (fallback otomatis tanpa error 404)
 */

import {
  clearSupabaseSession,
  getSupabaseSession,
  isSupabaseConfigured,
  supabaseLoadData,
  supabaseSaveData,
  supabaseSignIn,
  supabaseSignOut,
  supabaseUploadFile,
  verifySupabaseSession
} from './supabase.js'

const TOKEN_KEY = 'kew_admin_token'
const LOCAL_KEY = 'kew_admin_local'

export { isSupabaseConfigured, supabaseLoadData }

export class ApiError extends Error {
  constructor(message, status = 0) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

function store() {
  try { return sessionStorage } catch { return null }
}

export function getToken() {
  return store()?.getItem(TOKEN_KEY) || ''
}

export function clearToken() {
  try { store()?.removeItem(TOKEN_KEY) } catch { /* abaikan */ }
}

/** Tandai sesi luring (tanpa server) yang dibuka lewat PIN lokal. */
export function markLocalSession() {
  try { store()?.setItem(LOCAL_KEY, '1') } catch { /* abaikan */ }
}

export function isLocalSession() {
  try { return store()?.getItem(LOCAL_KEY) === '1' } catch { return false }
}

function clearLocalSession() {
  try { store()?.removeItem(LOCAL_KEY) } catch { /* abaikan */ }
}

/** Pemulihan sesi saat panel dibuka ulang: 'supabase' | 'server' | 'local' | null. */
export function restoreSession() {
  if (isSupabaseConfigured() && getSupabaseSession()?.access_token) return 'supabase'
  if (getToken()) return 'server'
  if (isLocalSession()) return 'local'
  return null
}

/**
 * Verifikasi sesi aktif untuk Protected Route (#/admin).
 * Jika memakai Supabase Auth dan token sudah tidak valid/kedaluwarsa, kembalikan null
 * sehingga pengguna diarahkan kembali ke halaman Login.
 */
export async function verifyAdminSession() {
  const current = restoreSession()
  if (!current) return null
  if (current === 'supabase') {
    const user = await verifySupabaseSession()
    return user ? 'supabase' : null
  }
  return current
}

function authHeaders() {
  const token = getToken()
  return token ? { 'x-admin-token': token } : {}
}

async function request(path, { method = 'GET', body, form } = {}) {
  let res
  try {
    res = await fetch(path, {
      method,
      headers: {
        ...(form ? {} : body ? { 'Content-Type': 'application/json' } : {}),
        ...authHeaders()
      },
      body: form || (body ? JSON.stringify(body) : undefined)
    })
  } catch {
    throw new ApiError('Server tidak terjangkau. Perubahan belum tersimpan di server.', 0)
  }

  // Hosting statis bisa membalas index.html untuk rute apa pun → bukan JSON.
  const data = await res.json().catch(() => null)

  if (!res.ok) {
    if (res.status === 401) clearToken()
    throw new ApiError(data?.error || `Permintaan gagal (HTTP ${res.status})`, res.status)
  }
  if (!data) throw new ApiError('Respons server tidak dikenali.', 0)
  return data
}

/** Cek apakah backend atau Supabase benar-benar tersedia. */
export async function probeServer() {
  if (isSupabaseConfigured()) return true
  try {
    const data = await request('/api/data')
    return Array.isArray(data?.seksi)
  } catch {
    return false
  }
}

/**
 * Masuk sebagai admin:
 * - Jika Supabase dikonfigurasi, masuk lewat Supabase Auth (email/username & password).
 * - Jika tidak, masuk lewat backend Express (/api/login).
 */
export async function login(username, password) {
  const user = password !== undefined ? username : 'admin'
  const pass = password !== undefined ? password : username

  if (isSupabaseConfigured()) {
    const session = await supabaseSignIn(user, pass)
    clearToken()
    clearLocalSession()
    return { mode: 'supabase', token: session.access_token, user: session.user }
  }

  const { token } = await request('/api/login', { method: 'POST', body: { username: user, password: pass } })
  if (!token) throw new ApiError('Server tidak mengirim token masuk.', 0)
  try { store()?.setItem(TOKEN_KEY, token) } catch { /* abaikan */ }
  clearLocalSession()
  return { mode: 'server', token }
}

/** Akhiri sesi di Supabase / server (token juga dibuang dari sisi klien). */
export async function logout() {
  await supabaseSignOut()
  if (getToken()) {
    try {
      await request('/api/logout', { method: 'POST' })
    } catch { /* token bisa dibuang walau server tak menjawab */ }
  }
  clearSupabaseSession()
  clearToken()
  clearLocalSession()
}

/** Simpan seluruh snapshot { units, seksi, social, kepalaKantor } ke Supabase atau server. */
export async function saveSnapshot(data) {
  if (isSupabaseConfigured() && getSupabaseSession()?.access_token) {
    return supabaseSaveData(data)
  }
  return request('/api/data', { method: 'PUT', body: data })
}

/** Kembalikan data Supabase atau server ke bawaan paket. */
export async function resetServer(defaultData) {
  if (isSupabaseConfigured() && getSupabaseSession()?.access_token && defaultData) {
    return supabaseSaveData(defaultData)
  }
  return request('/api/reset', { method: 'POST' })
}

/**
 * Konversi berkas gambar menjadi Data URL terkompresi (maks 800px, WebP/JPEG)
 * agar ringan disimpan di localStorage / JSON tanpa memerlukan server upload.
 */
function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(new ApiError('Gagal membaca berkas dari perangkat.', 0))
    reader.readAsDataURL(file)
  })
}

async function compressImageToDataUrl(file, maxDim = 1200, quality = 0.92) {
  const rawDataUrl = await fileToDataUrl(file)
  if (!file.type.startsWith('image/') || file.type === 'image/svg+xml' || file.size <= 60 * 1024) {
    return rawDataUrl
  }

  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      try {
        let { width, height } = img
        if (width > maxDim || height > maxDim) {
          if (width >= height) {
            height = Math.round((height * maxDim) / width)
            width = maxDim
          } else {
            width = Math.round((width * maxDim) / height)
            height = maxDim
          }
        }
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          resolve(rawDataUrl)
          return
        }
        ctx.drawImage(img, 0, 0, width, height)
        let compressed = canvas.toDataURL('image/webp', quality)
        if (!compressed.startsWith('data:image/webp')) {
          compressed = canvas.toDataURL('image/jpeg', quality)
        }
        resolve(compressed.length < rawDataUrl.length ? compressed : rawDataUrl)
      } catch {
        resolve(rawDataUrl)
      }
    }
    img.onerror = () => resolve(rawDataUrl)
    img.src = rawDataUrl
  })
}

/**
 * Unggah satu berkas:
 * 1. Jika Supabase Auth & Storage aktif, unggah ke bucket "uploads" di Supabase Storage.
 * 2. Jika backend Express aktif & memiliki token server, unggah ke POST /api/upload.
 * 3. Jika berada di mode lokal / hosting statis (atau endpoint /api/upload mengembalikan 404),
 *    otomatis konversi & kompres foto di sisi klien menjadi Data URL agar unggah foto selalu berhasil.
 */
export async function uploadFile(file) {
  if (!file) throw new ApiError('Tidak ada berkas yang dipilih.', 400)

  // 1. Coba unggah ke Supabase Storage bila terautentikasi lewat Supabase
  if (isSupabaseConfigured() && getSupabaseSession()?.access_token) {
    try {
      return await supabaseUploadFile(file)
    } catch (sbErr) {
      // Jika gagal karena bucket belum dibuat atau jaringan, jatuh ke kompresi lokal untuk gambar
      if (!file.type.startsWith('image/')) {
        throw new ApiError(sbErr.message || 'Gagal mengunggah berkas ke Supabase Storage.', sbErr.status || 500)
      }
    }
  }

  // 2. Coba unggah ke backend Express bila memiliki token server
  const canTryServer = !isLocalSession() && Boolean(getToken())
  if (canTryServer) {
    try {
      const form = new FormData()
      form.append('file', file)
      const { url } = await request('/api/upload', { method: 'POST', form })
      if (url) return url
    } catch (err) {
      if (err instanceof ApiError && (err.status === 400 || err.status === 413)) {
        throw err
      }
    }
  }

  // 3. Fallback kompresi gambar lokal (Data URL)
  if (file.type.startsWith('image/')) {
    return compressImageToDataUrl(file)
  }

  if (file.size > 4 * 1024 * 1024) {
    throw new ApiError('Berkas terlalu besar untuk mode penyimpanan lokal (maks 4 MB untuk non-gambar).', 413)
  }
  return fileToDataUrl(file)
}
