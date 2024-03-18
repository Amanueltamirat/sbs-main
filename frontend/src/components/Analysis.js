import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { BASE_URL, getError } from '../utils'

function Analysis() {

const [totalArticles, setTotalArticles] = useState()
const [lastMonthArticles, setLastMonthArticles] = useState()
const [totalSermons, setTotalSermons] = useState()
const [lastMonthSermons, setLastMonthSermons] = useState()
const [totalBooks, setTotalBooks] = useState()
const [lastMonthBooks, setLastMonthBooks] = useState()
const [totalUsers, setTotalUsers] = useState()
const [lastMonthUsers, setLastMonthUsers] = useState()
const [loading, setLoading] = useState(false)
const [error, setError] = useState(null)

useEffect(()=>{
const allArticles = async()=>{
    try{
        setLoading(true)
    const {data} = await axios.get(`${BASE_URL}/api/articles/getallarticles`);
    setLoading(false)
    setTotalArticles(data.totalArticles)
    setLastMonthArticles(data.lastMonthArticles)
    } catch(err){
        toast.error(getError(err))
        setError(err)
    }
}
const allSermons = async()=>{
    try{
    setLoading(true)
    const {data} = await axios.get(`${BASE_URL}/api/sermons/allsermons`);
      setLoading(false);
      setTotalSermons(data.totalSermons);
      setLastMonthSermons(data.lastMonthSermons)
    }catch(err){
        toast.error(getError(err))
        setError(err)
    }
}
const allBooks = async()=>{
    try{
    setLoading(true)
    const {data} = await axios.get(`${BASE_URL}/api/books/getallbooks`);
        setLoading(false);
      setTotalBooks(data.totalBooks);
      setLastMonthBooks(data.lastMonthBooks)
    }catch(err){
        toast.error(getError(err))
        setError(err)
    }
}
const allUsers = async()=>{
     try{
    setLoading(true)
    const {data} = await axios.get(`${BASE_URL}/api/users/allUsers`);
      setLoading(false);
      setTotalUsers(data.totalUsers);
      setLastMonthUsers(data.lastMonthUsers)
    }catch(err){
        toast.error(getError(err))
        setError(err)
    }
}
allArticles();
allSermons();
allBooks();
allUsers();
},[])



  return (
    <div className='analysis'>
        <div className='total-box'>
            <div>
                <strong>Total Articles</strong>
                <p>{totalArticles}</p>
            </div>
            <div>
                <strong>Total Sermons</strong>
                <p>{totalSermons}</p>
            </div>
            <div>
                <strong>Total Books</strong>
                <p>{totalBooks}</p>
            </div>
            <div>
                <strong>Total Users</strong>
                <p>{totalUsers}</p>
            </div>
        </div>
         <div className='lastmonth-box'>
            <div>
                <strong>Articles Created last month</strong>
                <p>{lastMonthArticles}</p>
            </div>
            <div>
                <strong>Sermons Created last month</strong>
                <p>{lastMonthSermons}</p>
            </div>
            <div>
                <strong>Books Created  last month</strong>
                <p>{lastMonthBooks}</p>
            </div>
            <div>
                <strong>Users Jioned last month</strong>
                <p>{lastMonthUsers}</p>
            </div>
        </div>
    </div>
  )
}

export default Analysis