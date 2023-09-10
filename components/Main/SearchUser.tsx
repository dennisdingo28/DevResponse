"use client"

import {FaRegUserCircle} from "react-icons/fa";
import SearchResults from "./SearchResults";
import { useEffect, useState } from "react";
import { User } from "@prisma/client";
import { User as LoggedUser } from "next-auth";
import axios from "axios";
import { toast } from "react-hot-toast";
import {BiLoaderAlt} from "react-icons/bi";

interface SearchUserProps{
    user: LoggedUser;
}

const SearchUser: React.FC<SearchUserProps> = ({user}) => {
    const [searchedUser,setSearchedUser] = useState<string>("");
    const [results,setResults] = useState<Array<User>>([]);
    const [loading,setLoading] = useState(false);

    console.log("searchred",results);
    
    useEffect(()=>{
        async function searchUser(name: string){
            const res = await axios.post('/api/account/find',{
                username:name,
            },{
                headers:{
                    Authorization:`Bearer ${user.token}`,
                },
            });
            console.log("axios",res);
            
            setResults(res.data.users);
        }
        setTimeout(async ()=>{
            try{
                setLoading(true);
                if(searchedUser.trim()==='')
                    setResults([]);
                else
                    await searchUser(searchedUser);
            }catch(err){
                toast.error("Something went wrong. Please try again later !");
            }finally{
                setLoading(false);
            }
        },1000);
    },[searchedUser]);

  return (
    <div className='w-full px-2 relative'>
        <div className="flex items-center gap-1 bg-darkBlue rounded-lg px-1">
            <input value={searchedUser} onChange={(e)=>setSearchedUser(e.target.value)} placeholder="search user by name" className='py-1 outline-none w-full bg-transparent text-sm pl-1 text-darkGray'/>
            <FaRegUserCircle className="text-gray-500"/>
            {loading && 
                <BiLoaderAlt className="animate-spin"/>
            }
        </div>
        <div className="absolute p-1 -bottom-15 left-0 right-0 w-full">
            <div className={`bg-slate-700 rounded-md duration-150 ${results && results.length>0 ? "opacity-100 z-10 relative":"absolute opacity-0 -z-10"}`}>
                <SearchResults results={results}/>
            </div>
        </div>
    </div>
  )
}

export default SearchUser