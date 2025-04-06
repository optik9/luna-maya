"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { addDays, format, differenceInDays } from "date-fns"
import { es } from "date-fns/locale"
import { Star, ChevronDown, Calendar as CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export default function BookingWidget() {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date | undefined }>({
    from: new Date(),
    to: addDays(new Date(), 2),
  })
  const [guests, setGuests] = useState("2")
  const [calendarOpen, setCalendarOpen] = useState(false)

  const nightsCount = dateRange.from && dateRange.to 
    ? differenceInDays(dateRange.to, dateRange.from) 
    : 0

  const pricePerNight = 75
  const cleaningFee = 35
  const serviceFee = Math.round(pricePerNight * nightsCount * 0.12)
  const total = pricePerNight * nightsCount + cleaningFee + serviceFee

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return
    
    if (!dateRange.from || (dateRange.from && dateRange.to)) {
      setDateRange({ from: date, to: undefined })
    } else {
      if (date > dateRange.from) {
        setDateRange(prev => ({ ...prev, to: date }))
        setCalendarOpen(false)
      } else {
        setDateRange({ from: date, to: undefined })
      }
    }
  }

  const formatDateDisplay = (date: Date | undefined) => {
    if (!date) return "Seleccionar"
    return format(date, "d MMM", { locale: es })
  }

  const handleReservation = () => {
    if (!dateRange.from || !dateRange.to) {
      alert("Por favor selecciona las fechas de tu estadía")
      return
    }

    const formattedCheckIn = format(dateRange.from, "dd/MM/yyyy")
    const formattedCheckOut = format(dateRange.to, "dd/MM/yyyy")
    
    const message = `¡Hola! Estoy interesado en hacer una reserva:
    
📅 Fechas: ${formattedCheckIn} al ${formattedCheckOut}
👥 Huéspedes: ${guests} persona(s)
💰 Total estimado: $${total} USD ($${pricePerNight} USD/noche × ${nightsCount} noches + tarifas)

Por favor confírmame la disponibilidad. ¡Gracias!`

    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/51997542843?text=${encodedMessage}`
    
    window.open(whatsappUrl, "_blank")
  }

  return (
    <Card className="shadow-lg border-0">
      <CardContent className="p-6">
        <div className="flex items-baseline justify-between mb-4">
          <div>
            <span className="text-2xl font-bold">${pricePerNight} USD</span>
            <span className="text-gray-600"> / noche</span>
          </div>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="ml-1 font-medium">4.9</span>
            <span className="ml-1 text-gray-600">(3)</span>
          </div>
        </div>

        {/* Selector de fechas */}
        <div className="p-4 mb-4 border rounded-lg bg-gray-50">
          <div className="grid grid-cols-2 gap-2 mb-4">
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "justify-start text-left h-14",
                    !dateRange.from && "text-muted-foreground"
                  )}
                >
                  <div className="flex flex-col items-start w-full">
                    <span className="text-xs font-medium text-gray-500">LLEGADA</span>
                    <div className="flex items-center w-full justify-between">
                      <span>{formatDateDisplay(dateRange.from)}</span>
                      <CalendarIcon className="h-4 w-4 text-gray-500" />
                    </div>
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dateRange.from}
                  onSelect={handleDateSelect}
                  defaultMonth={dateRange.from}
                  numberOfMonths={2}
                  disabled={{ before: new Date() }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "justify-start text-left h-14",
                    !dateRange.to && "text-muted-foreground"
                  )}
                >
                  <div className="flex flex-col items-start w-full">
                    <span className="text-xs font-medium text-gray-500">SALIDA</span>
                    <div className="flex items-center w-full justify-between">
                      <span>{formatDateDisplay(dateRange.to)}</span>
                      <CalendarIcon className="h-4 w-4 text-gray-500" />
                    </div>
                  </div>
                </Button>
              </PopoverTrigger>
            </Popover>
          </div>

          <div>
            <Select value={guests} onValueChange={setGuests}>
              <SelectTrigger className="h-14 text-left">
                <div className="flex flex-col items-start w-full">
                  <span className="text-xs font-medium text-gray-500">HUÉSPEDES</span>
                  <div className="flex items-center w-full justify-between">
                    <SelectValue placeholder="Seleccionar huéspedes" />
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </div>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 huésped</SelectItem>
                <SelectItem value="2">2 huéspedes</SelectItem>
                <SelectItem value="3">3 huéspedes</SelectItem>
                <SelectItem value="4">4 huéspedes</SelectItem>
                <SelectItem value="5">5 huéspedes</SelectItem>
                <SelectItem value="6">6 huéspedes</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button 
          className="w-full h-14 text-lg bg-teal-600 hover:bg-teal-700" 
          size="lg"
          onClick={handleReservation}
        >
          Reservar ahora
        </Button>

        <p className="mt-3 text-sm text-center text-gray-500">No se te cobrará todavía</p>

        <div className="mt-6 space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-700">
              ${pricePerNight} USD × {nightsCount} {nightsCount === 1 ? "noche" : "noches"}
            </span>
            <span className="font-medium">${pricePerNight * nightsCount} USD</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700">Tarifa de limpieza</span>
            <span className="font-medium">${cleaningFee} USD</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700">Tarifa de servicio</span>
            <span className="font-medium">${serviceFee} USD</span>
          </div>
          
          <div className="pt-3 mt-3 border-t">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">${total} USD</span>
            </div>
          </div>
        </div>

        <div className="mt-6 text-sm text-center text-gray-500">
          <p>Cancelación gratuita hasta 48 horas antes del check-in</p>
        </div>
      </CardContent>
    </Card>
  )
}