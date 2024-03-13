import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

function SearchInput() {

 const [searchTerm, setSearchTerm] = useState('')
  const location = useLocation()
  const navigate = useNavigate()
  useEffect(()=>{
      const urlParams = new URLSearchParams(location.search);
      const searchTermFromUrl = urlParams.get('searchTerm');
      if(searchTermFromUrl){
        setSearchTerm(searchTermFromUrl)
      }

  },[location])

const handleSubmit = (e)=>{
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`)
}


  return (
    <div>
        <form onSubmit={handleSubmit}>
        <input  placeholder='Search...' className='search-input'  type='text' style={{width:'120%', height:'30px', backgroundColor:'lightgray'}} onChange={(e)=>setSearchTerm(e.target.value)}/>
        </form>
    </div>
  )
}

export default SearchInput