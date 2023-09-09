"use client"
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {MdOutlineManageSearch} from "react-icons/md";

const SearchBug = () => {
    const [search,setSearch] = useState<string>("");
    const pathname = usePathname();
    const router = useRouter();

    useEffect(()=>{
        console.log(pathname);
        const newUrl = `${pathname}?query=${search}`;
        router.replace(newUrl);
    },[search]);

  return (
    <div className="">
        <div className="flex items-center justify-between">
            <input value={search} onChange={(e)=>setSearch(e.target.value)} className="bg-transparent outline-none w-full" placeholder="search by title"/>
            <MdOutlineManageSearch className="text-[20px] cursor-pointer hover:text-gray-400 duration-100"/>
        </div>
    </div>
  )
}

export default SearchBug
