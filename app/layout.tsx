import type React from "react"
import "@/app/globals.css"
import { Inter } from 'next/font/google'
import type { Metadata } from "next"
//import { ThemeProvider } from "@/components/theme-provider"



const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Hermoso apartamento en Playa del Carmen - VRBO",
  description:
    "Disfruta de este hermoso apartamento ubicado en el corazón de Playa del Carmen, a solo unos pasos de la playa y de la famosa Quinta Avenida.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

