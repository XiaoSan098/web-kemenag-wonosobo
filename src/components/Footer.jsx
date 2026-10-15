import { MapPin, Phone, Mail, Youtube, Instagram, Facebook, Share2 } from 'lucide-react'
import { WhatsAppIcon, TikTokIcon, XIcon } from '../icons.jsx'

const SOCIAL_ICONS = {
  youtube: Youtube,
  instagram: Instagram,
  twitter: XIcon,
  tiktok: TikTokIcon,
  facebook: Facebook,
  whatsapp: WhatsAppIcon
}

const SOCIALS = [
  { name: 'YouTube', url: 'https://www.youtube.com/channel/UCmhZJ0jgT-WXxRdbBz1gCkA', Icon: Youtube },
  { name: 'Instagram', url: 'https://www.instagram.com/kemenagwonosobo/', Icon: Instagram },
  { name: 'X (Twitter)', url: 'https://x.com/KemenagWonosobo', Icon: XIcon },
  { name: 'TikTok', url: 'https://www.tiktok.com/@kemenagwonosobo', Icon: TikTokIcon },
  { name: 'Facebook', url: 'https://www.facebook.com/kemenag.teras/', Icon: Facebook },
  { name: 'WhatsApp PTSP', url: 'https://api.whatsapp.com/send?phone=6281230055633', Icon: WhatsAppIcon }
]

export function Footer({ seksi = [], social = [], onOpenUnit, onOpenSocial }) {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="footer-logo">
            <img src="/logo_kemenag.png" alt="Logo Kementerian Agama Republik Indonesia" />
            <h3>Kantor Kementerian Agama Kabupaten Wonosobo</h3>
          </div>
          <p className="footer-desc">
            Mewujudkan pelayanan keagamaan dan pendidikan yang berkualitas, akuntabel,
            transparan, dan berintegritas di Kabupaten Wonosobo.
          </p>
          <ul className="footer-contact">
            <li><MapPin size={15} aria-hidden="true" /> Jl. Tumenggung Jogonegoro No. 38, Jaraksari, Wonosobo, Jawa Tengah 56314</li>
            <li><Phone size={15} aria-hidden="true" /> PTSP: +62 812-3005-5633 · (0286) 321044</li>
            <li><Mail size={15} aria-hidden="true" /> kabwonosobo@kemenag.go.id</li>
          </ul>
        </div>

        <nav className="footer-nav" aria-label="Tautan unit dan seksi">
          <h4>Unit &amp; Seksi</h4>
          <ul>
            {seksi.map(item => (
              <li key={item.id}>
                <button type="button" onClick={() => onOpenUnit(item.id)}>{item.title}</button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer-social">
          <h4>Kanal Resmi</h4>
          <p>Ikuti informasi resmi Kemenag Wonosobo:</p>
          <div className="footer-social-row">
            {(social.length ? social : SOCIALS.map(({ name, url }) => ({ name, url, iconKey: 'link' }))).map(item => {
              const Icon = SOCIAL_ICONS[item.iconKey] || Share2
              return (
                <a key={item.id || item.name} href={item.url} target="_blank" rel="noopener noreferrer" aria-label={item.name} title={item.name}>
                  <Icon size={17} />
                </a>
              )
            })}
          </div>
          <button type="button" className="btn btn-outline btn-sm" onClick={onOpenSocial}>
            <Share2 size={15} /> Semua Kanal &amp; Kontak
          </button>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>© {new Date().getFullYear()} Kantor Kementerian Agama Kabupaten Wonosobo.</p>
        </div>
      </div>
    </footer>
  )
}
