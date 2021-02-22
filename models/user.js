const database = require('../database/dbConfig');
const UserRole = require("./user_role");

const add = async (user, roleName="alumni") => {
    let newUser = await database('users').insert(user).returning('*');
    const newRole = await database('roles').where({name: roleName}).first();
    newUser = newUser[0];
    await UserRole.create(newUser.id, newRole.id);

    const role = await UserRole.fetch(newUser.id);
    newUser.permissions = role;
    return newUser;
};

const find = async filter => {
    const user = await database('users').where(filter).first();
    if(user){
        const role = await UserRole.fetch(user.id);
        user.permissions = role;
    }
    return user;
};

const fetchAllUsers = async () => {
    const users = await database("users");
    for(let user of users){
        const role = await UserRole.fetch(user.id);
        user.permissions = role;
    }
    return users;
}

// Fetch all of a single user's posts
const fetchPosts = userID => {
    return database('posts').where('user_id', userID);
};

// Can we mix these two? Should we?

// Fetch all of a single user's comments
const fetchComments = userID => {
    return database('comments').where('user_id', userID);
};

// Fetch user's liked posts
const fetchUsersLikedPosts = userID => {
    return database('liked_posts').where('user_id', userID);
};

// Fetch user's liked comments
const fetchUsersLikedComments = userID => {
    return database('liked_comments').where('user_id', userID);
};

const update = async (id, value) => {
    const role_id = value.role_id;
    delete value.role_id;
    const updates = {}
    if(value.track) updates.track = value.track;
    if(value.display_name) updates.display_name = value.display_name;
    if(value.email) updates.email = value.email;
    
    if(Object.keys(updates).length > 0){
        await database('users').where('id', id).update(updates);
    }
    const user = await database('users').where({id: id}).first();
    if(role_id){
        await UserRole.update(user.id, role_id);
        
    }
    const role = await UserRole.fetch(user.id);
    user.permissions = role;
    return user;
};

// Set a user's onboarded field to true
const onboard = userID => {
    return database('users').where('id', userID).update('onboarded', 'true').returning('*');
};

module.exports = {
    add,
    find,
    fetchAllUsers,
    fetchPosts,
    fetchComments,
    fetchUsersLikedPosts,
    fetchUsersLikedComments,
    update,
    onboard
};