exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('roles').del()
    .then(function () {
      // Inserts seed entries
      return knex('roles').insert([
        {name: 'admin', permission_id: 1},
        {name: 'moderator', permission_id: 2},
        {name: 'alumni', permission_id: 3}       
      ]);
    });
};
