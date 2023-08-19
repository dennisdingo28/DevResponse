"use client"

import { Dispatch, SetStateAction } from "react";
import Logo from "../ui/Logo";
import { navbarLinks } from "@/constants";
import NavLink from "../ui/NavLink";
import Container from "../ui/Container";

interface MobileNavbarLinksProps{
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

const MobileNavbarLinks: React.FC<MobileNavbarLinksProps> = ({open,setOpen}) => {
    if(open){
        return(
            <div className="absolute z-20 top-0 bottom-0 left-0 right-0 bg-softDarkBlue text-white">
                <Container className="absolute z-20 top-0 bottom-0 left-0 right-0">
                    <div className="flex items-center justify-between">
                        <div className="">
                            <Logo/>
                        </div>
                    </div>
                    <div className="h-full flex flex-col items-center justify-center gap-5">
                        {navbarLinks.map(link=>(
                            <NavLink navLink={link} className="text-[1.2em]"/>
                        ))}
                    </div>
                </Container>
            </div>
        )
    }
    return;
}

export default MobileNavbarLinks