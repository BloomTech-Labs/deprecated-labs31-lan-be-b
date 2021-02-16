const database = require('../database/dbConfig');
const Permission =  require("./permission");

//permissions expects an object like the following;
// {UU: boolean, UC: boolean, UD: boolean ...etc}
const create = async (roleName, permissions) => {
    const permissionId = await Permission.create(permissions);
    return database("roles").insert({name: roleName, permission_id: permissionId}).returning("*");
}

const fetch = id => {
    return database("roles as r")
    .leftJoin("permissions as p", "p.id", "r.permission_id")
    .where({"r.id": id})
    .select("r.name as role_name", "r.id", "p.UU", "p.UC", "p.UD", "p.PCU", "p.PCD", "p.RC", "p.RU", "p.RD")
    .first();
}

//updates object looks like this:
//{name: string, permissisons {UC: true, UU: true, etc...}}
const update = async (id, updates) => {
    const role = await database("roles").where({id: id}).update({name: updates.name}).returning("*")
    await Permission.update(role.permission_id, updates.permissions);
    return role;
}

const remove = async id => {
    const role = await database("roles").where({id: id}).del().returning("*");
    await Permission.remove(role.permission_id);
    return role;
}

module.exports = {
    create,
    fetch,
    update,
    remove
}