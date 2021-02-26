const database = require("../database/dbConfig");
const Post = require("./post");

const fetchAll = () => {
    return database("rooms");
}

const fetch = async (id) => {
    const room = await database("rooms").where({id}).first();
    if(room){
        const posts = await Post.fetchByRoom(room.id);
        room.posts = posts;
    }
    return room;
}

const create = async (data) => {
    const {name, description, banner_image, icon} = data;
    const roomData = {
        name,
        description
    }
    if(banner_image) roomData.banner_image = banner_image;
    if(icon) roomData.icon = icon;

    const roomName = await database("rooms").insert(roomData).returning("id");
    return fetch(roomName[0]);
}


const update = async (id, updates) => {
    const {name, description, banner_image, icon} = updates;
    const roomData = {
        description
    }
    if(name) roomData.name = name;
    if(banner_image) roomData.banner_image = banner_image;
    if(icon) roomData.icon = icon;

    await database("rooms").where({id}).update(roomData);
    return fetch(id);
}

const remove = async (id) => {
    return database("rooms").where({id}).del().returning("*");
}

module.exports = {
    fetchAll,
    fetch,
    create,
    update,
    remove
}