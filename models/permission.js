const database = require('../database/dbConfig');

//expects an object like the following;
// {UU: boolean, UC: boolean, UD: boolean ...etc}
const create = permission => {
    return database('permissions').insert(permission).returning("id");
}

const fetch = id => {
    return database('permissions').where({id: id}).first();
}

const update = (id, permission) => {
    return database("permissions").where({id: id}).update(permission).returning("id");
}

const remove = id => {
    return database("permissions").where({id: id}).del().returning("id");
}

module.exports = {
    create,
    fetch,
    update,
    remove
}