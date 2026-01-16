"use client"

import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { useState } from "react"

const navItems = [
  { name: "Início", href: "/" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b-4 border-black bg-background">
      <div className="container flex h-20 items-center justify-center px-4 md:px-8">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter text-black uppercase bg-primary px-3 py-1 border-2 border-black shadow-[4px_4px_0_0_black] sm:shadow-[6px_6px_0_0_black] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_black] transition-all text-center">DANIEL MOTA</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
