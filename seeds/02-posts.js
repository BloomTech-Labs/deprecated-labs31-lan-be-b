exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {user_id: 1, question:'jar gonj ar gon ja', answer:'jar gonj ar gon jajar gonj ar gon jajar gonj ar gon ja', likes:0, comments:0, track:0},
        {user_id: 2, question:'jar gonj ar gon ja', answer:'jar gonj ar gon jajar gonj ar gon jajar gonj ar gon ja', likes:0, comments:0, track:0},
        {user_id: 3, question:'jar gonj ar gon ja', answer:'jar gonj ar gon jajar gonj ar gon jajar gonj ar gon ja', likes:0, comments:0, track:0}
      ]);
    });
};