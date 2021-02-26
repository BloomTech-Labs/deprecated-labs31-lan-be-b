exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('roles').del()
    .then(async function () {
      // Inserts seed entries
      const permissions = await knex("permissions");
      return knex('roles').insert([
        {name: 'admin', permission_id: permissions[0].id},
        {name: 'moderator', permission_id: permissions[1].id},
        {name: 'alumni', permission_id: permissions[2].id}       
      ]);
    });
};
