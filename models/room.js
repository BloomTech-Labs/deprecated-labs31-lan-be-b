const database = require("../database/dbConfig");
const Post = require("./post");

const fetchAll = () => {
    return database("rooms");
}

const fetch = async (name) => {
    const room = await database("rooms").where({name}).first();
    if(room){
        const posts = await Post.fetchByRoom(room.id);
        room.posts = posts;
    }
    return room;
}

const create = async (name, description, banner_image=null, icon=null) => {
    const roomData = {
        name,
        description
    }
    if(banner_image) roomData.banner_image = banner_image;
    if(icon) roomData.icon = icon;

    const roomName = await database("rooms").insert(roomData).returning("name");
    return fetch(roomName[0]);
}


const update = async (originalName, name, description, banner_image=null, icon=null) => {
    const roomData = {
        description
    }
    if(name !== originalName) roomData.name = name;
    if(banner_image) roomData.banner_image = banner_image;
    if(icon) roomData.icon = icon;

    const roomName = await database("rooms").where({name: originalName}).update(roomData).returning("name");
    return fetch(roomName[0]);
}

const remove = async (name) => {
    return database("rooms").where({name}).del().returning("*");
}

module.exports = {
    fetchAll,
    fetch,
    create,
    update,
    remove
}