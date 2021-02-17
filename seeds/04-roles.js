exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('roles').del()
    .then(function () {
      // Inserts seed entries
      return knex('roles').insert([
        {id: 1, name: 'Admin', permission_id: '1'},
        {id: 2, name: 'Mod', permission_id: '2'},
        {id: 3, name: 'User', permission_id: '3'}       
      ]);
    });
};
