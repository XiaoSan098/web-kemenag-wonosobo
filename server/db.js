// Lapisan MySQL untuk portal Kemenag Wonosobo.
//
// Sumber kebenaran bersama seluruh pengunjung, menggantikan server/data/db.json.
// Bentuk yang dibaca/ditulis persis sama dengan store.js: { units, seksi, social }.
//
// Skema relasi penuh:
//   unit ─┬─ struktur      (personil)
//         ├─ layanan ─┬─ layanan_syarat
//         ├─ foto
//         └─ video
//   sosial (kanal media sosial)
//
// Catatan urutan kunci: obyek di data paket memakai urutan kunci tertentu, dan
// panel admin membandingkan draft dengan data aktif lewat JSON.stringify — urutan
// kunci ikut diperiksa. Karena itu tabel unit & sosial menyimpan kolom `kunci`
// (JSON daftar nama kunci) dan `extra` (kunci tak dikenal), sehingga hasil baca
// identik byte-per-byte dengan yang disimpan. Obyek anak (struktur, layanan,
// foto, video) memakai urutan baku; kunci opsionalnya selalu berada di urutan
// terakhir sehingga aman.

import mysql from 'mysql2/promise'
import {
  SEKSI_DATA, SUBBAG_TU_UNITS, SOCIAL_MEDIA_CONTACTS
} from '../src/data.js'

const DB = {
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'kemenag_wsb',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'kemenag_wsb',
  charset: 'utf8mb4',
  waitForConnections: true,
  connectionLimit: 10,
  namedPlaceholders: false
}

export const pool = mysql.createPool(DB)

const DDL = `
CREATE TABLE IF NOT EXISTS unit (
  id              VARCHAR(64)  NOT NULL,
  jenis           ENUM('subbag','seksi') NOT NULL,
  urutan          INT          NOT NULL,
  kunci           TEXT         NULL,
  extra           TEXT         NULL,
  parent_id       VARCHAR(64)  NULL,
  title           VARCHAR(255) NULL,
  full_title      TEXT         NULL,
  subtitle        TEXT         NULL,
  badge           VARCHAR(255) NULL,
  icon            VARCHAR(64)  NULL,
  color           VARCHAR(32)  NULL,
  description     MEDIUMTEXT   NULL,
  is_parent_subbag TINYINT(1)  NULL,
  cont_officer    TEXT         NULL,
  cont_role       TEXT         NULL,
  cont_phone      VARCHAR(64)  NULL,
  cont_raw        VARCHAR(64)  NULL,
  cont_hours      TEXT         NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_unit_parent FOREIGN KEY (parent_id) REFERENCES unit(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS struktur (
  id       INT AUTO_INCREMENT PRIMARY KEY,
  unit_id  VARCHAR(64) NOT NULL,
  urutan   INT NOT NULL,
  name     VARCHAR(255) NULL,
  role     VARCHAR(255) NULL,
  nip      VARCHAR(64)  NULL,
  photo    TEXT         NULL,
  badge    VARCHAR(255) NULL,
  CONSTRAINT fk_struktur_unit FOREIGN KEY (unit_id) REFERENCES unit(id) ON DELETE CASCADE,
  KEY idx_struktur_unit (unit_id, urutan)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS layanan (
  id       INT AUTO_INCREMENT PRIMARY KEY,
  unit_id  VARCHAR(64) NOT NULL,
  svc_id   VARCHAR(64) NULL,
  urutan   INT NOT NULL,
  title    TEXT NULL,
  description TEXT NULL,
  prosedur TEXT NULL,
  waktu    VARCHAR(128) NULL,
  biaya    VARCHAR(255) NULL,
  pdf_name VARCHAR(255) NULL,
  pdf_code VARCHAR(128) NULL,
  file_url TEXT NULL,
  CONSTRAINT fk_layanan_unit FOREIGN KEY (unit_id) REFERENCES unit(id) ON DELETE CASCADE,
  KEY idx_layanan_unit (unit_id, urutan)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS layanan_syarat (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  layanan_id INT NOT NULL,
  urutan     INT NOT NULL,
  teks       TEXT NOT NULL,
  CONSTRAINT fk_syarat_layanan FOREIGN KEY (layanan_id) REFERENCES layanan(id) ON DELETE CASCADE,
  KEY idx_syarat_layanan (layanan_id, urutan)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS foto (
  id      INT AUTO_INCREMENT PRIMARY KEY,
  unit_id VARCHAR(64) NOT NULL,
  urutan  INT NOT NULL,
  title   TEXT NULL,
  tanggal VARCHAR(64) NULL,
  image   TEXT NULL,
  caption TEXT NULL,
  ig_url  TEXT NULL,
  CONSTRAINT fk_foto_unit FOREIGN KEY (unit_id) REFERENCES unit(id) ON DELETE CASCADE,
  KEY idx_foto_unit (unit_id, urutan)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS video (
  id        INT AUTO_INCREMENT PRIMARY KEY,
  unit_id   VARCHAR(64) NOT NULL,
  urutan    INT NOT NULL,
  title     TEXT NULL,
  tanggal   VARCHAR(64) NULL,
  durasi    VARCHAR(32) NULL,
  thumbnail TEXT NULL,
  platform  VARCHAR(64) NULL,
  video_url TEXT NULL,
  embed_url TEXT NULL,
  CONSTRAINT fk_video_unit FOREIGN KEY (unit_id) REFERENCES unit(id) ON DELETE CASCADE,
  KEY idx_video_unit (unit_id, urutan)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS sosial (
  id        VARCHAR(64) NOT NULL,
  urutan    INT NOT NULL,
  kunci     TEXT NULL,
  extra     TEXT NULL,
  name      VARCHAR(128) NULL,
  handle    VARCHAR(128) NULL,
  description TEXT NULL,
  url       TEXT NULL,
  badge     VARCHAR(128) NULL,
  btn_text  VARCHAR(128) NULL,
  icon_key  VARCHAR(64)  NULL,
  icon      VARCHAR(64)  NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`

// ---------- Util ----------

const teks = (v) => (v === null || v === undefined ? '' : String(v))
const pars = (v) => {
  try { return JSON.parse(v) } catch { return null }
}
const array = (v) => (Array.isArray(v) ? v : [])

/**
 * Membangun obyek dari baris DB mengikuti daftar `kunci`, sehingga urutan
 * kunci hasil baca identik dengan urutan yang tersimpan.
 *
 * `kunci` berupa daftar nama kunci (sudah diparse pemanggil) dan `extra` berupa
 * obyek sisanya — keduanya TIDAK diparse ulang di sini; nilai ter-parse ganda
 * akan membuat JSON.parse melempar lalu seluruh obyek kembali kosong.
 */
function susun(row, kolom, kunci, anak, extra) {
  const urut = array(kunci)
  const sisa = { ...extra }
  const out = {}
  for (const k of urut) {
    if (k in kolom) {
      const raw = row[kolom[k]]
      out[k] = k === 'isParentSubbag' ? Boolean(raw) : teks(raw)
    } else if (k in anak) {
      out[k] = anak[k]
    } else if (k in sisa) {
      out[k] = sisa[k]
      delete sisa[k]
    }
    // kunci yang tidak dikenal dan tidak ada di extra dilewati: tidak ada
  }
  return out
}

/** Kumpulkan kunci tak dikenal ke kolom `extra` (dipakai saat menyimpan). */
function pisahExtra(obj, dikenal) {
  const extra = {}
  for (const [k, v] of Object.entries(obj)) {
    if (!dikenal.includes(k)) extra[k] = v
  }
  return Object.keys(extra).length ? JSON.stringify(extra) : null
}

const KUNCI_UNIT = ['id', 'parentId', 'title', 'fullTitle', 'subtitle', 'badge', 'icon',
  'color', 'description', 'isParentSubbag', 'contact', 'structure', 'services', 'photos', 'videos']
const KOL_UNIT = {
  id: 'id', // pk dipetakan di sini supaya urutan kunci tetap terjaga
  parentId: 'parent_id', title: 'title', fullTitle: 'full_title', subtitle: 'subtitle',
  badge: 'badge', icon: 'icon', color: 'color', description: 'description',
  isParentSubbag: 'is_parent_subbag'
}
const KOL_KONTAK = {
  officer: 'cont_officer', role: 'cont_role', phone: 'cont_phone',
  rawPhone: 'cont_raw', hours: 'cont_hours'
}

const KUNCI_SOSIAL = ['id', 'name', 'handle', 'desc', 'url', 'badge', 'btnText', 'iconKey', 'icon']
const KOL_SOSIAL = {
  id: 'id', // pk dipetakan di sini supaya urutan kunci tetap terjaga
  name: 'name', handle: 'handle', desc: 'description', url: 'url',
  badge: 'badge', btnText: 'btn_text', iconKey: 'icon_key', icon: 'icon'
}

// Urutan baku obyek anak — semua kunci selalu ada pada data paket, sehingga
// kunci opsional (fileUrl pada layanan) cukup diletakkan terakhir.
const susunStruktur = (r) => ({
  name: teks(r.name), role: teks(r.role), nip: teks(r.nip),
  photo: teks(r.photo), badge: teks(r.badge)
})
const susunLayanan = (r, syarat) => ({
  id: teks(r.svc_id), title: teks(r.title), description: teks(r.description),
  syarat, prosedur: teks(r.prosedur), waktu: teks(r.waktu), biaya: teks(r.biaya),
  pdfName: teks(r.pdf_name), pdfCode: teks(r.pdf_code),
  ...(r.file_url === null || r.file_url === undefined ? {} : { fileUrl: teks(r.file_url) })
})
const susunFoto = (r) => ({
  title: teks(r.title), date: teks(r.tanggal), image: teks(r.image),
  caption: teks(r.caption), igUrl: teks(r.ig_url)
})
const susunVideo = (r) => ({
  title: teks(r.title), date: teks(r.tanggal), duration: teks(r.durasi),
  thumbnail: teks(r.thumbnail), platform: teks(r.platform),
  videoUrl: teks(r.video_url), embedUrl: teks(r.embed_url)
})

const kelompok = (rows, kunciFn) => {
  const m = new Map()
  for (const r of rows) {
    const k = kunciFn(r)
    if (!m.has(k)) m.set(k, [])
    m.get(k).push(r)
  }
  return m
}

// ---------- Skema ----------

export async function ensureSchema() {
  const conn = await pool.getConnection()
  try {
    for (const stmt of DDL.split(';').map(s => s.trim()).filter(Boolean)) {
      await conn.query(stmt)
    }
  } finally {
    conn.release()
  }
}

// ---------- Baca ----------

export async function loadSnapshot() {
  const [unitRows] = await pool.query(
    'SELECT * FROM unit ORDER BY jenis = "seksi", urutan'
  )
  const subbag = unitRows.filter(r => r.jenis === 'subbag')
  const seksi = unitRows.filter(r => r.jenis === 'seksi')

  const semuaId = unitRows.map(r => r.id)
  const anak = await muatAnak(semuaId)

  const [sosialRows] = await pool.query('SELECT * FROM sosial ORDER BY urutan')

  return {
    units: subbag.map(r => susunUnit(r, anak)),
    seksi: seksi.map(r => susunUnit(r, anak)),
    social: sosialRows.map(r => susun(
      r, KOL_SOSIAL, pars(r.kunci) || KUNCI_SOSIAL, {}, pars(r.extra)
    ))
  }
}

async function muatAnak(ids) {
  const kosong = { structure: [], services: [], photos: [], videos: [] }
  if (!ids.length) return new Map(ids.map(id => [id, { ...kosong }]))

  const inList = ids.map(() => '?').join(',')
  const params = ids

  const [struktur] = await pool.query(
    `SELECT * FROM struktur WHERE unit_id IN (${inList}) ORDER BY unit_id, urutan`, params
  )
  const [layanan] = await pool.query(
    `SELECT * FROM layanan WHERE unit_id IN (${inList}) ORDER BY unit_id, urutan`, params
  )
  const [syarat] = await pool.query(
    `SELECT s.layanan_id, s.urutan, s.teks FROM layanan_syarat s
     JOIN layanan l ON l.id = s.layanan_id
     WHERE l.unit_id IN (${inList}) ORDER BY l.unit_id, l.urutan, s.urutan`, params
  )
  const [foto] = await pool.query(
    `SELECT * FROM foto WHERE unit_id IN (${inList}) ORDER BY unit_id, urutan`, params
  )
  const [video] = await pool.query(
    `SELECT * FROM video WHERE unit_id IN (${inList}) ORDER BY unit_id, urutan`, params
  )

  const byUnit = new Map(ids.map(id => [id, { ...kosong }]))
  const tambah = (id, kunci, value) => {
    const bagian = byUnit.get(id)
    if (bagian) bagian[kunci].push(value)
  }

  for (const r of struktur) tambah(r.unit_id, 'structure', susunStruktur(r))

  const syaratById = kelompok(syarat, r => r.layanan_id)
  for (const r of layanan) {
    tambah(r.unit_id, 'services',
      susunLayanan(r, array(syaratById.get(r.id)).map(s => teks(s.teks))))
  }

  for (const r of foto) tambah(r.unit_id, 'photos', susunFoto(r))
  for (const r of video) tambah(r.unit_id, 'videos', susunVideo(r))

  return byUnit
}

function susunUnit(row, anak) {
  const kontak = {
    officer: teks(row.cont_officer), role: teks(row.cont_role),
    phone: teks(row.cont_phone), rawPhone: teks(row.cont_raw), hours: teks(row.cont_hours)
  }
  const bagian = anak.get(row.id) || { structure: [], services: [], photos: [], videos: [] }
  return susun(row, KOL_UNIT, pars(row.kunci) || KUNCI_UNIT, {
    contact: kontak, ...bagian
  }, pars(row.extra))
}

// ---------- Tulis ----------

const dataBawaan = () => ({
  units: structuredClone(SUBBAG_TU_UNITS),
  seksi: structuredClone(SEKSI_DATA),
  social: structuredClone(SOCIAL_MEDIA_CONTACTS)
})

/**
 * Ganti seluruh isi database dengan snapshot yang diberikan.
 * Dilakukan dalam satu transaksi: bila ada kegagalan, data lama tetap utuh.
 */
export async function saveSnapshot(db) {
  const conn = await pool.getConnection()
  try {
    await conn.beginTransaction()

    // Urutan insert: seksi lebih dulu karena unit bisa merujuknya sebagai parent.
    await conn.query('DELETE FROM unit')
    await conn.query('DELETE FROM sosial')

    const gabungan = [
      ...array(db.units).map((u, i) => ({ u, jenis: 'subbag', urutan: i })),
      ...array(db.seksi).map((u, i) => ({ u, jenis: 'seksi', urutan: i }))
    ]

    const anak = new Map()

    for (const { u, jenis, urutan } of urutkanParentDulu(gabungan)) {
      if (!u || typeof u.id !== 'string' || !u.id) {
        throw new Error('Setiap unit wajib memiliki id berupa teks')
      }
      await conn.query(
        `INSERT INTO unit
          (id, jenis, urutan, kunci, extra, parent_id, title, full_title, subtitle,
           badge, icon, color, description, is_parent_subbag,
           cont_officer, cont_role, cont_phone, cont_raw, cont_hours)
         VALUES (?,?,?,?,?,NULL,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [
          u.id, jenis, urutan,
          JSON.stringify(Object.keys(u)),
          pisahExtra(u, KUNCI_UNIT),
          u.title ?? null, u.fullTitle ?? null, u.subtitle ?? null,
          u.badge ?? null, u.icon ?? null, u.color ?? null, u.description ?? null,
          typeof u.isParentSubbag === 'boolean' ? (u.isParentSubbag ? 1 : 0) : null,
          u.contact?.officer ?? null, u.contact?.role ?? null, u.contact?.phone ?? null,
          u.contact?.rawPhone ?? null, u.contact?.hours ?? null
        ]
      )
      anak.set(u.id, u)
    }

    // Parent disetelah seluruh unit ada — meniadakan urutan insert yang rapuh.
    for (const [id, u] of anak) {
      if (u.parentId) {
        await conn.query('UPDATE unit SET parent_id = ? WHERE id = ? AND id <> ?', [u.parentId, id, id])
      }
    }

    for (const [id, u] of anak) {
      await tulisAnak(conn, id, u)
    }

    for (const [i, s] of array(db.social).entries()) {
      if (!s || typeof s.id !== 'string' || !s.id) {
        throw new Error('Setiap kanal sosial wajib memiliki id berupa teks')
      }
      await conn.query(
        `INSERT INTO sosial
          (id, urutan, kunci, extra, name, handle, description, url, badge, btn_text, icon_key, icon)
         VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
        [
          s.id, i, JSON.stringify(Object.keys(s)), pisahExtra(s, KUNCI_SOSIAL),
          s.name ?? null, s.handle ?? null, s.desc ?? null, s.url ?? null,
          s.badge ?? null, s.btnText ?? null, s.iconKey ?? null, s.icon ?? null
        ]
      )
    }

    await conn.commit()
    return db
  } catch (err) {
    await conn.rollback()
    throw err
  } finally {
    conn.release()
  }
}

/** Unit lebih dulu lalu seksi, agar FK parent_id tidak pernah menunjuk anak yatim. */
function urutkanParentDulu(items) {
  return [...items].sort((a, b) => {
    if (a.jenis === b.jenis) return a.urutan - b.urutan
    return a.jenis === 'seksi' ? -1 : 1
  })
}

async function tulisAnak(conn, unitId, u) {
  for (const [i, p] of array(u.structure).entries()) {
    await conn.query(
      `INSERT INTO struktur (unit_id, urutan, name, role, nip, photo, badge) VALUES (?,?,?,?,?,?,?)`,
      [unitId, i, p?.name ?? null, p?.role ?? null, p?.nip ?? null, p?.photo ?? null, p?.badge ?? null]
    )
  }

  for (const [i, s] of array(u.services).entries()) {
    const [res] = await conn.query(
      `INSERT INTO layanan
        (unit_id, svc_id, urutan, title, description, prosedur, waktu, biaya, pdf_name, pdf_code, file_url)
       VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
      [
        unitId, s?.id ?? null, i, s?.title ?? null, s?.desc ?? null, s?.prosedur ?? null,
        s?.waktu ?? null, s?.biaya ?? null, s?.pdfName ?? null, s?.pdfCode ?? null,
        s?.fileUrl ?? null
      ]
    )
    const layananId = res.insertId
    for (const [j, t] of array(s?.syarat).entries()) {
      await conn.query(
        `INSERT INTO layanan_syarat (layanan_id, urutan, teks) VALUES (?,?,?)`,
        [layananId, j, String(t)]
      )
    }
  }

  for (const [i, p] of array(u.photos).entries()) {
    await conn.query(
      `INSERT INTO foto (unit_id, urutan, title, tanggal, image, caption, ig_url) VALUES (?,?,?,?,?,?,?)`,
      [unitId, i, p?.title ?? null, p?.date ?? null, p?.image ?? null, p?.caption ?? null, p?.igUrl ?? null]
    )
  }

  for (const [i, v] of array(u.videos).entries()) {
    await conn.query(
      `INSERT INTO video (unit_id, urutan, title, tanggal, durasi, thumbnail, platform, video_url, embed_url)
       VALUES (?,?,?,?,?,?,?,?,?)`,
      [
        unitId, i, v?.title ?? null, v?.date ?? null, v?.duration ?? null, v?.thumbnail ?? null,
        v?.platform ?? null, v?.videoUrl ?? null, v?.embedUrl ?? null
      ]
    )
  }
}

// ---------- Siklus hidup ----------

/** Kembalikan database ke data bawaan paket. */
export async function resetSnapshot() {
  return saveSnapshot(dataBawaan())
}

/** Isi database dengan data bawaan bila masih kosong. */
export async function seedIfEmpty() {
  const [[{ n }]] = await pool.query('SELECT COUNT(*) AS n FROM unit')
  if (Number(n) === 0) await saveSnapshot(dataBawaan())
  return Number(n) === 0
}

/** Uji koneksi; melempar bila server MySQL tidak terjangkau. */
export async function ping() {
  await pool.query('SELECT 1')
}
