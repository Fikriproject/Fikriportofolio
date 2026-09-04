import { useEffect, useState } from 'react'
import { supabase } from "../../supabase";
import { Award, Upload, Trash2, ImageIcon, Plus, ExternalLink, Type } from 'lucide-react'
import PdfThumbnail from '../../components/PdfThumbnail';

const isPdfFile = (url) => typeof url === 'string' && url.toLowerCase().includes('.pdf');

const Card = ({ children, className = '' }) => (
  <div className={`relative group ${className}`}>
    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-2xl blur opacity-10 group-hover:opacity-25 transition duration-500" />
    <div className="relative bg-white/5 backdrop-blur-xl border border-white/12 rounded-2xl h-full">
      {children}
    </div>
  </div>
)

const SkeletonCard = () => (
  <div className="relative">
    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-2xl blur opacity-10" />
    <div className="relative bg-white/5 border border-white/12 rounded-2xl overflow-hidden">
      <div className="w-full aspect-[16/11.5] bg-white/5 animate-pulse" />
      <div className="p-3 bg-white/5 space-y-1.5">
        <div className="w-2/3 h-3 bg-white/10 rounded animate-pulse" />
        <div className="w-1/3 h-2 bg-white/5 rounded animate-pulse" />
      </div>
    </div>
  </div>
)

const CertCard = ({ cert, onDelete }) => {
  const [imgLoaded, setImgLoaded] = useState(false)
  const isPdf = isPdfFile(cert.Img)
  const certTitle = cert.Title || decodeURIComponent(cert.Img.split('/').pop()?.replace(/^cert-\d+-/, '').replace(/\.[^/.]+$/, '').replace(/_/g, ' ') || 'Certificate')

  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-2xl blur opacity-10 group-hover:opacity-30 transition duration-500" />
      <div className="relative bg-white/5 border border-white/12 rounded-2xl overflow-hidden flex flex-col">
        {/* Preview Area */}
        <div className="relative aspect-[16/11.5] overflow-hidden bg-slate-950 flex items-center justify-center">
          {isPdf ? (
            <div className="w-full h-full relative group/pdf overflow-hidden">
              <PdfThumbnail url={cert.Img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-red-600/90 backdrop-blur-sm text-white text-[9px] font-bold tracking-wider uppercase z-10 shadow">
                PDF
              </div>
              <a
                href={cert.Img}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-2 left-2 p-1.5 rounded-lg bg-black/60 hover:bg-black/90 text-white z-10 transition-colors backdrop-blur-sm flex items-center gap-1 text-[11px]"
                title="Lihat PDF di tab baru"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ) : (
            <>
              {!imgLoaded && (
                <div className="w-full aspect-[16/11.5] bg-white/5 animate-pulse absolute inset-0" />
              )}
              <img
                src={cert.Img}
                alt={certTitle}
                onLoad={() => setImgLoaded(true)}
                onError={() => setImgLoaded(true)}
                className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${imgLoaded ? 'block' : 'hidden'}`}
              />
            </>
          )}

          {/* Delete Button Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 z-10 pointer-events-auto">
            <button
              onClick={() => onDelete(cert.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/20 border border-red-500/30 text-red-300 text-xs w-full justify-center hover:bg-red-500/30 transition-colors"
            >
              <Trash2 className="w-3 h-3" /> Delete
            </button>
          </div>
        </div>

        {/* Bottom Title / Description */}
        <div className="p-3 bg-white/5 border-t border-white/10">
          <p className="text-xs font-semibold text-gray-100 truncate" title={certTitle}>
            {certTitle}
          </p>
          <p className="text-[10px] text-gray-400 uppercase tracking-wider mt-0.5 flex items-center gap-1">
            <span className={`inline-block w-1.5 h-1.5 rounded-full ${isPdf ? 'bg-red-400' : 'bg-emerald-400'}`} />
            {isPdf ? 'Dokumen PDF' : 'Gambar'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function Certificates() {
  const [certs, setCerts] = useState([])
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [title, setTitle] = useState('')
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [loading, setLoading] = useState(true)

  const fetchCerts = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('certificates').select('*').order('created_at', { ascending: false })
    if (error) {
      console.error('Error fetching certificates:', error)
    }
    setCerts(data || [])
    setLoading(false)
  }

  useEffect(() => { fetchCerts() }, [])

  const handleFile = (f) => {
    if (!f) return
    setFile(f)
    setPreview(URL.createObjectURL(f))
    // Autofill title from filename if title is still empty
    if (!title) {
      const cleanName = f.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ')
      setTitle(cleanName)
    }
  }

  const uploadImage = async () => {
    if (!file) {
      alert('Silakan pilih file gambar atau PDF sertifikat.')
      return
    }
    setUploading(true)
    try {
      const cleanTitle = title.trim() || file.name.replace(/\.[^/.]+$/, '')
      const ext = file.name.split('.').pop()
      const safeTitleSlug = cleanTitle.replace(/[^a-zA-Z0-9_-]/g, '_')
      const fileName = `cert-${Date.now()}-${safeTitleSlug}.${ext}`

      const { error: uploadError } = await supabase.storage.from('certificate-images').upload(fileName, file)
      if (uploadError) throw uploadError

      const { data } = supabase.storage.from('certificate-images').getPublicUrl(fileName)

      // Try inserting with Title column
      const insertPayload = { Img: data.publicUrl, Title: cleanTitle }
      let { error: insertError } = await supabase.from('certificates').insert(insertPayload)

      // If 'Title' column does not exist yet in Supabase table, fallback gracefully to Img only
      if (insertError && (insertError.message?.includes("'Title' column") || insertError.code === 'PGRST204')) {
        const { error: fallbackError } = await supabase.from('certificates').insert({ Img: data.publicUrl })
        if (fallbackError) throw fallbackError
      } else if (insertError) {
        throw insertError
      }

      setFile(null)
      setPreview(null)
      setTitle('')
      setUploading(false)
      fetchCerts()
      alert('Sertifikat berhasil diunggah!')
    } catch (err) {
      console.error('Upload error:', err)
      alert(`Gagal upload: ${err.message || 'Terjadi kesalahan'}`)
      setUploading(false)
    }
  }

  const deleteCert = async (id) => {
    if (!confirm('Hapus sertifikat ini?')) return
    await supabase.from('certificates').delete().eq('id', id)
    fetchCerts()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl blur opacity-50" />
          <div className="relative w-9 h-9 bg-[#030014] rounded-xl border border-white/15 flex items-center justify-center">
            <Award className="w-4 h-4 text-indigo-400" />
          </div>
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">Certificates</h1>
          <p className="text-gray-500 text-xs">
            {loading ? 'Loading...' : `${certs.length} certificates total`}
          </p>
        </div>
      </div>

      {/* Upload Card Form */}
      <Card>
        <div className="p-5 sm:p-6 space-y-4">
          <h2 className="text-sm font-semibold text-white flex items-center gap-2">
            <Plus className="w-4 h-4 text-indigo-400" /> Upload Certificate
          </h2>

          {/* Form Input Keterangan / Nama Sertifikat */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-gray-300 flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5 text-indigo-400" /> Nama / Keterangan Sertifikat
            </label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Contoh: Sertifikat BNSP - Pengembang Web Pratama"
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/60 transition-all"
            />
            <p className="text-[11px] text-gray-500">
              Keterangan ini akan langsung tampil di bawah kartu sertifikat pada portofolio Anda.
            </p>
          </div>

          {/* Upload Dropzone */}
          <label
            onDragOver={e => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={e => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]) }}
            className={`flex flex-col items-center justify-center w-full min-h-[160px] rounded-xl border-2 border-dashed cursor-pointer transition-all duration-300 ${
              dragOver ? 'border-indigo-400/60 bg-indigo-500/10' : 'border-white/12 bg-white/4 hover:border-indigo-500/35 hover:bg-white/7'
            }`}
          >
            {preview && file?.type === 'application/pdf' ? (
              <div className="w-full max-h-48 aspect-[16/11.5] p-2 flex items-center justify-center">
                <PdfThumbnail url={preview} className="max-h-44 object-contain rounded-lg shadow-lg" />
              </div>
            ) : preview ? (
              <img src={preview} alt="preview" className="max-h-40 object-contain rounded-lg p-2" />
            ) : (
              <div className="text-center space-y-2 p-6">
                <div className="w-11 h-11 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto">
                  <ImageIcon className="w-5 h-5 text-indigo-400" />
                </div>
                <p className="text-sm text-gray-300">Drag & drop or click to upload</p>
                <p className="text-xs text-gray-400">Gambar (PNG, JPG, WEBP) & Dokumen PDF</p>
              </div>
            )}
            <input type="file" accept="image/*,application/pdf,.pdf" onChange={e => handleFile(e.target.files[0])} className="hidden" />
          </label>

          {file && (
            <div className="flex items-center justify-between gap-3 flex-wrap pt-2">
              <p className="text-xs text-gray-400 truncate flex-1 font-mono">
                {file.name}
              </p>
              <div className="flex gap-2 shrink-0">
                <button 
                  onClick={() => { setFile(null); setPreview(null); setTitle('') }}
                  className="px-3 py-1.5 rounded-xl border border-white/10 text-gray-400 hover:text-white text-xs transition-colors"
                >
                  Clear
                </button>
                <button onClick={uploadImage} disabled={uploading} className="relative group/u">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4f52c9] to-[#8644c5] rounded-xl opacity-60 blur group-hover/u:opacity-100 transition duration-300" />
                  <div className="relative flex items-center gap-2 px-4 py-1.5 bg-[#030014] rounded-xl border border-white/10">
                    {uploading ? <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <Upload className="w-3.5 h-3.5 text-indigo-400" />}
                    <span className="text-xs text-gray-200">{uploading ? 'Uploading...' : 'Upload'}</span>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Grid List */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : certs.length === 0 ? (
        <Card>
          <div className="p-16 text-center">
            <Award className="w-10 h-10 text-gray-700 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">Belum ada sertifikat.</p>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {certs.map(cert => (
            <CertCard key={cert.id} cert={cert} onDelete={deleteCert} />
          ))}
        </div>
      )}
    </div>
  )
}