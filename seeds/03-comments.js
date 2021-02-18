exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('comments').del()
    .then(function () {
      // Inserts seed entries
      return knex('comments').insert([
        {id: 1, user_id: 1, post_id: 1, comment: 'Admin Comment', likes},
        {id: 1, user_id: 2, post_id: 1, comment: 'Mod Comment', likes},
        {id: 1, user_id: 3, post_id: 1, comment: 'User Comment', likes}
      ]);
    });
};