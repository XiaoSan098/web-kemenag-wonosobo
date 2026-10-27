/**
 * Klien API admin — pembungkus tipis di atas fetch untuk server/index.js.
 *
 * Semua panggilan di sini MENULIS ke server (sumber kebenaran bersama).
 * Salinan localStorage tetap dipakai store.js sebagai cache luring, bukan
 * tujuan penyimpanan utama.
 *
 * Bila server tidak terjangkau (mis. situs diterbitkan sebagai hosting statis),
 * setiap fungsi melempar ApiError dengan status 0 sehingga panel admin bisa
 * turun ke mode luring alih-alih macet.
 */

const TOKEN_KEY = 'kew_admin_token'
const LOCAL_KEY = 'kew_admin_local'

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

/** Pemulihan sesi saat panel dibuka ulang: 'server' | 'local' | null. */
export function restoreSession() {
  if (getToken()) return 'server'
  if (isLocalSession()) return 'local'
  return null
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

/** Cek apakah backend benar-benar tersedia (bukan hosting statis). */
export async function probeServer() {
  try {
    const data = await request('/api/data')
    return Array.isArray(data?.seksi)
  } catch {
    return false
  }
}

/**
 * Masuk sebagai admin dengan username dan password. Sukses → token disimpan di sessionStorage.
 * @throws {ApiError} status 401 bila kredensial salah, status 0 bila server mati.
 */
export async function login(username, password) {
  // Dukung jika dipanggil dengan satu argumen (hanya password)
  const user = password !== undefined ? username : 'admin'
  const pass = password !== undefined ? password : username
  const { token } = await request('/api/login', { method: 'POST', body: { username: user, password: pass } })
  if (!token) throw new ApiError('Server tidak mengirim token masuk.', 0)
  try { store()?.setItem(TOKEN_KEY, token) } catch { /* abaikan */ }
  clearLocalSession()
  return token
}

/** Akhiri sesi di server (token juga dibuang dari sisi klien). */
export async function logout() {
  try {
    await request('/api/logout', { method: 'POST' })
  } catch { /* token bisa dibuang walau server tak menjawab */ }
  clearToken()
  clearLocalSession()
}

/** Simpan seluruh snapshot { units, seksi, social } ke server. */
export function saveSnapshot(data) {
  return request('/api/data', { method: 'PUT', body: data })
}

/** Kembalikan data server ke bawaan paket. */
export function resetServer() {
  return request('/api/reset', { method: 'POST' })
}

/** Unggah satu berkas, kembalikan URL publiknya (mis. /uploads/foto-....jpg). */
export async function uploadFile(file) {
  const form = new FormData()
  form.append('file', file)
  const { url } = await request('/api/upload', { method: 'POST', form })
  if (!url) throw new ApiError('Server tidak mengembalikan URL berkas.', 0)
  return url
}
