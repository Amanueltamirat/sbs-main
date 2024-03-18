import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import { Store } from '../../Store'
import { useNavigate, useNavigation } from 'react-router-dom'
import './USerList.css'
import { BASE_URL } from '../../utils'
const UserList =()=> {
const [showModal, setShowModal] = useState(false)
const [usersList, setUsersList] = useState([])
const [currentId, setCurrentId] = useState(null)
const {state} = useContext(Store)
const {userInfo} = state

const navigate = useNavigate()
useEffect(() => {
    try {
      const fetchData = async () => {
        const { data } = await axios.get(
          `${BASE_URL}/api/users`
        );
        setUsersList(data)
      };
      fetchData();
    } catch (err) {
      console.log(err);
    }
  }, []);


const handleDeleteUser = async()=>{
setShowModal(false)
try{
const {data} = await axios.delete(`${BASE_URL}/api/users/deleteUser/${currentId}`)
window.location.reload()
} catch (err){
    console.log(err)
}
console.log(currentId)
}


 return (
    <div className='user-list'>
        <table className='table'>
           <thead>
              <tr>
              
              <th className='id-class'>ID</th>
              <th>NAME</th>
              <th>Email</th>
              <th>ACTION</th>
            
              </tr>
           </thead>
    <tbody>
        {
            usersList.map((user)=>{
                return(
                  <tr key={user._id} onClick={()=>setCurrentId(user._id)}>
                    <td className='id-class'>{user._id}</td>
                    <td className='user-info'>{user.name}</td>
                    <td className='user-info'>{user.email}</td>
                    {userInfo.isAdmin && 
                    
                    <div className='btns'>
                        {/* <Button style={{color:'black'}} >Edit</Button> */}
                        <Button style={{color:'black'}} onClick={()=>setShowModal(true)} variant='danger'>Delete</Button>
                        </div>}
                  </tr>  
                )
            })
        }
    </tbody>
            </table>
    {showModal && 
    <div onClick={()=>setShowModal(false)} className='delete-btn'>
        <h3>Are you sure you want to delete this acount?</h3>
    <div className='flex justify-center  btns'>
        <Button  variant='danger' onClick={handleDeleteUser}>Yes, I'm sure</Button>
        <Button  onClick={()=>setShowModal(false)}>No, cancel</Button>
    </div>
    </div>}
    </div>
  )
}

export default UserList