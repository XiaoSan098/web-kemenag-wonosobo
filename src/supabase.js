/**
 * Integrasi Supabase (Auth, Database PostgREST, dan Storage)
 * untuk Portal Layanan & Panel Admin Kemenag Kabupaten Wonosobo.
 *
 * Aktif secara otomatis apabila VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY
 * diatur pada berkas .env (atau Environment Variables di Vercel).
 */

const ENV = (typeof import.meta !== 'undefined' && import.meta.env) ? import.meta.env : {}

const RAW_URL = String(
  ENV.VITE_SUPABASE_URL || 'https://nhxvvmxnmvmkqnqwtjis.supabase.co'
)
  .trim()
  .replace(/\/+$/, '')
  .replace(/\/rest\/v1$/i, '')
const SUPABASE_KEY = String(
  ENV.VITE_SUPABASE_ANON_KEY ||
  ENV.VITE_SUPABASE_PUBLISHABLE_KEY ||
  'sb_publishable_SYwxd2gMC39i6r2y525Ggg_t2d2fmyB'
).trim()
const DEFAULT_ADMIN_EMAIL = String(
  ENV.VITE_SUPABASE_ADMIN_EMAIL || 'admin@kemenagwonosobo.id'
).trim()

const SB_SESSION_KEY = 'kew_supabase_session'
const STORAGE_BUCKET = 'uploads'

export function isSupabaseConfigured() {
  return Boolean(RAW_URL && SUPABASE_KEY && RAW_URL.startsWith('http'))
}

function getStorage() {
  try { return typeof sessionStorage !== 'undefined' ? sessionStorage : null } catch { return null }
}

export function getSupabaseSession() {
  const raw = getStorage()?.getItem(SB_SESSION_KEY)
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw)
    return parsed && parsed.access_token ? parsed : null
  } catch {
    return null
  }
}

function saveSupabaseSession(session) {
  if (!session?.access_token) return
  const expiresAt = session.expires_at
    ? session.expires_at * 1000
    : Date.now() + (Number(session.expires_in || 3600) * 1000)
  const payload = {
    access_token: session.access_token,
    refresh_token: session.refresh_token || '',
    expires_at: expiresAt,
    user: session.user || null
  }
  try {
    getStorage()?.setItem(SB_SESSION_KEY, JSON.stringify(payload))
  } catch { /* abaikan */ }
}

export function clearSupabaseSession() {
  try { getStorage()?.removeItem(SB_SESSION_KEY) } catch { /* abaikan */ }
}

/**
 * Mengambil access_token Supabase yang masih berlaku; otomatis me-refresh
 * lewat refresh_token jika masa aktifnya hampir habis.
 */
export async function getValidSupabaseToken() {
  const session = getSupabaseSession()
  if (!session) return ''

  // Jika masih berlaku lebih dari 60 detik, langsung gunakan
  if (session.expires_at && Date.now() < session.expires_at - 60_000) {
    return session.access_token
  }

  if (!session.refresh_token || !isSupabaseConfigured()) {
    return session.access_token || ''
  }

  try {
    const res = await fetch(`${RAW_URL}/auth/v1/token?grant_type=refresh_token`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ refresh_token: session.refresh_token })
    })
    if (!res.ok) {
      clearSupabaseSession()
      return ''
    }
    const refreshed = await res.json()
    saveSupabaseSession(refreshed)
    return refreshed.access_token || ''
  } catch {
    return session.access_token || ''
  }
}

/**
 * Verifikasi sesi aktif langsung ke Supabase Auth (/auth/v1/user)
 * untuk keperluan Protected Route pada halaman Admin.
 */
export async function verifySupabaseSession() {
  if (!isSupabaseConfigured()) return null
  const token = await getValidSupabaseToken()
  if (!token) return null

  try {
    const res = await fetch(`${RAW_URL}/auth/v1/user`, {
      method: 'GET',
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${token}`
      }
    })
    if (!res.ok) {
      clearSupabaseSession()
      return null
    }
    const user = await res.json()
    return user && user.id ? user : null
  } catch {
    // Jika sedang gangguan jaringan sesaat, pertahankan sesi lokal sementara
    return getSupabaseSession()?.user || null
  }
}

/**
 * Login ke Supabase Auth dengan email (atau username 'admin' yang dipetakan ke email admin) & password.
 */
export async function supabaseSignIn(identifier, password) {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase belum dikonfigurasi pada .env')
  }
  const cleanId = String(identifier || '').trim()
  const email = cleanId.includes('@')
    ? cleanId
    : (cleanId.toLowerCase() === 'admin' ? DEFAULT_ADMIN_EMAIL : `${cleanId}@kemenagwonosobo.id`)

  let res = await fetch(`${RAW_URL}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })

  let data = await res.json().catch(() => null)

  // Jika akun admin utama belum terdaftar di Supabase Auth, coba daftarkan otomatis (signup)
  if ((!res.ok || !data?.access_token) && email === DEFAULT_ADMIN_EMAIL && password.length >= 6) {
    const signupRes = await fetch(`${RAW_URL}/auth/v1/signup`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    }).catch(() => null)

    if (signupRes && signupRes.ok) {
      const signupData = await signupRes.json().catch(() => null)
      if (signupData?.access_token) {
        saveSupabaseSession(signupData)
        return signupData
      }
    }
  }

  if (!res.ok || !data?.access_token) {
    const msg = data?.msg || data?.error_description || data?.error || 'Email atau kata sandi Supabase tidak sesuai.'
    const err = new Error(msg)
    err.status = res.status || 401
    throw err
  }

  saveSupabaseSession(data)
  return data
}

/**
 * Logout dari Supabase Auth & hapus token dari penyimpanan sesi.
 */
export async function supabaseSignOut() {
  const token = getSupabaseSession()?.access_token
  clearSupabaseSession()
  if (!isSupabaseConfigured() || !token) return
  try {
    await fetch(`${RAW_URL}/auth/v1/logout`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${token}`
      }
    })
  } catch { /* abaikan jika jaringan terputus */ }
}

/**
 * Membaca snapshot data portal dari tabel public.portal_data di Supabase.
 */
export async function supabaseLoadData() {
  if (!isSupabaseConfigured()) return null
  const headers = {
    apikey: SUPABASE_KEY,
    Accept: 'application/json'
  }
  // Hanya sertakan Authorization Bearer jika menggunakan legacy anon JWT (eyJ...)
  if (SUPABASE_KEY.startsWith('eyJ')) {
    headers.Authorization = `Bearer ${SUPABASE_KEY}`
  }
  const res = await fetch(`${RAW_URL}/rest/v1/portal_data?id=eq.main&select=payload,updated_at`, {
    method: 'GET',
    headers
  })
  if (!res.ok) throw new Error(`Gagal memuat data Supabase (HTTP ${res.status})`)
  const rows = await res.json()
  if (!Array.isArray(rows) || !rows.length || !rows[0]?.payload) return null
  return rows[0].payload
}

/**
 * Menyimpan snapshot { units, seksi, social, kepalaKantor } ke tabel public.portal_data di Supabase.
 */
export async function supabaseSaveData(payload) {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase belum dikonfigurasi.')
  }
  const token = await getValidSupabaseToken()
  if (!token) {
    const err = new Error('Sesi Supabase Auth berakhir. Silakan masuk kembali.')
    err.status = 401
    throw err
  }

  const user = getSupabaseSession()?.user
  const body = {
    id: 'main',
    payload,
    updated_at: new Date().toISOString(),
    ...(user?.id ? { updated_by: user.id } : {})
  }

  const res = await fetch(`${RAW_URL}/rest/v1/portal_data?on_conflict=id`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Prefer: 'resolution=merge-duplicates,return=minimal'
    },
    body: JSON.stringify(body)
  })

  if (!res.ok) {
    const errData = await res.json().catch(() => null)
    const err = new Error(errData?.message || errData?.error || `Gagal menyimpan ke Supabase (HTTP ${res.status})`)
    err.status = res.status
    throw err
  }
  return { ok: true }
}

/**
 * Mengunggah foto / berkas ke Supabase Storage (bucket: "uploads")
 * dan mengembalikan URL publiknya.
 */
export async function supabaseUploadFile(file) {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase belum dikonfigurasi.')
  }
  const token = await getValidSupabaseToken()
  if (!token) {
    const err = new Error('Sesi Supabase Auth berakhir. Silakan masuk kembali.')
    err.status = 401
    throw err
  }

  const extMatch = String(file.name || '').toLowerCase().match(/\.[a-z0-9]+$/)
  const ext = extMatch ? extMatch[0] : '.jpg'
  const base = String(file.name || 'berkas')
    .replace(/\.[^/.]+$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 40) || 'berkas'
  const rand = Math.random().toString(36).slice(2, 8)
  const folder = file.type?.startsWith('image/') ? 'pegawai' : 'dokumen'
  const objectPath = `${folder}/${base}-${Date.now()}-${rand}${ext}`

  const res = await fetch(`${RAW_URL}/storage/v1/object/${STORAGE_BUCKET}/${objectPath}`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${token}`,
      'Content-Type': file.type || 'application/octet-stream',
      'x-upsert': 'true'
    },
    body: file
  })

  if (!res.ok) {
    const errData = await res.json().catch(() => null)
    const err = new Error(errData?.message || errData?.error || `Unggah ke Supabase Storage gagal (HTTP ${res.status})`)
    err.status = res.status
    throw err
  }

  return `${RAW_URL}/storage/v1/object/public/${STORAGE_BUCKET}/${objectPath}`
}

