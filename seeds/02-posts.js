exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {id: 1, user_id: 1, question:'jar gonj ar gon ja', answer:'jar gonj ar gon jajar gonj ar gon jajar gonj ar gon ja', likes, comments, track},
        {id: 2, user_id: 2, question:'jar gonj ar gon ja', answer:'jar gonj ar gon jajar gonj ar gon jajar gonj ar gon ja', likes, comments, track},
        {id: 3, user_id: 3, question:'jar gonj ar gon ja', answer:'jar gonj ar gon jajar gonj ar gon jajar gonj ar gon ja', likes, comments, track}
      ]);
    });
};