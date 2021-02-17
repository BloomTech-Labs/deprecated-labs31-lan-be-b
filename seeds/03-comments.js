exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('comments').del()
    .then(function () {
      // Inserts seed entries
      return knex('comments').insert([
        {id: 1, user_id: 'rowValue1', post_id: 'rowValue1', comment: 'rowValue1', likes:'', created_at:'', updated_at:''},
        {id: 2, user_id: 'rowValue1', post_id: 'rowValue1', comment: 'rowValue1', likes:'', created_at:'', updated_at:''},
        {id: 3, user_id: 'rowValue1', post_id: 'rowValue1', comment: 'rowValue1', likes:'', created_at:'', updated_at:''}
      ]);
    });
};