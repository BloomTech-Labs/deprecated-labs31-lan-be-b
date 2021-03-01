exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex.schema.raw('TRUNCATE TABLE rooms CASCADE')
    .then(function () {
      // Inserts seed entries
      return knex('rooms').insert([
        {name: "Career Help", description: "The chennel to get all your questions regarding career advancement answered."},
      ]);
    });
};
