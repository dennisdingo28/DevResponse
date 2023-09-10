"use client";

import { User } from "@prisma/client";
import UserProfile from "../ui/UserProfile";

interface SearchResultsProps {
  results: Array<User>;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  return (
    <div className="w-full flex flex-col items-baseline">
      {results && results.length > 0 ? (
        results.map((user) => (
            <div className="hover:bg-slate-800 w-full rounded-md p-1 cursor-pointer flex duration-150">
              <UserProfile image={user.image} username={user.name} />
            </div>
        ))
      ) : (
        <div className="w-full flex justify-center p-1 cursor-pointer duration-150">
          <p className="text-sm text-center italic text-slate-300">no user was found</p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
