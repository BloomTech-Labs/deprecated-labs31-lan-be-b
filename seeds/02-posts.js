exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(async function () {
      // Inserts seed entries
      const defaultRoom = await knex("rooms").first();
      console.log(defaultRoom)
      return knex('posts').insert([
        {user_id: 1, question:'jar gonj ar gon ja', answer:'jar gonj ar gon jajar gonj ar gon jajar gonj ar gon ja', likes:0, comments:0, track:0, room_id: defaultRoom.id},
        {user_id: 2, question:'jar gonj ar gon ja', answer:'jar gonj ar gon jajar gonj ar gon jajar gonj ar gon ja', likes:0, comments:0, track:0, room_id: defaultRoom.id},
        {user_id: 3, question:'jar gonj ar gon ja', answer:'jar gonj ar gon jajar gonj ar gon jajar gonj ar gon ja', likes:0, comments:0, track:0, room_id: defaultRoom.id}
      ]);
    });
};