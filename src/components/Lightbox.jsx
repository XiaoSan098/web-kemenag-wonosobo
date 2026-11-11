import { useEffect } from 'react'
import { X } from 'lucide-react'

export function Lightbox({ src, caption, subcaption, onClose }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  let title = caption || ''
  let subtitle = subcaption || ''

  if (!subtitle && typeof caption === 'string' && caption.includes(' — ')) {
    const parts = caption.split(' — ')
    title = parts[0].trim()
    subtitle = parts.slice(1).join(' — ').trim()
  }

  return (
    <div
      className="overlay overlay--lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Pratinjau foto"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <figure className="lightbox">
        <div className="lightbox-media">
          <button
            type="button"
            className="icon-btn icon-btn--fixed"
            onClick={onClose}
            aria-label="Tutup pratinjau"
          >
            <X size={18} />
          </button>
          <img src={src} alt={title || 'Pratinjau foto'} />
        </div>
        {(title || subtitle) && (
          <figcaption className="lightbox-caption">
            {title && <strong className="lightbox-title">{title}</strong>}
            {subtitle && <span className="lightbox-subtitle">{subtitle}</span>}
          </figcaption>
        )}
      </figure>
    </div>
  )
}
