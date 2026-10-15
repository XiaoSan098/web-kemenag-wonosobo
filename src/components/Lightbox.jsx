import { X } from 'lucide-react'

export function Lightbox({ src, caption, onClose }) {
  return (
    <div className="overlay overlay--lightbox" role="dialog" aria-modal="true" aria-label="Pratinjau foto" onClick={e => e.target === e.currentTarget && onClose()}>
      <figure className="lightbox">
        <button type="button" className="icon-btn icon-btn--fixed" onClick={onClose} aria-label="Tutup pratinjau">
          <X size={18} />
        </button>
        <img src={src} alt={caption} />
        {caption && <figcaption>{caption}</figcaption>}
      </figure>
    </div>
  )
}
