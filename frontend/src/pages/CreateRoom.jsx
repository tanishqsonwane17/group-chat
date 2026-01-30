import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
const CreateRoom = () => {
const [link, setLink] = useState('')

function createroom(){
    navigator.geolocation.getCurrentPosition(async({coords})=>{
   const res =  await axios.post('http://localhost:3000/room/create',{
      lat:coords.latitude,
      long:coords.longitude
    })
    setLink(res.data.link)
  })
}


  return (
    <>
    <button onClick={createroom}>
      create room
    </button>

<Link to ={link} >{link}</Link>
    </>
  )
}

export default CreateRoom