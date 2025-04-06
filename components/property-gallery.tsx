"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ImageIcon, X, ChevronLeft, ChevronRight } from "lucide-react"
//import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

interface ImageData {
  src: string
  alt: string
}

// Función para obtener todas las imágenes de las categorías
const getAllPhotos = () => {
  const allPhotos: ImageData[] = [];
  
  // Agregar imágenes de Exterior
  for (let i = 1; i <= 11; i++) {
    allPhotos.push({
      src: `/images/exterior-${i}.jpg`,
      alt: `Vista exterior ${i}`
    });
  }
  
  // Agregar imágenes de Bedroom 1
  for (let i = 1; i <= 2; i++) {
    allPhotos.push({
      src: `/images/bedroom1-${i}.jpg`,
      alt: `Dormitorio 1 ${i}`
    });
  }
  
  // Agregar imágenes de Bedroom 2
  for (let i = 1; i <= 1; i++) {
    allPhotos.push({
      src: `/images/bedroom2-${i}.jpg`,
      alt: `Dormitorio 2 ${i}`
    });
  }
  
  // Agregar imágenes de Bathroom 1
  for (let i = 1; i <= 4; i++) {
    allPhotos.push({
      src: `/images/bathroom1-${i}.jpg`,
      alt: `Baño 1 ${i}`
    });
  }
  
  // Agregar imágenes de Bathroom 2
  for (let i = 1; i <= 1; i++) {
    allPhotos.push({
      src: `/images/bathroom2-${i}.jpg`,
      alt: `Baño 2 ${i}`
    });
  }
  
  // Agregar imágenes de Kitchen
  for (let i = 1; i <= 3; i++) {
    allPhotos.push({
      src: `/images/kitchen-${i}.jpg`,
      alt: `Cocina ${i}`
    });
  }
  
  // Agregar imágenes de Living area
  for (let i = 1; i <= 3; i++) {
    allPhotos.push({
      src: `/images/living-${i}.jpg`,
      alt: `Sala de estar ${i}`
    });
  }
  
  // Agregar imágenes de Dining
  for (let i = 1; i <= 3; i++) {
    allPhotos.push({
      src: `/images/dining-${i}.jpg`,
      alt: `Comedor ${i}`
    });
  }
  
  // Agregar imágenes de Views
  for (let i = 1; i <= 2; i++) {
    allPhotos.push({
      src: `/images/view-${i}.jpg`,
      alt: `Vista ${i}`
    });
  }
  
  // Agregar imágenes de Parking
  for (let i = 1; i <= 2; i++) {
    allPhotos.push({
      src: `/images/parking-${i}.jpg`,
      alt: `Parking ${i}`
    });
  }
  
  return allPhotos;
}

const categories = {
  "All photos": getAllPhotos(),
  "Exterior": Array(11).fill(0).map((_, i) => ({
    src: `/images/exterior-${i+1}.jpg`,
    alt: `Vista exterior ${i+1}`
  })),
  "Bedroom 1": Array(2).fill(0).map((_, i) => ({
    src: `/images/bedroom1-${i+1}.jpg`,
    alt: `Dormitorio 1 ${i+1}`
  })),
  "Bedroom 2": Array(1).fill(0).map((_, i) => ({
    src: `/images/bedroom2-${i+1}.jpg`,
    alt: `Dormitorio 2 ${i+1}`
  })),
  "Bathroom 1": Array(4).fill(0).map((_, i) => ({
    src: `/images/bathroom1-${i+1}.jpg`,
    alt: `Baño 1 ${i+1}`
  })),
  "Bathroom 2": Array(1).fill(0).map((_, i) => ({
    src: `/images/bathroom2-${i+1}.jpg`,
    alt: `Baño 2 ${i+1}`
  })),
  "Kitchen": Array(3).fill(0).map((_, i) => ({
    src: `/images/kitchen-${i+1}.jpg`,
    alt: `Cocina ${i+1}`
  })),
  "Living area": Array(3).fill(0).map((_, i) => ({
    src: `/images/living-${i+1}.jpg`,
    alt: `Sala de estar ${i+1}`
  })),
  "Dining": Array(3).fill(0).map((_, i) => ({
    src: `/images/dining-${i+1}.jpg`,
    alt: `Comedor ${i+1}`
  })),
  "Views": Array(2).fill(0).map((_, i) => ({
    src: `/images/view-${i+1}.jpg`,
    alt: `Vista ${i+1}`
  })),
  "Parking": Array(2).fill(0).map((_, i) => ({
    src: `/images/parking-${i+1}.jpg`,
    alt: `Parking ${i+1}`
  }))
} as const

type CategoryKey = keyof typeof categories

export default function PropertyGallery() {
  const [showAllPhotos, setShowAllPhotos] = useState(false)
  const [currentCategory, setCurrentCategory] = useState<CategoryKey>("All photos")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showFullImage, setShowFullImage] = useState(false)

  const currentImages = categories[currentCategory]

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index)
    setShowFullImage(true)
  }

  const navigateImage = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentImageIndex(prev => (prev === 0 ? currentImages.length - 1 : prev - 1))
    } else {
      setCurrentImageIndex(prev => (prev === currentImages.length - 1 ? 0 : prev + 1))
    }
  }

  return (
    <>
      {/* Galería principal */}
      <div className="relative">
        <div className="grid grid-cols-4 gap-2 overflow-hidden rounded-lg h-[400px]">
          {/* Mostrar las primeras 5 imágenes de "All photos" */}
          <div className="col-span-2 row-span-2">
            <div className="relative w-full h-full">
              <Image 
                src={categories["All photos"][0].src} 
                alt={categories["All photos"][0].alt} 
                fill 
                className="object-cover cursor-pointer" 
                onClick={() => handleImageClick(0)}
                priority
              />
            </div>
          </div>
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className="col-span-1 row-span-1">
              <div className="relative w-full h-full">
                <Image 
                  src={categories["All photos"][index].src} 
                  alt={categories["All photos"][index].alt} 
                  fill 
                  className="object-cover cursor-pointer" 
                  onClick={() => handleImageClick(index)}
                />
              </div>
            </div>
          ))}
        </div>

        <Button
          variant="secondary"
          className="absolute flex items-center gap-2 bottom-4 right-4"
          onClick={() => setShowAllPhotos(true)}
        >
          <ImageIcon className="w-4 h-4" />
          Ver todas las fotos
        </Button>
      </div>

      {/* Modal de todas las fotos */}
      <Dialog open={showAllPhotos} onOpenChange={setShowAllPhotos}>
      <DialogContent 
          className="max-w-6xl h-[90vh] flex flex-col p-0 overflow-hidden"
          onInteractOutside={(e) => e.preventDefault()} // Previene el cierre al hacer clic fuera
        >
          <DialogHeader className="p-4 border-b">
            <div className="flex justify-between items-center">
              <DialogTitle className="text-lg font-semibold">Fotos de la propiedad</DialogTitle>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setShowAllPhotos(false)}
                className="rounded-full"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </DialogHeader>
          
          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar de categorías */}
            <div className="w-64 p-4 border-r overflow-y-auto">
              <h3 className="font-bold mb-4">Photo gallery</h3>
              <ul className="space-y-2">
                {(Object.keys(categories) as CategoryKey[]).map(category => (
                  <li key={category}>
                    <Button
                      variant={currentCategory === category ? "secondary" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setCurrentCategory(category)}
                    >
                      {category} ({categories[category].length})
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Galería de imágenes */}
            <div className="flex-1 p-4 overflow-y-auto">
              <h4 className="font-semibold mb-4">{currentCategory} ({currentImages.length})</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {currentImages.map((image, index) => (
                  <div 
                    key={index} 
                    className="relative h-60 w-full cursor-pointer"
                    onClick={() => handleImageClick(index)}
                  >
                    <Image 
                      src={image.src || "/placeholder.svg"} 
                      alt={image.alt} 
                      fill 
                      className="object-cover rounded-lg" 
                    />
                  </div>
                ))}
              </div>
              
              {/* Descripción (solo para "All photos") */}
              {currentCategory === "All photos" && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <p>The condo complex features a beautiful pool on the 4th-floor rooftop with sun loungers and dining tables.</p>
                  <p className="mt-2">A great place to spend time between trips to the beach.</p>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Visor de imagen completa */}
      <Dialog open={showFullImage} onOpenChange={setShowFullImage}>
      <DialogContent 
          className="max-w-4xl p-0 bg-black"
          onInteractOutside={(e) => e.preventDefault()} // Previene el cierre al hacer clic fuera
        >
          <DialogHeader className="sr-only">
            <DialogTitle>Visor de imagen</DialogTitle>
          </DialogHeader>
          <div className="relative h-[80vh]">
            <Image 
              src={currentImages[currentImageIndex].src || "/placeholder.svg"} 
              alt={currentImages[currentImageIndex].alt} 
              fill 
              className="object-contain" 
            />
            
            {/* Controles de navegación */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
              onClick={() => navigateImage('prev')}
            >
              <ChevronLeft className="w-8 h-8" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
              onClick={() => navigateImage('next')}
            >
              <ChevronRight className="w-8 h-8" />
            </Button>
            
            {/* Botón de cerrar */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-4 top-4 bg-black/50 hover:bg-black/70 text-white"
              onClick={() => setShowFullImage(false)}
            >
              <X className="w-6 h-6" />
            </Button>
            
            {/* Indicador de imagen */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full">
              {currentImageIndex + 1} / {currentImages.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}