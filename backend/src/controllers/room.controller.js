const roomModel = require('../models/room.model')
const calculateDistance = require('../utils/calculateDistance')

async function createRoom (req,res){
 const {lat, long} = req.body   
 if(!lat && !long){
    return res.status(400).json({
        message:'lat and long is required'
    })
 }
 const roomId = Math.random().toString(36).slice(2,8)
 const newRoom = await roomModel.create({
    lat,
    long,
    roomId,
    radius:5
 })

 return res.status(200).json({
    link:`http://localhost:3000/join/${roomId}`,
   room:newRoom
 })
}

async function canJoinRoom(req,res){
    const {lat, long} = req.body
    const {roomId} = req.params

    if(!lat && !long){
        return res.status(400).json({
            message:'lat and long is required'
        })
    }

    const room = await roomModel.findOne({roomId})
    if(!room){
     return res.status(404).json({
        message:'room not found'
     })
    }

 let distance  =   calculateDistance(lat, long, room.lat, room.long)    
 const allowed = distance<=room.radius
 if(!allowed){
    return res.status(400).json({
        message:'you are outside the range'
    })
 }
 return res.status(200).json({
    message:'allowed'
 })
    
}


module.exports = {createRoom, canJoinRoom}