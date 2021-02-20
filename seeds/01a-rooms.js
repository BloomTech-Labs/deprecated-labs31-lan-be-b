exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('rooms').del()
    .then(function () {
      // Inserts seed entries
      return knex('rooms').insert([
        {name: "Career Help", description: "The chennel to get all your questions regarding career advancement answered."},
      ]);
    });
};
