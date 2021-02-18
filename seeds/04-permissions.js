exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('permissions').del()
    .then(function () {
      // Inserts seed entries
      return knex('permissions').insert([
        {id: 1, UC: 'TRUE', UU: 'TRUE', UD: 'TRUE', PCU: 'TRUE', PCD: 'TRUE', RC: 'TRUE', RU: 'TRUE', RD: 'TRUE'},
        {id: 2, UC: 'FALSE', UU: 'FALSE', UD: 'FALSE', PCU: 'TRUE', PCD: 'TRUE', RC: 'FALSE', RU: 'FALSE', RD: 'FALSE'},
        {id: 3, UC: 'FALSE', UU: 'FALSE', UD: 'FALSE', PCU: 'FALSE', PCD: 'FALSE', RC: 'FALSE', RU: 'FALSE', RD: 'FALSE'}
      ]);
    });
};
