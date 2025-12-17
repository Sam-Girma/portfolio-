import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  projectName: string;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images, projectName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const openLightbox = () => {
    setIsOpen(true);
    setCurrentIndex(0);
  };

  const closeLightbox = () => {
    setIsOpen(false);
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, currentIndex]);

  // Portal content
  const modalContent = (
    <div
      className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-sm flex items-center justify-center animate-fade-in"
      onClick={closeLightbox}
    >
      {/* Close Button */}
      <button
        onClick={closeLightbox}
        className="absolute top-4 right-4 md:top-8 md:right-8 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all z-[100001] shadow-xl"
        aria-label="Close gallery"
      >
        <X size={28} />
      </button>

      {/* Image Counter */}
      <div className="absolute top-4 left-4 md:top-8 md:left-8 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full text-white font-medium z-[100001]">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Navigation Buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 md:p-4 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all z-[100001]"
            aria-label="Previous image"
          >
            <ChevronLeft size={32} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 md:p-4 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all z-[100001]"
            aria-label="Next image"
          >
            <ChevronRight size={32} />
          </button>
        </>
      )}

      {/* Main Image Container */}
      <div 
        className="relative w-full h-full flex items-center justify-center px-4 md:px-20 py-20"
      >
        <img
          src={images[currentIndex]}
          alt={`${projectName} - Image ${currentIndex + 1}`}
          className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div 
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[90vw] px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full scrollbar-hide z-[100001]"
          onClick={(e) => e.stopPropagation()}
        >
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(idx);
              }}
              className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                idx === currentIndex 
                  ? 'border-accent scale-110' 
                  : 'border-white/30 opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Stacked Preview Cards */}
      <div className="relative w-full h-48 cursor-pointer group" onClick={openLightbox}>
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Background Card 2 (furthest back) */}
          {images.length > 2 && (
            <div className="absolute w-[85%] h-[90%] bg-secondary border-2 border-border rounded-xl shadow-lg transform translate-y-4 translate-x-2 opacity-60 group-hover:translate-y-5 group-hover:translate-x-3 transition-all duration-300"></div>
          )}
          
          {/* Background Card 1 (middle) */}
          {images.length > 1 && (
            <div className="absolute w-[90%] h-[95%] bg-secondary border-2 border-border rounded-xl shadow-lg transform translate-y-2 translate-x-1 opacity-80 group-hover:translate-y-3 group-hover:translate-x-2 transition-all duration-300"></div>
          )}
          
          {/* Front Card (main preview) */}
          <div className="relative w-[95%] h-full bg-secondary border-2 border-accent/30 rounded-xl shadow-2xl overflow-hidden group-hover:border-accent transition-all duration-300 group-hover:scale-[1.02]">
            <img 
              src={images[0]} 
              alt={`${projectName} preview`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
              <div className="text-white text-center">
                <p className="text-lg font-semibold">View Gallery</p>
                <p className="text-sm text-gray-300">{images.length} {images.length === 1 ? 'image' : 'images'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Render Modal via Portal */}
      {isOpen && ReactDOM.createPortal(modalContent, document.body)}
    </>
  );
};
