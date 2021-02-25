exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('comments').del()
    .then(async function () {
      // Inserts seed entries
      const post = await knex("posts").first();
      return knex('comments').insert([
        {user_id: 1, post_id: post.id, comment: 'Admin Comment', likes:0},
        {user_id: 2, post_id: post.id, comment: 'Mod Comment', likes:0},
        {user_id: 3, post_id: post.id, comment: 'User Comment', likes:0}
      ]);
    });
};