"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {MdOutlineManageSearch} from "react-icons/md";
import qs from "query-string";

const SearchBug = () => {
    const [search,setSearch] = useState<string>("");
    const router = useRouter();

    useEffect(()=>{
        const query = {
          title:search,
        };

        const url = qs.stringifyUrl({
          url:"/",
          query:query,
        });

        router.push(url,{});
    },[search,router]);

  return (
    <div className="">
        <div className="flex items-center justify-between">
            <input value={search} onChange={(e)=>setSearch(e.target.value)} className="bg-transparent outline-none w-full text-sm placeholder:font-thin" placeholder="search by title"/>
            <MdOutlineManageSearch className="text-[20px] cursor-pointer hover:text-gray-400 duration-100"/>
        </div>
    </div>
  )
}

export default SearchBug
