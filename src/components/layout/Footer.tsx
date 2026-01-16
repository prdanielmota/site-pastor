import { Instagram, Youtube, Mail } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="w-full border-t-4 border-black bg-background mt-12">
      <div className="container px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl font-black uppercase bg-primary inline-block px-2 border-2 border-black shadow-[4px_4px_0_0_black]">Daniel Mota</h3>
            <p className="text-sm md:text-base font-medium border-l-4 border-black pl-4">
              Notícias e análises sobre o mundo cristão com uma perspectiva profética.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-base md:text-lg font-black uppercase tracking-wider border-b-2 border-black inline-block pb-1">Contato</h4>
            <ul className="space-y-2 text-sm font-bold">
              <li className="flex items-center gap-2 hover:bg-accent w-fit px-2 py-1 border-2 border-transparent hover:border-black transition-all cursor-pointer break-all sm:break-normal">
                <Mail className="h-5 w-5 shrink-0" />
                <span>contato@danielmota.org</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-base md:text-lg font-black uppercase tracking-wider border-b-2 border-black inline-block pb-1">Siga-nos</h4>
            <div className="flex space-x-4">
              <Link href="https://www.instagram.com/prdanielmota/" target="_blank" rel="noopener noreferrer" className="p-2 border-2 border-black shadow-[4px_4px_0_0_black] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_black] hover:bg-accent transition-all">
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="https://www.youtube.com/@Comunidade_Ser" target="_blank" rel="noopener noreferrer" className="p-2 border-2 border-black shadow-[4px_4px_0_0_black] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_black] hover:bg-accent transition-all">
                <Youtube className="h-6 w-6" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t-2 border-black text-center text-sm font-bold uppercase">
          <p>&copy; {new Date().getFullYear()} Daniel Mota. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
