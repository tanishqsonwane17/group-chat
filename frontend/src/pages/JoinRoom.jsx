import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { io } from 'socket.io-client'
import { useParams } from 'react-router-dom'

const JoinRoom = () => {
  const { roomId } = useParams()
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState([])
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async ({ coords }) => {
      let res = await axios.post(`http://localhost:3000/room/join/${roomId}`, {
        lat: coords.latitude,
        long: coords.longitude
      })

      if (res.data.message === 'allowed') {
        const s = io('http://localhost:3000')
        s.emit('join-room', roomId)

        s.on('receive-message', (msg) => {
          setChat(prev => [...prev, msg])
        })

        setSocket(s)
      } else {
        alert('You are outside the range')
      }
    })
  }, [])

  const sendMessage = (e) => {
    e.preventDefault()
    if (!socket) return

    socket.emit('send-message', { roomId, message })
    setMessage('')
  }

  return (
    <div className="max-w-lg mx-auto p-4 flex flex-col h-screen bg-white text-black">

      <h2 className="text-center text-xl font-semibold bg-black text-white p-3 rounded mb-3">
        Room: {roomId}
      </h2>

      <div className="flex-1 overflow-y-auto border border-black rounded p-3 bg-white">
        {chat.map((item, index) => (
          <p
            key={index}
            className="w-fit max-w-[70%] bg-black text-white px-3 py-2 rounded mb-2"
          >
            {item}
          </p>
        ))}
      </div>

      <form onSubmit={sendMessage} className="flex gap-2 mt-3">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 border border-black p-2 rounded outline-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button className="bg-black text-white px-4 py-2 rounded">
          Send
        </button>
      </form>

    </div>
  )
}

export default JoinRoom
