import React, { useState } from "react"
import { Modal, IconButton, Box, Backdrop, Typography } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import FullscreenIcon from "@mui/icons-material/Fullscreen"
import { Award, ExternalLink } from "lucide-react"
import PdfThumbnail from "./PdfThumbnail"

const Certificate = ({ ImgSertif, Title }) => {
	const [open, setOpen] = useState(false)

	const isPdf = typeof ImgSertif === 'string' && ImgSertif.toLowerCase().includes('.pdf')
	const certTitle = Title || (typeof ImgSertif === 'string' 
		? decodeURIComponent(ImgSertif.split('/').pop()?.replace(/^cert-\d+-/, '').replace(/\.[^/.]+$/, '').replace(/_/g, ' ') || 'Certificate')
		: 'Certificate')

	const handleOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	return (
		<Box component="div" sx={{ width: "100%" }}>
			{/* Main Card Container with Bottom Description */}
			<div className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-white/10 shadow-2xl p-3.5 sm:p-4 transition-all duration-300 hover:border-indigo-500/40 hover:shadow-indigo-500/20 hover:-translate-y-1">
				<div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 opacity-30 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none" />

				{/* Thumbnail Preview Area */}
				<Box
					sx={{
						position: "relative",
						overflow: "hidden",
						borderRadius: "12px",
						aspectRatio: "16/11.5",
						backgroundColor: "rgba(15, 23, 42, 0.8)",
						cursor: "pointer",
						border: "1px solid rgba(255, 255, 255, 0.08)",
						"&:hover .overlay": {
							opacity: 1,
						},
						"&:hover .hover-content": {
							transform: "translate(-50%, -50%)",
							opacity: 1,
						},
						"&:hover .cert-preview-target": {
							transform: "scale(1.04)",
						},
					}}
					onClick={handleOpen}>
					{isPdf ? (
						/* Visual PDF Page 1 Preview */
						<Box
							sx={{
								width: "100%",
								height: "100%",
								position: "relative",
							}}>
							<PdfThumbnail
								url={ImgSertif}
								className="cert-preview-target transition-transform duration-500"
								style={{
									width: "100%",
									height: "100%",
									objectFit: "cover",
								}}
							/>
							{/* PDF Badge */}
							<Box
								sx={{
									position: "absolute",
									top: 10,
									right: 10,
									bgcolor: "rgba(220, 38, 38, 0.9)",
									backdropFilter: "blur(4px)",
									color: "white",
									px: 1.2,
									py: 0.3,
									borderRadius: "6px",
									fontSize: "0.68rem",
									fontWeight: 800,
									letterSpacing: "0.06em",
									boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
									zIndex: 1,
								}}>
								PDF
							</Box>
						</Box>
					) : (
						/* Image Thumbnail */
						<Box sx={{ position: "relative", width: "100%", height: "100%" }}>
							<img
								className="cert-preview-target"
								src={ImgSertif}
								alt={certTitle}
								style={{
									width: "100%",
									height: "100%",
									display: "block",
									objectFit: "cover",
									filter: "contrast(1.05) brightness(0.95)",
									transition: "transform 0.5s ease",
								}}
							/>
						</Box>
					)}

					{/* Hover Overlay */}
					<Box
						className="overlay"
						sx={{
							position: "absolute",
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							opacity: 0,
							transition: "all 0.3s ease",
							cursor: "pointer",
							zIndex: 2,
							background: "rgba(11, 15, 23, 0.75)",
							backdropFilter: "blur(4px)",
						}}>
						<Box
							className="hover-content"
							sx={{
								position: "absolute",
								top: "50%",
								left: "50%",
								transform: "translate(-50%, -60%)",
								opacity: 0,
								transition: "all 0.4s ease",
								textAlign: "center",
								width: "100%",
								color: "white",
							}}>
							<FullscreenIcon
								sx={{
									fontSize: 36,
									mb: 0.5,
									color: "#60a5fa",
									filter: "drop-shadow(0 2px 8px rgba(96, 165, 250, 0.5))",
								}}
							/>
							<Typography
								variant="body2"
								sx={{
									fontWeight: 600,
									fontSize: "0.9rem",
									textShadow: "0 2px 4px rgba(0,0,0,0.5)",
								}}>
								Lihat Sertifikat
							</Typography>
						</Box>
					</Box>
				</Box>

				{/* Description / Keterangan Sertifikat di Bawah */}
				<div className="relative mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between gap-3">
					<div className="min-w-0 flex-1">
						<h3 
							className="text-sm sm:text-base font-semibold text-gray-100 group-hover:text-indigo-300 transition-colors truncate" 
							title={certTitle}
						>
							{certTitle}
						</h3>
						<p className="text-[11px] text-gray-400 mt-0.5 flex items-center gap-1.5">
							<span className={`inline-block w-1.5 h-1.5 rounded-full ${isPdf ? 'bg-red-400' : 'bg-emerald-400'}`} />
							{isPdf ? "Dokumen Resmi PDF" : "Sertifikat Digital"}
						</p>
					</div>

					<button
						onClick={handleOpen}
						className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white transition-colors shrink-0"
						title="Buka Penuh"
					>
						<FullscreenIcon sx={{ fontSize: 18 }} />
					</button>
				</div>
			</div>

			{/* Modal View */}
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 300,
					sx: {
						backgroundColor: "rgba(3, 0, 20, 0.85)",
						backdropFilter: "blur(8px)",
					},
				}}
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					p: { xs: 2, md: 4 },
				}}>
				<Box
					sx={{
						position: "relative",
						width: isPdf ? { xs: "95vw", md: "85vw", lg: "75vw" } : "auto",
						maxWidth: isPdf ? "1000px" : "90vw",
						height: isPdf ? { xs: "85vh", md: "85vh" } : "auto",
						maxHeight: "90vh",
						bgcolor: isPdf ? "#0d1117" : "transparent",
						borderRadius: "20px",
						overflow: "hidden",
						border: isPdf ? "1px solid rgba(255, 255, 255, 0.12)" : "none",
						display: "flex",
						flexDirection: "column",
						outline: "none",
					}}>
					{/* Close Button */}
					<IconButton
						onClick={handleClose}
						sx={{
							position: "absolute",
							right: 16,
							top: 16,
							color: "white",
							bgcolor: "rgba(0,0,0,0.6)",
							zIndex: 20,
							padding: 1,
							"&:hover": {
								bgcolor: "rgba(239, 68, 68, 0.8)",
								transform: "scale(1.1)",
							},
						}}
						size="large">
						<CloseIcon sx={{ fontSize: 24 }} />
					</IconButton>

					{isPdf ? (
						/* Interactive PDF Viewer in Modal */
						<Box sx={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
							<Box
								sx={{
									p: 2,
									pr: 7,
									borderBottom: "1px solid rgba(255,255,255,0.1)",
									bgcolor: "rgba(255,255,255,0.03)",
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between",
									gap: 2,
								}}>
								<Box sx={{ display: "flex", alignItems: "center", gap: 1.5, minWidth: 0 }}>
									<Award className="w-5 h-5 text-indigo-400 shrink-0" />
									<Typography
										variant="subtitle1"
										sx={{
											color: "white",
											fontWeight: 600,
											fontSize: "0.95rem",
											overflow: "hidden",
											textOverflow: "ellipsis",
											whiteSpace: "nowrap",
										}}>
										{certTitle}
									</Typography>
								</Box>
								<a
									href={ImgSertif}
									target="_blank"
									rel="noopener noreferrer"
									style={{
										display: "inline-flex",
										alignItems: "center",
										gap: "6px",
										color: "#60a5fa",
										fontSize: "0.85rem",
										fontWeight: 600,
										textDecoration: "none",
										padding: "6px 12px",
										borderRadius: "8px",
										backgroundColor: "rgba(96, 165, 250, 0.1)",
										border: "1px solid rgba(96, 165, 250, 0.2)",
										whiteSpace: "nowrap",
									}}>
									Buka Full Tab <ExternalLink className="w-3.5 h-3.5" />
								</a>
							</Box>
							<iframe
								src={`${ImgSertif}#toolbar=1`}
								title={certTitle}
								style={{
									width: "100%",
									flex: 1,
									border: "none",
									backgroundColor: "#ffffff",
								}}
							/>
						</Box>
					) : (
						/* Regular Image in Modal */
						<Box sx={{ position: "relative", p: 2, textAlign: "center" }}>
							<img
								src={ImgSertif}
								alt={certTitle}
								style={{
									display: "block",
									maxWidth: "100%",
									maxHeight: "80vh",
									margin: "0 auto",
									objectFit: "contain",
									borderRadius: "12px",
								}}
							/>
							<Typography
								variant="subtitle1"
								sx={{
									color: "white",
									fontWeight: 600,
									mt: 1.5,
									textAlign: "center",
								}}>
								{certTitle}
							</Typography>
						</Box>
					)}
				</Box>
			</Modal>
		</Box>
	)
}

export default Certificate
