exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {id: 1, user_id: 'rowValue1', question:'', answer:'', likes:'', comments:'', track:'', category:'', created_at:'', updated_at:''},
        {id: 2, user_id: 'rowValue1', question:'', answer:'', likes:'', comments:'', track:'', category:'', created_at:'', updated_at:''},
        {id: 3, user_id: 'rowValue1', question:'', answer:'', likes:'', comments:'', track:'', category:'', created_at:'', updated_at:''}
      ]);
    });
};