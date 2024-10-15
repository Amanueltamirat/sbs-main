import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import { Store } from '../../Store'
import { useNavigate, useNavigation } from 'react-router-dom'
import './USerList.css'
import LoadingBox from '../../components/LoadingBox'


const UserList =({setIsHome})=> {
  setIsHome(false)
const [showModal, setShowModal] = useState(false)
const [usersList, setUsersList] = useState([])
const [currentId, setCurrentId] = useState(null)
const [loading, setLoading] = useState(false)
const {state} = useContext(Store)
const {userInfo} = state
const navigate = useNavigate()

useEffect(() => {
    try {
      setLoading(true)
      const fetchData = async () => {
        const { data } = await axios.get(
          `/api/users`
        );
        setUsersList(data)
        setLoading(false)
      };
      fetchData();
    } catch (err) {
      console.log(err);
    }
  }, []);


const handleDeleteUser = async()=>{
setShowModal(false)
try{
const {data} = await axios.delete(`/api/users/deleteUser/${currentId}`)
window.location.reload()
removeUserHandler(data)
} catch (err){
    console.log(err)
}
// console.log(currentId)
}

 const removeUserHandler = (user) => {
    ctxDispatch({
      type: "REMOVE_USER",
      payload: user,
    });
  };
 return (
    <div className='user-list'>
      { usersList === null ? <div className='no-user'><h2>There Is No User</h2> </div>:
      loading ? <LoadingBox/>:
      <>
        <table className='table'>
           <thead>
              <tr>
              <th className='id-class'>ID</th>
              <th>NAME</th>
              <th>Email</th>
              {
             userInfo.email === 'Perfecttesfa456@gmail.com' &&
              <th>ACTION</th>
              }
            
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
                    {userInfo.email === 'Perfecttesfa456@gmail.com'&& 
                    
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
    </>
    }
    </div>
  )
}

export default UserList