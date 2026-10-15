/**
 * Data Store — sumber data tunggal untuk situs publik & halaman admin.
 *
 * Data default berasal dari src/data.js (paket, statis). Admin mengelola
 * salinan yang disimpan di localStorage (kew_wsb_data_v1); bila ada salinan
 * tersimpan, situs publik otomatis membacanya. Semua perubahan di-broadcast
 * lewat CustomEvent agar komponen yang memakai useData() ikut ter-render ulang.
 */
import { useEffect, useState } from 'react'
import { SUBBAG_TU_UNITS, SEKSI_DATA, SOCIAL_MEDIA_CONTACTS } from './data.js'

const STORAGE_KEY = 'kew_wsb_data_v1'
const CHANGE_EVENT = 'kew-data-change'

const DEFAULT_DATA = {
  units: structuredClone(SUBBAG_TU_UNITS),
  seksi: structuredClone(SEKSI_DATA),
  social: structuredClone(SOCIAL_MEDIA_CONTACTS)
}

export const hasStorage = () => {
  try {
    return typeof localStorage !== 'undefined'
  } catch {
    return false
  }
}

function readStored() {
  if (!hasStorage()) return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return null
    return {
      units: Array.isArray(parsed.units) ? parsed.units : DEFAULT_DATA.units,
      seksi: Array.isArray(parsed.seksi) ? parsed.seksi : DEFAULT_DATA.seksi,
      social: Array.isArray(parsed.social) ? parsed.social : DEFAULT_DATA.social
    }
  } catch {
    return null
  }
}

/** Snapshot data aktif (override admin atau default). Tidak boleh dimutasi. */
export function getData() {
  return readStored() || structuredClone(DEFAULT_DATA)
}

/** Menyimpan snapshot data baru & mem-broadcast perubahan. */
export function saveData(next) {
  if (!hasStorage()) return next
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    /* penyimpanan privat / penuh: tetap kirim event agar UI live ikut naik */
  }
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT))
  return next
}

/** Membuang override admin: situs kembali memakai data bawaan paket. */
export function resetData() {
  if (hasStorage()) {
    try { localStorage.removeItem(STORAGE_KEY) } catch { /* abaikan */ }
  }
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT))
}

/** Dipakai admin untuk convex bump manual saat HMR / editor luar. */
export function notifyDataChange() {
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT))
}

const EMPTY = Object.freeze({})

/**
 * Hook sumber data reaktif. Mengembalikan { units, seksi, social } salinan
 * baru setiap kali data berubah (menghindari mutasi lintas komponen).
 *
 * Jika backend tersedia, data server (hasil kelola admin, tersimpan di
 * server/data/db.json) menjadi sumber kebenaran dan dicache ke localStorage
 * agar tetap tersedia luring. Tanpa backend, memakai cache/default lokal.
 */
export function useData() {
  const [data, setData] = useState(() => getData())

  useEffect(() => {
    const reload = () => setData(getData())
    window.addEventListener(CHANGE_EVENT, reload)
    window.addEventListener('storage', reload)

    let alive = true
    fetch('/api/data')
      .then(r => (r.ok ? r.json() : Promise.reject(new Error('gagal'))))
      .then(server => {
        if (!alive || !Array.isArray(server?.seksi)) return
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify({
            units: server.units || [],
            seksi: server.seksi || [],
            social: server.social || []
          }))
        } catch { /* cache gagal tulis: lanjut dengan data di memori */ }
        reload()
      })
      .catch(() => { /* offline / hosting statis: tetap memakai data lokal */ })

    return () => {
      alive = false
      window.removeEventListener(CHANGE_EVENT, reload)
      window.removeEventListener('storage', reload)
    }
  }, [])

  return data
}

/**
 * Mencari unit Subbag TU atau Seksi berdasarkan id.
 * Menerima array (hasil useData) atau snapshot data utuh { units, seksi }.
 */
export function findUnit(list, id) {
  if (Array.isArray(list)) return list.find(u => u.id === id)
  if (!list) return undefined
  return (
    (list.units || []).find(u => u.id === id) ||
    (list.seksi || []).find(s => s.id === id)
  )
}

/** Menyusun rawPhone standar panggilan API dari nomor yang diedit admin. */
export function toRawPhone(phone) {
  return String(phone || '').replace(/\D/g, '')
}

export { EMPTY }
export const DEFAULT_UNITS = SUBBAG_TU_UNITS
export const DEFAULT_SEKSI = SEKSI_DATA
export const DEFAULT_SOCIAL = SOCIAL_MEDIA_CONTACTS
