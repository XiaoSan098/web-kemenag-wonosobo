import { X, ExternalLink } from 'lucide-react'
import { Youtube, Instagram, Facebook } from 'lucide-react'
import { WhatsAppIcon, TikTokIcon, XIcon } from '../icons.jsx'

const BRAND_ICONS = {
  youtube: Youtube,
  instagram: Instagram,
  twitter: XIcon,
  tiktok: TikTokIcon,
  facebook: Facebook,
  whatsapp: WhatsAppIcon
}

export function SocialModal({ contacts, onClose }) {
  return (
    <div className="overlay" role="dialog" aria-modal="true" aria-label="Kanal media sosial dan kontak resmi" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal modal--social">
        <header className="modal-head">
          <div className="modal-head-text">
            <span className="modal-badge">Kanal Resmi</span>
            <h3>Media Sosial &amp; Kontak</h3>
            <p>Kantor Kementerian Agama Kabupaten Wonosobo</p>
          </div>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Tutup dialog">
            <X size={18} />
          </button>
        </header>

        <div className="modal-body">
          <ul className="social-list">
            {contacts.map(item => {
              const Icon = BRAND_ICONS[item.id] || ExternalLink
              return (
                <li key={item.id}>
                  <a
                    className={`social-item ${item.id === 'whatsapp' ? 'social-item--wa' : ''}`}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className={`social-item-icon ic-${item.id}`}><Icon size={20} /></span>
                    <span className="social-item-text">
                      <strong>{item.name}</strong>
                      <span className="social-item-handle">{item.handle}</span>
                      <span className="social-item-desc">{item.desc}</span>
                    </span>
                    <span className="social-item-badge">{item.badge}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}
