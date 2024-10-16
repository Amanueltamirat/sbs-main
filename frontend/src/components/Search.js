import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import ArticleCard from './ArticleCard';
import SermonCard from './SermonCard';
import BookCard from './BookCard';


function Search() {

const [sideBarData, setSideBarData] = useState({
    searchTerm:'',
    sort:'desc',
    category: 'articles',
})
const [articles, setArticles] = useState([])
const [sermons, setSermons] = useState([])
const [books, setBooks] = useState([])
const [loading, setLoading] = useState(false);
const [showMore, setShowMore] = useState(false);
const [showMoreBooks, setShowMoreBooks] = useState(false);
const [showMoreSermons, setShowMoreSermons] = useState(false);
const location = useLocation();
const navigate = useNavigate()

useEffect(()=>{
const urlParams = new URLSearchParams(location.search);
const searchTermFromUrl = urlParams.get('searchTerm');
const sortFormUrl = urlParams.get('sort')
  if(searchTermFromUrl || sortFormUrl){
    setSideBarData({
        ...sideBarData,
        searchTerm:searchTermFromUrl,
        sort:sortFormUrl
    })
  }

const fetchArticles = async()=>{
    setLoading(true);
    const searchQuery = urlParams.toString()
    const {data} = await axios.get(`/api/articles/getallarticles?${searchQuery}`);
        setArticles(data.articles);
        setLoading(false)
        if(data.articles.length === 2){
            setShowMore(true)
        }else{
            setShowMore(false)
        }
}
const fetchSermons = async()=>{
    setLoading(true);
    const searchQuery = urlParams.toString()
    const {data} = await axios.get(`/api/sermons/allsermons?${searchQuery}`);
        setSermons(data.sermons);
        setLoading(false)
        if(data.sermons.length === 2){
            setShowMoreSermons(true)
        }else{
            setShowMoreSermons(false)
        }
}
const fetchBooks = async()=>{
    setLoading(true);
    const searchQuery = urlParams.toString()
    const {data} = await axios.get(`/api/books/getallbooks?${searchQuery}`);
        setBooks(data.books)
        setLoading(false)
        if(data.books.length == 2){
            setShowMoreBooks(true)
        }else{
            setShowMoreBooks(false)
        }
}
fetchBooks()
fetchSermons()
fetchArticles()

},[location.search])

  const handleChange = (e) => {
    if (e.target.id === 'searchTerm') {
      setSideBarData({ ...sideBarData, searchTerm: e.target.value });
    }
    if (e.target.id === 'sort') {
      const order = e.target.value || 'desc';
      setSideBarData({ ...sideBarData, sort: order });
    }
    if (e.target.id === 'category') {
      const category = e.target.value || 'articles';
      setSideBarData({ ...sideBarData, category });
    }
  };

 const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', sideBarData.searchTerm);
    urlParams.set('sort', sideBarData.sort);
    urlParams.set('category', sideBarData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

 const handleShowMoreArticles = async () => {
    const numberOfPosts = articles.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/articles/getallarticles?${searchQuery}`);
    if (!res.ok) {
      return;
    }
    if (res.ok) {
      const data = await res.json();
      setArticles([...articles, ...data.articles]);
      if (data.articles.length === 5) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    }
  };


 const handleShowMoreSermons = async () => {
    const numberOfPosts = articles.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/sermons/allsermons?${searchQuery}`);
    if (!res.ok) {
      return;
    }
    if (res.ok) {
      const data = await res.json();
      setSermons([...sermons, ...data.sermons]);
      if (data.sermons.length === 5) {
        setShowMoreSermons(true);
      } else {
        setShowMoreSermons(false);
      }
    }
  };


 const handleShowMoreBooks = async () => {
    const numberOfPosts = articles.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/books/getallbooks?${searchQuery}`);
    if (!res.ok) {
      return;
    }
    if (res.ok) {
      const data = await res.json();
      setBooks([...books, ...data.books]);
      if (data.books.length === 5) {
        setShowMoreBooks(true);
      } else {
        setShowMoreBooks(false);
      }
    }
  };

  return (
    <div className='search'>
        <form onSubmit={handleSubmit}>
          <div>

            <label>Search Term:</label>
                <input type='text' id='searchTerm' placeholder='search'
                value={sideBarData.searchTerm}
                onChange={handleChange}
                />
          </div>
          <div>

            <label>Sort:</label>
                <select 
                value={sideBarData.sort}
                onChange={handleChange}  id='sort'>
                <option value='desc'>Latest</option>
                <option value='asc'>Oldest</option>
                </select>
          </div>

          <div>
               <label>Category:</label>
                 <select
              onChange={handleChange}
              value={sideBarData.category}
              id='category'
            >
              <option value='articles'>Articles</option>
              <option value='books'>Books</option>
              <option value='sermons'>Sermons</option>
            </select>
          </div>
            <Button type='submit' className='apply-btn'>
            Apply Filters
        </Button>
        </form>
         <div className='w-full'>
        <h1 className='text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5 '>
        Search results:
        </h1>
        <div className='p-7 flex flex-wrap gap-4'>
          {sideBarData.category === 'articles'?<>
          {!loading && articles.length === 0 && (
            <p className='text-xl text-gray-500'>No Articles found.</p>
          )}
          {loading && <p className='text-xl text-gray-500'>Loading...</p>}
          {!loading &&
            articles &&
            articles.map((article) => <ArticleCard key={article._id} articles={article} />)}
          {showMore && (
            <button
              onClick={handleShowMoreArticles}
              className='bottom-btn text-teal-500 text-lg hover:underline p-7 w-full'
            >
              Show More
            </button>
          )}
          </>:sideBarData.category === 'sermons'?<>
           {!loading && sermons.length === 0 && (
            <p className='text-xl text-gray-500'>No Sermons found.</p>
          )}
          {loading && <p className='text-xl text-gray-500'>Loading...</p>}
          {!loading &&
            sermons &&
            sermons.map((sermon) => <SermonCard key={sermon._id} sermon={sermon} />)}
          {showMoreSermons && (
            <button
              onClick={handleShowMoreSermons}
              className='text-teal-500 text-lg hover:underline p-7 w-full'
            >
              Show More
            </button>
          )}
          </>:<>
           {!loading && books.length === 0 && (
            <p className='text-xl text-gray-500'>No Books found.</p>
          )}
          {loading && <p className='text-xl text-gray-500'>Loading...</p>}
          {!loading &&
            books &&
            books.map((book) => <BookCard key={book._id} book={book} />)}
          {showMoreBooks && (
            <button
              onClick={handleShowMoreBooks}
              className='text-teal-500 text-lg hover:underline p-7 w-full'
            >
              Show More
            </button>
          )}
          </>}
          
        </div>
      </div>
    </div>
  )
}

export default Search