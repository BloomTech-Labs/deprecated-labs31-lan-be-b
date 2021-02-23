exports.up = function(knex) {
    return knex.schema.createTable("rooms", table=>{
        table.increments();
        table.string("name").notNullable().unique();
        table.text("description");
        table.string("icon").notNullable().defaultTo("localhost:5000/images/room-icon.png");
        table.string("banner_image").notNullable().defaultTo("localhost:5000/images/room-banner.jpg");
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("rooms");
};
