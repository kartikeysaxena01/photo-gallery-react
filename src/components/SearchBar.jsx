import React from "react";
function SearchBar({setSearch}){
    return(
        <div className="flex justify-center mb-8">
            <input 
            type="text"
            placeholder="Search photos..."
            onChange={(e)=>setSearch(e.target.value)}
            className="border p-2 rounded w-80 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
        </div>
    )
}
export default SearchBar;