import { useState } from 'react'
import { HelpCircle, ChevronDown, MessageCircleQuestion } from 'lucide-react'
import { useData } from '../store.js'
import { DEFAULT_FAQS } from '../data.js'
import { WhatsAppIcon } from '../icons.jsx'

export function FaqSection({ onOpenSocial }) {
  const { faqs } = useData()
  const list = Array.isArray(faqs) && faqs.length ? faqs : DEFAULT_FAQS
  const [openIndex, setOpenIndex] = useState(-1)

  const toggleItem = (idx) => {
    setOpenIndex(prev => (prev === idx ? -1 : idx))
  }

  return (
    <section className="faq-section" id="tanya-jawab">
      <div className="container">
        <div className="faq-head">
          <div className="service-buttons-pill">
            <HelpCircle size={14} /> Pusat Informasi &amp; Bantuan Masyarakat
          </div>
          <h2>Pertanyaan yang Sering Diajukan (Q&amp;A)</h2>
          <p>
            Temukan jawaban cepat seputar jam layanan, rincian biaya, syarat legalisir dokumen,
            pendaftaran nikah KUA, hingga perizinan lembaga keagamaan di Kemenag Kabupaten Wonosobo.
          </p>
        </div>

        <div className="faq-list">
          {list.map((item, idx) => {
            const isOpen = openIndex === idx
            const num = String(idx + 1).padStart(2, '0')
            return (
              <div
                key={item.id || idx}
                className={`faq-card ${isOpen ? 'is-open' : ''}`}
              >
                <button
                  type="button"
                  className="faq-trigger"
                  onClick={() => toggleItem(idx)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-num" aria-hidden="true">{num}</span>
                  <div className="faq-title-wrap">
                    {item.category && (
                      <span className="faq-category">{item.category}</span>
                    )}
                    <h3 className="faq-question">{item.question}</h3>
                  </div>
                  <span className={`faq-icon ${isOpen ? 'is-open' : ''}`} aria-hidden="true">
                    <ChevronDown size={18} />
                  </span>
                </button>

                {isOpen && (
                  <div className="faq-body">
                    <p className="faq-answer">{item.answer}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="faq-cta-card">
          <div className="faq-cta-info">
            <span className="faq-cta-icon" aria-hidden="true">
              <MessageCircleQuestion size={24} />
            </span>
            <div>
              <h4>Masih ada informasi layanan yang Anda bingungkan?</h4>
              <p>Petugas layanan Kemenag Wonosobo siap membantu konsultasi Anda pada jam kerja pelayanan.</p>
            </div>
          </div>
          <div className="faq-cta-actions">
            <a
              href="https://api.whatsapp.com/send?phone=6281230055633&text=Halo%20Admin%20Kemenag%20Wonosobo,%20saya%20ingin%20bertanya%20mengenai%20layanan."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <WhatsAppIcon size={16} /> Tanya Via WA
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

