"use client"
import { cn } from "@/lib/utils/cn"
import { NavbarLink } from "@/types"
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { HTMLAttributes } from "react"

interface NavLinkProps extends HTMLAttributes<HTMLLinkElement>{
  navLink: NavbarLink
}

const NavLink: React.FC<NavLinkProps> = ({navLink,className}) => {
  const currentPath = usePathname();
    
  return (
    <Link href={navLink.link} className={cn("relative text-darkGray font-roboto font-extralight hover:text-blackGray after:absolute after:-bottom-1 after:left-[50%] after:-translate-x-[50%] after:content-[''] after:w-0 after:h-[1.5px] after:bg-lightBlue after:duration-200 hover:after:w-[100%]",currentPath===navLink.link && "font-bold",className)}>{navLink.label}</Link>
  )
}

export default NavLink