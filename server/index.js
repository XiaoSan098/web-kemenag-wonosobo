// Backend ringan untuk portal Kemenag Wonosobo:
// - API data unit/layanan (penyimpanan MySQL — lihat server/db.js)
// - Unggah berkas (multer) ke folder uploads/
// - Autentikasi admin sederhana lewat token (password dari .env / ADMIN_PASSWORD)
// - Mode produksi: melayani hasil build Vite dari folder dist/
//
// Bentuk data mengikuti src/store.js: { units, seksi, social }.
//
// MySQL adalah satu-satunya sumber kebenaran (tanpa berkas cadangan db.json),
// sesuai pilihan: bila MySQL tidak terjangkau, peladen ini menolak hidup agar
// kegagalan terdengar jelas alih-alih menyajikan data basi.

import express from 'express'
import multer from 'multer'
import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createLoginLimiter, getAdminUsername, requireAdminPassword, requireDatabasePassword } from './security.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const UPLOAD_DIR = path.join(__dirname, '..', 'uploads')

// Muat .env sebelum db.js membuat pool agar kredensialnya tidak memakai nilai bawaan.
const envPath = path.join(__dirname, '..', '.env')
if (fs.existsSync(envPath)) process.loadEnvFile(envPath)

fs.mkdirSync(UPLOAD_DIR, { recursive: true })

const ADMIN_PASSWORD = requireAdminPassword()
const ADMIN_USERNAME = getAdminUsername()
requireDatabasePassword()
const tokens = new Set() // token aktif (memori; cukup untuk admin tunggal)
const loginLimiter = createLoginLimiter()

const {
  ensureSchema, seedIfEmpty, ping, loadSnapshot, saveSnapshot, resetSnapshot
} = await import('./db.js')

// ---------- Aplikasi ----------

const app = express()
app.use(express.json({ limit: '10mb' }))

const requireAdmin = (req, res, next) => {
  if (tokens.has(req.get('x-admin-token'))) next()
  else res.status(401).json({ error: 'Tidak diizinkan' })
}

// Bungkus handler async agar galat basis data menjadi JSON 5xx, bukan HTML 500.
const wrap = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

app.post('/api/login', (req, res) => {
  const ip = req.ip
  if (loginLimiter.isBlocked(ip)) {
    res.set('Retry-After', String(loginLimiter.retryAfter(ip)))
    return res.status(429).json({ error: 'Terlalu banyak percobaan masuk. Coba lagi nanti.' })
  }

  const { username, password } = req.body || {}
  const uUser = Buffer.from(String(username ?? ''))
  const uExpected = Buffer.from(ADMIN_USERNAME)
  const isUserValid = uUser.length === uExpected.length && crypto.timingSafeEqual(uUser, uExpected)

  const a = Buffer.from(String(password ?? ''))
  const b = Buffer.from(ADMIN_PASSWORD)
  const isPassValid = password && a.length === b.length && crypto.timingSafeEqual(a, b)

  if (isUserValid && isPassValid) {
    loginLimiter.clear(ip)
    const token = crypto.randomBytes(24).toString('hex')
    tokens.add(token)
    res.json({ token, username: ADMIN_USERNAME })
  } else {
    loginLimiter.recordFailure(ip)
    res.status(401).json({ error: 'Nama pengguna (username) atau kata sandi salah' })
  }
})

app.post('/api/logout', requireAdmin, (req, res) => {
  tokens.delete(req.get('x-admin-token'))
  res.json({ ok: true })
})

app.get('/api/data', wrap(async (req, res) => {
  res.json(await loadSnapshot())
}))

// Ganti seluruh snapshot data sekaligus — dipakai tombol Simpan di panel admin,
// yang mendukung tambah/hapus unit dan penyuntingan kanal media sosial.
// Dilakukan dalam satu transaksi: bila gagal, data lama tetap utuh.
app.put('/api/data', requireAdmin, wrap(async (req, res) => {
  const body = req.body || {}
  if (!Array.isArray(body.units) || !Array.isArray(body.seksi) || !Array.isArray(body.social)) {
    return res.status(400).json({ error: 'Struktur tidak sesuai (wajib ada units, seksi, social)' })
  }
  const idUnik = (list) => {
    const ids = list.map(u => u?.id)
    return ids.length === new Set(ids).size
  }
  if (!idUnik(body.units) || !idUnik(body.seksi)) {
    return res.status(400).json({ error: 'Ada id unit yang kosong atau ganda' })
  }
  await saveSnapshot({ units: body.units, seksi: body.seksi, social: body.social })
  res.json({ ok: true })
}))

// Perbarui satu unit — dicari di kedua koleksi (units = sub-unit TU, seksi = unit utama).
app.put('/api/units/:id', requireAdmin, wrap(async (req, res) => {
  const body = req.body || {}
  if (body.id !== req.params.id) return res.status(400).json({ error: 'ID unit tidak cocok' })

  const db = await loadSnapshot()
  const inUnits = db.units.findIndex(u => u.id === req.params.id)
  if (inUnits !== -1) {
    db.units[inUnits] = body
    await saveSnapshot(db)
    return res.json({ ok: true, koleksi: 'units' })
  }

  const inSeksi = db.seksi.findIndex(u => u.id === req.params.id)
  if (inSeksi !== -1) {
    db.seksi[inSeksi] = body
    await saveSnapshot(db)
    return res.json({ ok: true, koleksi: 'seksi' })
  }

  res.status(404).json({ error: 'Unit tidak ditemukan' })
}))

// Kembalikan seluruh data ke bawaan (dipakai tombol reset admin).
app.post('/api/reset', requireAdmin, wrap(async (req, res) => {
  await resetSnapshot()
  res.json({ ok: true })
}))

// ---------- Unggah berkas ----------

const storage = multer.diskStorage({
  destination: UPLOAD_DIR,
  filename: (req, file, cb) => {
    const ext = (path.extname(file.originalname) || '').toLowerCase().replace(/[^a-z0-9.]/g, '')
    const base = path.basename(file.originalname, path.extname(file.originalname))
      .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 40) || 'berkas'
    cb(null, `${base}-${Date.now()}${crypto.randomBytes(3).toString('hex')}${ext}`)
  }
})

const upload = multer({
  storage,
  limits: { fileSize: 200 * 1024 * 1024 }, // 200 MB (video kegiatan)
  fileFilter: (req, file, cb) => {
    const ok = /^image\/(png|jpe?g|webp)$|^application\/pdf$|^video\/(mp4|webm|quicktime)$/.test(file.mimetype)
    cb(ok ? null : new Error('Jenis berkas tidak diizinkan (gambar, PDF, atau video)'), ok)
  }
})

app.post('/api/upload', requireAdmin, upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Berkas tidak diterima' })
  res.json({ url: `/uploads/${req.file.filename}` })
})

// Galat terakhir: pesan ramah, status 500 untuk kegagalan basis data.
app.use((err, req, res, next) => {
  if (res.headersSent) return next(err)
  if (err.code === 'LIMIT_FILE_SIZE') return res.status(413).json({ error: 'Berkas terlalu besar (maks 200 MB)' })
  const status = err.status || err.statusCode || (err.fatal ? 503 : 500)
  res.status(status).json({ error: err.message || 'Permintaan tidak valid' })
})

app.use('/uploads', express.static(UPLOAD_DIR, { maxAge: '1d' }))

// ---------- Produksi: melayani build Vite ----------

const dist = path.join(__dirname, '..', 'dist')
if (fs.existsSync(dist)) {
  app.use(express.static(dist))
  app.get(/^(?!\/api|\/uploads).*/, (req, res) => res.sendFile(path.join(dist, 'index.html')))
}

const PORT = process.env.PORT || 8392

async function start() {
  try {
    await ping()
    await ensureSchema()
    const disemai = await seedIfEmpty()
    const warna = `\x1b[32m${DB_INFO()}\x1b[0m`
    console.log(`${warna}`)
    if (disemai) console.log('Basis data masih kosong — diisi data bawaan paket.')
  } catch (err) {
    console.error('MySQL tidak terjangkau — peladen berhenti.')
    console.error(`  ${err.message}`)
    console.error(`  Periksa .env (DB_HOST/DB_PORT/DB_USER/DB_PASSWORD/DB_NAME) atau nyalakan MariaDB.`)
    process.exit(1)
  }

  app.listen(PORT, () => {
    console.log(`Portal Kemenag Wonosobo — API berjalan di http://localhost:${PORT}`)
  })
}

function DB_INFO() {
  return `MySQL siap: ${process.env.DB_NAME || 'kemenag_wsb'} @ ${process.env.DB_HOST || '127.0.0.1'}:${process.env.DB_PORT || 3306}`
}

start()
