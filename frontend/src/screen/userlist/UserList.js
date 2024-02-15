import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import { Store } from '../../Store'
import { useNavigate, useNavigation } from 'react-router-dom'

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
          `http://localhost:4000/api/users`
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
const {data} = await axios.delete(`http://localhost:4000/api/users/deleteUser/${currentId}`)
window.location.reload()
} catch (err){
    console.log(err)
}
console.log(currentId)
}


 return (
    <div>
        <table className='table'>
<thead>
    <tr>
    
    <th>ID</th>
    <th>NAME</th>
    <th>Email</th>
    <th>ACTIONS</th>
  
    </tr>
</thead>
<tbody>
    {
        usersList.map((user)=>{
            return(
              <tr key={user._id} onClick={()=>setCurrentId(user._id)}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                {userInfo.isAdmin && <div className='btns'>
                    <Button >Edit</Button>
                    <Button onClick={()=>setShowModal(true)} variant='danger'>Delete</Button>
                    </div>}
              </tr>  
            )
        })
    }
</tbody>
        </table>
{showModal && <div onClick={()=>setShowModal(false)}>
    <h3>Are you sure you want to delete this acount?</h3>
<div className='flex justify-center  btns'>
    <Button variant='danger' onClick={handleDeleteUser}>Yes, I'm sure</Button>
    <Button onClick={()=>setShowModal(false)}>No, cancel</Button>
</div>
</div>}
    </div>
  )
}

export default UserList