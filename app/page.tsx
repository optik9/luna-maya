'use client';

import { useState, useEffect } from "react";
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Waves, ShoppingBag, Plane, Utensils, BathIcon, ToiletIcon, CigaretteOff,
  Home as HomeIcon, Heart, Dumbbell, ShowerHead, Microwave, WashingMachine,
  ClockIcon, BanIcon, PawPrintIcon, CalendarX2Icon, InfoIcon, FileTextIcon,
  BedDouble, BedSingle, LayoutGrid, Square, DoorOpen,
  Star, MapPin, Users, Wifi, Car, Coffee, Tv, Snowflake,
  WavesLadderIcon
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Link from 'next/link';
import PropertyGallery from "@/components/property-gallery"
import BookingWidget from "@/components/booking-widget"
import PropertyMap from "@/components/property-map"

export default function Home() {
  const [showAmenitiesModal, setShowAmenitiesModal] = useState(false);
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [showAllReviewsModal, setShowAllReviewsModal] = useState(false);
  const [showCancellationPolicyModal, setShowCancellationPolicyModal] = useState(false);
  const [activeTab, setActiveTab] = useState("reviews");
  // Agrega al inicio del componente, con los demás estados
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<{
    title: string;
    description: string;
    features: string[];
    image: string;
  } | null>(null);
  //const [isMobile, setIsMobile] = useState(false);

  // Define la información de los dormitorios basada en el documento
const roomDetails = {
  bedroom1: {
    title: "Dormitorio 1",
    description: "Amplia habitación con vista al mar en el penthouse Luna Maya, Tierra 6.",
    features: [
      "Cama king-size de alta calidad",
      "Armario de pared a pared con amplio espacio de almacenamiento",
      "Baño completo en suite con secador de cabello y artículos de baño incluidos",
      "Ventanas con cortinas eléctricas anticiclónicas",
      "Aire acondicionado individual",
      "TV pantalla plana",
      "Vistas panorámicas al mar Caribe"
    ],
    image: "/images/bedroom1-2.jpg"
  },
  bedroom2: {
    title: "Dormitorio 2",
    description: "Habitación espaciosa con acabados de lujo en el penthouse Luna Maya.",
    features: [
      "Cama king-size premium",
      "Armario de pared a pared con sistema de organización",
      "Baño completo en suite con amenities de cortesía",
      "Pisos de mármol y acabados de alta gama",
      "Aire acondicionado individual con control remoto",
      "Balcón privado con vistas a la piscina y áreas comunes",
      "Iluminación ambiental regulable"
    ],
    image: "/images/bedroom2-1.jpg"
  }
};

// Función para abrir el modal con la habitación seleccionada
const openRoomModal = (room: 'bedroom1' | 'bedroom2') => {
  setSelectedRoom(roomDetails[room]);
  setShowRoomModal(true);
};

  useEffect(() => {
    const handleResize = () => {
      //setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToSection = (id: string) => {
    if (id === 'policies') {
      setActiveTab('policies');
      id = 'tabs-container';
    }

    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const yOffset = -100;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({top: y, behavior: 'smooth'});
      }
    }, 50);
  };

  const amenities = [
    { icon: <Wifi className="w-5 h-5 text-teal-600" />, name: "WiFi de alta velocidad" },
    { icon: <Car className="w-5 h-5 text-teal-600" />, name: "Estacionamiento gratuito" },
    { icon: <Coffee className="w-5 h-5 text-teal-600" />, name: "Cocina totalmente equipada" },
    { icon: <Tv className="w-5 h-5 text-teal-600" />, name: "TV pantalla plana con cable" },
    { icon: <Snowflake className="w-5 h-5 text-teal-600" />, name: "Aire acondicionado" },
    { icon: <HomeIcon className="w-5 h-5 text-teal-600" />, name: "Piscina comunitaria" },
    { icon: <Dumbbell className="w-5 h-5 text-teal-600" />, name: "Gimnasio" },
    { icon: <ShowerHead className="w-5 h-5 text-teal-600" />, name: "Artículos de baño incluidos" },
    { icon: <Microwave className="w-5 h-5 text-teal-600" />, name: "Microondas" },
    { icon: <WashingMachine className="w-5 h-5 text-teal-600" />, name: "Lavadora" },
    { icon: <Heart className="w-5 h-5 text-teal-600" />, name: "Toallas y ropa de cama" }
  ];

  const reviews = [
    {
      name: "María",
      date: "Marzo 2025",
      rating: 4.9,
      content: "Excelente ubicación, el apartamento es tal como se ve en las fotos. Muy limpio y con todas las comodidades necesarias. Definitivamente volveríamos."
    },
    {
      name: "Carlos",
      date: "Febrero 2025",
      rating: 5,
      content: "La vista al mar es increíble y la ubicación perfecta. A pocos minutos caminando de restaurantes y tiendas. El anfitrión fue muy atento."
    },
    {
      name: "Ana Martínez",
      date: "Enero 2025",
      rating: 5,
      content: "El apartamento superó todas nuestras expectativas. La ubicación es perfecta, a pocos pasos de la playa y en una zona tranquila. El anfitrión fue muy atento y nos dejó recomendaciones excelentes. Definitivamente volveremos."
    }
  ];

  const houseRules = [
    { icon: <ClockIcon className="mr-2 mt-0.5 h-4 w-4 text-gray-500" />, text: "Llegada: 15:00 a 20:00" },
    { icon: <ClockIcon className="mr-2 mt-0.5 h-4 w-4 text-gray-500" />, text: "Salida: 11:00" },
    { icon: <BanIcon className="mr-2 mt-0.5 h-4 w-4 text-gray-500" />, text: "No se permiten fiestas o eventos" },
    { icon: <CigaretteOff className="mr-2 mt-0.5 h-4 w-4 text-gray-500" />, text: "No fumar" },
    { icon: <PawPrintIcon className="mr-2 mt-0.5 h-4 w-4 text-gray-500" />, text: "No se admiten mascotas" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="container flex items-center justify-between h-16 px-4 mx-auto">
          <div className="flex items-center">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-primary">Luna Maya</span>
              <span className="text-sm text-muted-foreground hidden sm:block">Tierra 6</span>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link href="/" passHref>
              <Button variant="ghost" className="text-sm sm:text-base">Inicio</Button>
            </Link>
            <Button 
              variant="ghost" 
              className="text-sm sm:text-base"
              onClick={() => scrollToSection('amenities')}
            >
              Servicios
            </Button>
            <Button 
              variant="ghost" 
              className="text-sm sm:text-base"
              onClick={() => {
                setActiveTab('policies');
                scrollToSection('tabs-container');
              }}
            >
              Políticas
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container px-4 mx-auto mt-6 pb-12">
        {/* Property Gallery */}
        <PropertyGallery />

        {/* Property Info */}
        <div className="grid grid-cols-1 gap-8 mt-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold">Hermoso apartamento en Playa del Carmen con vista al mar</h1>
                <div className="flex items-center mt-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>Playa del Carmen, Quintana Roo, México</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center mt-4 gap-3 sm:gap-4">
              <div className="flex items-center">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
                <span className="ml-1 font-medium">4.9</span>
                <span className="ml-1 text-gray-600">(3 reseñas)</span>
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                <span className="ml-1 text-gray-600">4 huéspedes</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-600">2 habitaciones</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-600">1 baño</span>
              </div>
            </div>

            <hr className="my-6" />

            {/* Amenities */}
            <div id="amenities" className="mb-6">
              <h2 className="mb-4 text-xl font-bold">Servicios principales</h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                <div className="flex items-center">
                  <Wifi className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-gray-600" />
                  <span>WiFi</span>
                </div>
                <div className="flex items-center">
                  <Car className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-gray-600" />
                  <span>Estacionamiento</span>
                </div>
                <div className="flex items-center">
                  <Coffee className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-gray-600" />
                  <span>Cocina</span>
                </div>
                <div className="flex items-center">
                  <Tv className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-gray-600" />
                  <span>TV</span>
                </div>
                <div className="flex items-center">
                  <Snowflake className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-gray-600" />
                  <span>Aire acondicionado</span>
                </div>
                <div className="flex items-center">
                  <WavesLadderIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-gray-600" />
                  <span>Piscina</span>
                </div>
              </div>
              <Button 
                variant="link" 
                className="mt-2 text-teal-600"
                onClick={() => setShowAmenitiesModal(true)}
              >
                Mostrar todas las amenidades
              </Button>
            </div>

            <hr className="my-6" />

            {/* Rooms & Beds Section */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <HomeIcon className="w-5 h-5 mr-2 text-teal-600" />
                Habitaciones y camas
              </h2>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex items-center mb-3">
                  <BedDouble className="w-5 h-5 mr-2 text-teal-600" />
                  <h3 className="font-semibold">2 dormitorios (para 4 personas)</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded shadow-sm">
                  <div className="relative w-full h-48 mb-2 overflow-hidden rounded-md cursor-pointer" onClick={() => openRoomModal('bedroom1')}>
  <Image
    src="/images/bedroom1-2.jpg"
    alt="Dormitorio 1"
    fill
    className="object-cover transition-opacity duration-300 hover:opacity-90"
  />
</div>
                    <div className="flex items-center mb-1">
                      <BedSingle className="w-4 h-4 mr-2 text-gray-600" />
                      <span className="font-medium">Dormitorio 1</span>
                    </div>
                    <p className="text-sm text-gray-600">1 cama king size</p>
                  </div>
                  
                  <div className="bg-white p-3 rounded shadow-sm">
                  <div className="relative w-full h-48 mb-2 overflow-hidden rounded-md cursor-pointer" onClick={() => openRoomModal('bedroom2')}>
  <Image
    src="/images/bedroom2-1.jpg"
    alt="Dormitorio 2"
    fill
    className="object-cover transition-opacity duration-300 hover:opacity-90"
  />
</div>
                    <div className="flex items-center mb-1">
                      <BedSingle className="w-4 h-4 mr-2 text-gray-600" />
                      <span className="font-medium">Dormitorio 2</span>
                    </div>
                    <p className="text-sm text-gray-600">2 camas individuales</p>
                  </div>
                </div>
              </div>

              {/* Bathrooms */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-3">
                  <BathIcon className="w-5 h-5 mr-2 text-teal-600" />
                  <h3 className="font-semibold">1 baño completo, 1 medio baño</h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded shadow-sm text-center">
                    <div className="flex justify-center space-x-4 mb-1">
                      <ShowerHead className="w-6 h-6 text-teal-600" />
                      <ToiletIcon className="w-6 h-6 text-teal-600" />
                    </div>
                    <p className="text-sm font-medium">Baño 1</p>
                    <p className="text-xs text-gray-600">Excusado · Regadera</p>
                  </div>
                  
                  <div className="bg-white p-3 rounded shadow-sm text-center">
                    <ToiletIcon className="w-6 h-6 mx-auto text-teal-600 mb-1" />
                    <p className="text-sm font-medium">Baño 2</p>
                    <p className="text-xs text-gray-600">Excusado</p>
                  </div>
                </div>
              </div>
            </div>

            <hr className="my-6" />

            {/* Spaces Section */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <LayoutGrid className="w-5 h-5 mr-2 text-teal-600" />
                Espacios
              </h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                <div className="bg-gray-50 p-3 sm:p-4 rounded-lg text-center">
                  <Square className="w-6 h-6 sm:w-8 sm:h-8 mx-auto text-gray-400 mb-2" />
                  <p className="font-medium text-sm sm:text-base">Terraza</p>
                </div>
                
                <div className="bg-gray-50 p-3 sm:p-4 rounded-lg text-center">
                  <Utensils className="w-6 h-6 sm:w-8 sm:h-8 mx-auto text-gray-400 mb-2" />
                  <p className="font-medium text-sm sm:text-base">Cocina</p>
                </div>
                
                <div className="bg-gray-50 p-3 sm:p-4 rounded-lg text-center">
                  <DoorOpen className="w-6 h-6 sm:w-8 sm:h-8 mx-auto text-gray-400 mb-2" />
                  <p className="font-medium text-sm sm:text-base">Balcón</p>
                </div>
              </div>
            </div>

            <hr className="my-6" />

            {/* Description */}
            <div id="description" className="mb-6">
              <h2 className="mb-4 text-xl font-bold">Descripción</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Disfruta de este hermoso apartamento ubicado en el corazón de Playa del Carmen, a solo unos pasos de
                  la playa y de la famosa Quinta Avenida.
                </p>
                <p>
                  El apartamento cuenta con 2 habitaciones, 1 baño completo, cocina totalmente equipada, sala de estar
                  con TV de pantalla plana y balcón con vista al mar. Además, tendrás acceso a la piscina del complejo,
                  gimnasio y área de barbacoa.
                </p>
                <p>
                  Ideal para parejas o pequeñas familias que buscan disfrutar de unas vacaciones inolvidables en el
                  Caribe mexicano.
                </p>
              </div>
              <Button 
                variant="link" 
                className="mt-2 text-teal-600"
                onClick={() => setShowDescriptionModal(true)}
              >
                Leer más
              </Button>
            </div>

            <hr className="my-6" />

            {/* Tabs for Reviews, Location, etc */}
            <div id="tabs-container" className="lg:col-span-2">
              <div id="policies" className="lg:col-span-2">
                <Tabs defaultValue="reviews" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="reviews">Reseñas (3)</TabsTrigger>
                    <TabsTrigger value="location">Ubicación</TabsTrigger>
                    <TabsTrigger value="policies">Políticas</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="reviews" className="pt-4">
                    <div className="space-y-4">
                      <div className="flex items-center mb-4">
                        <Star className="w-6 h-6 text-yellow-500" />
                        <span className="ml-2 text-xl font-bold">4.9 · 3 reseñas</span>
                      </div>

                      {reviews.slice(0, 2).map((review, index) => (
                        <Card key={index} className="mb-4">
                          <CardContent className="pt-6">
                            <div className="flex items-center mb-2">
                              <div className="w-10 h-10 mr-3 overflow-hidden rounded-full bg-gray-200 flex items-center justify-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="w-6 h-6 text-gray-500"
                                >
                                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                                  <circle cx="12" cy="7" r="4" />
                                </svg>
                              </div>
                              <div>
                                <p className="font-medium">{review.name}</p>
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <Star 
                                      key={i} 
                                      className={`w-4 h-4 ${i < Math.floor(review.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                                    />
                                  ))}
                                  <span className="ml-2 text-sm text-gray-500">{review.date}</span>
                                </div>
                              </div>
                            </div>
                            <p className="mt-2 text-gray-700">
                              {"\""}{review.content}{"\""}
                            </p>
                          </CardContent>
                        </Card>
                      ))}

                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => setShowAllReviewsModal(true)}
                      >
                        Ver todas las reseñas
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="location" className="pt-4">
                    <PropertyMap />
                    <div className="mt-6 p-4 sm:p-6 bg-white rounded-lg shadow-sm">
                      <h3 className="mb-4 text-xl font-semibold flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-teal-600" />
                        <span>Luna Maya Condominios, Playa del Carmen</span>
                      </h3>
                      
                      <p className="text-gray-600 mb-6">
                        Ubicado a solo 200 metros de la playa y a 5 minutos caminando de la famosa Quinta Avenida, 
                        donde encontrarás numerosos restaurantes, tiendas y vida nocturna.
                      </p>
                      
                      <div className="space-y-4">
                        <div className="flex items-start gap-4">
                          <div className="p-2 bg-teal-50 rounded-full">
                            <Waves className="w-5 h-5 text-teal-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">Distancia a la playa</h4>
                            <p className="text-gray-600">200 metros (3 minutos caminando)</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-4">
                          <div className="p-2 bg-teal-50 rounded-full">
                            <ShoppingBag className="w-5 h-5 text-teal-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">Quinta Avenida</h4>
                            <p className="text-gray-600">5 minutos caminando</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-4">
                          <div className="p-2 bg-teal-50 rounded-full">
                            <Plane className="w-5 h-5 text-teal-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">Aeropuerto de Cancún</h4>
                            <p className="text-gray-600">45 minutos en auto</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-4">
                          <div className="p-2 bg-teal-50 rounded-full">
                            <Utensils className="w-5 h-5 text-teal-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">Zona de restaurantes</h4>
                            <p className="text-gray-600">Más de 20 opciones a menos de 10 minutos</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="policies" className="pt-4">
                    <div className="space-y-6">
                      <div className="rounded-lg border border-gray-200 p-5 shadow-sm">
                        <div className="flex items-start">
                          <div className="mr-4 mt-1 shrink-0">
                            <HomeIcon className="h-5 w-5 text-teal-600" />
                          </div>
                          <div>
                            <h3 className="mb-3 text-lg font-semibold text-gray-800">Normas de la casa</h3>
                            <ul className="space-y-2.5 text-gray-700">
                              {houseRules.map((rule, index) => (
                                <li key={index} className="flex items-start">
                                  {rule.icon}
                                  <span>{rule.text}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-lg border border-gray-200 p-5 shadow-sm">
                        <div className="flex items-start">
                          <div className="mr-4 mt-1 shrink-0">
                            <CalendarX2Icon className="h-5 w-5 text-teal-600" />
                          </div>
                          <div>
                            <h3 className="mb-3 text-lg font-semibold text-gray-800">Política de cancelación</h3>
                            <div className="rounded-md bg-teal-50 p-3 text-gray-700">
                              <p className="flex items-start">
                                <InfoIcon className="mr-2 mt-0.5 h-4 w-4 text-teal-600" />
                                <span>
                                  Cancelación gratuita por 48 horas después de la reservación, si la reserva se realiza con al menos
                                  14 días de anticipación a la fecha de llegada.
                                </span>
                              </p>
                            </div>
                            <Button
                              variant="link"
                              className="mt-3 p-0 text-teal-600 hover:text-teal-700"
                              onClick={() => setShowCancellationPolicyModal(true)}
                            >
                              <div className="flex items-center">
                                <FileTextIcon className="mr-1.5 h-4 w-4" />
                                Leer política completa
                              </div>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>

          {/* Booking Widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <BookingWidget />
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <Dialog open={showAmenitiesModal} onOpenChange={setShowAmenitiesModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Todas las Amenidades</DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {amenities.map((amenity, index) => (
              <div key={index} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                {amenity.icon}
                <span>{amenity.name}</span>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showDescriptionModal} onOpenChange={setShowDescriptionModal}>
  <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
    <DialogHeader className="sticky top-0 bg-white z-10 pb-4 border-b">
      <DialogTitle className="text-2xl font-bold">Luna Maya, Tierra 6 - Tu Refugio Exclusivo en Playa del Carmen</DialogTitle>
    </DialogHeader>
    
    <div className="space-y-6 text-gray-700 pt-4">
      <div className="bg-teal-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-teal-700 mb-2">¡Bienvenido a tu paraíso escondido!</h3>
        <p className="text-gray-700">
          Descubre el escape perfecto en el corazón de Playa del Carmen. Este impresionante penthouse ofrece vistas panorámicas al mar, 
          comodidades modernas y una ubicación inmejorable a solo unos pasos de las aguas turquesas de Coco Beach y la vibrante energía 
          de la 5ta Avenida.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Sobre la Propiedad</h3>
        <p>
          Ubicado dentro del exclusivo <strong>Condominio Luna Maya</strong>, este desarrollo íntimo cuenta con 36 residencias distribuidas 
          en seis encantadores edificios, lo que garantiza un ambiente tranquilo y privado. El patio central, cuidadosamente mantenido, 
          cuenta con una reluciente piscina, una palapa con sombra y cómodos asientos, además de tumbonas ideales para relajarse bajo 
          el sol mexicano.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Detalles del Penthouse</h3>
        <p>
          <strong>Tierra 6</strong> es un <strong>penthouse espacioso de 99 m²</strong> ubicado en el tercer piso del edificio Tierra. 
          Cuenta con:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-2">
          <li><strong>2 amplias habitaciones</strong>, cada una con cama king-size, armario de pared a pared y baño completo en suite</li>
          <li><strong>Cocina moderna</strong> con encimeras de granito, totalmente equipada con electrodomésticos y utensilios</li>
          <li><strong>Espacio de vida abierto, luminoso y aireado</strong> con un cómodo sofá que se convierte en cama king-size</li>
          <li><strong>Balcón privado</strong> con impresionantes vistas al mar, la piscina y las exuberantes áreas comunes</li>
          <li><strong>Acabados de lujo</strong>, incluidos pisos de mármol y cortinas eléctricas anticiclónicas</li>
          <li><strong>Comodidades adicionales</strong> como lavadora y secadora, estacionamiento subterráneo reservado y seguridad 24/7</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Distribución de Camas</h3>
        <ul className="space-y-3">
          <li className="flex items-start">
            <BedDouble className="flex-shrink-0 w-5 h-5 mr-2 mt-0.5 text-teal-600" />
            <div>
              <strong>Habitación 1:</strong> Cama king-size, vista al mar, armario de pared a pared, baño completo en suite
            </div>
          </li>
          <li className="flex items-start">
            <BedDouble className="flex-shrink-0 w-5 h-5 mr-2 mt-0.5 text-teal-600" />
            <div>
              <strong>Habitación 2:</strong> Cama king-size, armario de pared a pared, baño completo en suite
            </div>
          </li>
          <li className="flex items-start">
            <BedSingle className="flex-shrink-0 w-5 h-5 mr-2 mt-0.5 text-teal-600" />
            <div>
              <strong>Sala de estar:</strong> Sofá que se convierte en cama Queen-sized
            </div>
          </li>
        </ul>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Ubicación Privilegiada</h3>
        <p>
          Explora lo mejor de Playa del Carmen desde esta ubicación estratégica:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-2">
          <li><strong>1 cuadra</strong> de Coco Beach y sus vibrantes clubes de playa</li>
          <li><strong>2 cuadras</strong> de la famosa 5ta Avenida con sus tiendas, restaurantes y vida nocturna</li>
          <li><strong>A 10 minutos a pie</strong> de la Playa Principal de Playa del Carmen</li>
          <li><strong>Cerca de las principales atracciones</strong> como Xcaret, Xplor, ruinas mayas, cenotes y eco-parques</li>
          <li><strong>Próximo a supermercados locales</strong> (Super Chedraui, Walmart, Mega) para todas tus necesidades</li>
          <li><strong>A pocos minutos en auto</strong> de exclusivos campos de golf y centros comerciales</li>
        </ul>
      </div>

   
    </div>
  </DialogContent>
</Dialog>

      <Dialog open={showAllReviewsModal} onOpenChange={setShowAllReviewsModal}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Todas las Reseñas ({reviews.length})</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {reviews.map((review, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 mr-3 overflow-hidden rounded-full bg-gray-200 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-6 h-6 text-gray-500"
                      >
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">{review.name}</p>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < Math.floor(review.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                          />
                        ))}
                        <span className="ml-2 text-sm text-gray-500">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="mt-2 text-gray-700">
                    {"\""}{review.content}{"\""}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showCancellationPolicyModal} onOpenChange={setShowCancellationPolicyModal}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Política de Cancelación Completa</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 text-gray-700">
            <h3 className="font-semibold text-lg">Política de Reembolso:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Cancelación gratuita:</strong> Disponible por 48 horas después de la reservación, 
                siempre que la reserva se realice con al menos 14 días de anticipación a la fecha de llegada.
              </li>
              <li>
                <strong>Cancelación con 14 días o más de anticipación:</strong> Reembolso completo excepto la tarifa de servicio.
              </li>
              <li>
                <strong>Cancelación entre 7 y 13 días antes del check-in:</strong> Reembolso del 50% del total, excepto la tarifa de servicio.
              </li>
              <li>
                <strong>Cancelación con menos de 7 días de anticipación:</strong> No hay reembolso disponible.
              </li>
            </ul>

            <h3 className="font-semibold text-lg mt-6">Política de Cambios:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Los cambios de fecha están sujetos a disponibilidad y pueden aplicar tarifas diferenciales.</li>
              <li>No se permiten cambios con menos de 72 horas de anticipación.</li>
            </ul>

            <h3 className="font-semibold text-lg mt-6">Casos Especiales:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                En casos de emergencia médica comprobable (requiere documentación), se puede ofrecer crédito para futura estadía.
              </li>
              <li>
                En caso de desastres naturales que impidan el acceso a la propiedad, se ofrecerá reembolso completo o cambio de fechas.
              </li>
            </ul>

            <div className="mt-6 p-4 bg-teal-50 rounded-lg">
              <h4 className="font-semibold text-teal-700">Notas importantes:</h4>
              <p className="mt-2 text-sm">
                • Las tarifas de servicio no son reembolsables en ningún caso.<br/>
                • Los reembolsos pueden tardar de 5 a 10 días hábiles en procesarse.<br/>
                • Para solicitar cancelaciones o cambios, contacta directamente al anfitrión.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

<Dialog open={showRoomModal} onOpenChange={setShowRoomModal}>
  <DialogContent className="max-w-3xl">
    {selectedRoom && (
      <>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{selectedRoom.title}</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
            <Image
              src={selectedRoom.image}
              alt={selectedRoom.title}
              fill
              className="object-cover"
            />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Descripción</h3>
            <p className="text-gray-700 mb-4">{selectedRoom.description}</p>
            
            <h3 className="text-lg font-semibold mb-2">Características</h3>
            <ul className="space-y-2 text-gray-700">
              {selectedRoom.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4 mt-0.5 mr-2 text-teal-600"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-6 p-4 bg-teal-50 rounded-lg">
              <h4 className="font-semibold text-teal-700 mb-2">Detalles del Condominio</h4>
              <p className="text-sm text-gray-700">
                El exclusivo Condominio Luna Maya cuenta con 36 residencias distribuidas en seis edificios, 
                piscina comunitaria, palapa con sombra y seguridad 24/7. El penthouse Tierra 6 ofrece 99 m² 
                de espacio habitable con acabados de lujo.
              </p>
            </div>
          </div>
        </div>
      </>
    )}
  </DialogContent>
</Dialog>

      {/* Footer */}
      <footer className="bg-white py-8 sm:py-12 border-t border-gray-200">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
            <div className="max-w-xs">
              <div className="flex items-center gap-3 mb-4">
                <Image 
                  src="/logo.png" 
                  alt="Luna Maya - Tierra 6" 
                  width={40} 
                  height={40}
                  className="w-10 h-10"
                />
                <span className="text-xl font-bold text-gray-800">Luna Maya</span>
              </div>
              <p className="text-sm text-gray-600">
                Apartamento vacacional de lujo en Playa del Carmen. Vive la experiencia del Caribe Mexicano.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase mb-4 text-gray-800">Contacto</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <span>Erika Troilo: +52 984 123 4567</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <span>Reservaciones: +52 984 987 6543</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  <span>info@lunamaya-tierra6.com</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase mb-4 text-gray-800">Síguenos</h3>
              <div className="flex gap-4">
                <a href="#" className="text-gray-600 hover:text-teal-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-teal-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-teal-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 mt-8 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Luna Maya - Tierra 6. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}