"use client"

import { User } from "@prisma/client"
import UserProfile from "../ui/UserProfile"

interface SearchResultsProps{
  results: Array<User>
}

const SearchResults: React.FC<SearchResultsProps> = ({results}) => {
  return (
    <div className="w-full flex flex-col items-baseline">
      {results.map(user=>(
        <div className="hover:bg-slate-800 w-full p-1 cursor-pointer flex duration-150">
          <UserProfile image={user.image} username={user.name}/>
        </div>
      ))}
    </div>
  )
}

export default SearchResults