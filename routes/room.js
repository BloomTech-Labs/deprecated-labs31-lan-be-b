const express = require('express');

const app = express.Router();
const rooms = require("../models/room");


//View List of All Rooms 
app.get('/', async (request, response)=>{
    if(request.user.permissions["UU"] !== true) return response.status(403).json({message: "Action Not Permitted"});
    
    const rooms = await rooms.fetchAll();
    
    response.status(200).json({rooms});
});

//Create New Room 
app.post("/", async (request, response)=>{
    const {name, permissions} = request.body;
    const newroom = await rooms.create(name, permissions);
    
    if(!newroom) return response.status(400).json({message: `room "${name}" already exists`})
    
    response.status(201).json({room: newroom});
})
//Search for Single Room 
app.get("/:id", async (request, response)=>{
    if(request.user.permissions["UU"] !== true) return 
    
    response.status(403).json({message: "Action Not Permitted"});
    
    const {id} = request.params;
    const room = await rooms.fetch(id);
    
    if(!room) return response.status(400).json({message: "Invalid room id"});
    response.status(200).json({room});
});

// Update Room by ID
app.put("/:id", async (request, response) => {
    
    if(request.user.permissions["UU"] !== true) return 
    response.status(403).json({message: "Action Not Permitted"});
    
    const {id} = request.params;
    const updatedroom = await rooms.update(id, request.body)
    
    response.status(201).json({room: updatedroom})  
});

//Delete Room 
app.delete("/:id", async (request, response) => {
    if(request.user.permissions["UU"] !== true) return 
    
    response.status(403).json({message: "Action Not Permitted"});
    
    const {id} = request.params;
    const deletedroom = await rooms.remove(id);
    
    if(!deletedroom) return response.status(400).json({message: "This room cannot be deleted"});
    response.status(201).json({message: "The room has been deleted", deletedroom});
});


module.exports = app;