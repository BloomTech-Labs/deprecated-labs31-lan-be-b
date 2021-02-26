
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user_roles').del()
    .then(async function () {
      // Inserts seed entries
      const roles = await knex("roles");
      return knex('user_roles').insert([
        {user_id: 1, role_id: roles[0].id},
        {user_id: 2, role_id: roles[1].id},
        {user_id: 3, role_id: roles[2].id},
      ]);
    });
};
