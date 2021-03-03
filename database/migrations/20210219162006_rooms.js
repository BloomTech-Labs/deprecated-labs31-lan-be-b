exports.up = function(knex) {
    const DOMAIN = process.env.NODE_ENV === "production"? "https://lan-team-b-be.herokuapp.com" : 'http://localhost:3000';
    return knex.schema.createTable("rooms", table=>{
        table.increments();
        table.string("name").notNullable().unique();
        table.text("description");
        table.string("icon").notNullable().defaultTo(`${DOMAIN}/images/room-icon.png`);
        table.string("banner_image").notNullable().defaultTo(`${DOMAIN}/images/room-banner.jpg`);
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("rooms");
};
