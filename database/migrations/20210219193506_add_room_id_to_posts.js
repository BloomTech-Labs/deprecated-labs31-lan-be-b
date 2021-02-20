exports.up = function(knex) {
    return knex.schema.alterTable("posts", table=>{
        table.integer("room_id")
            .notNullable()
            .unsigned()
            .references("id"
            ).inTable("rooms")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
    });
};

exports.down = function(knex) {
  return knex.schema.alterTable("posts", table=>{
      table.dropForeign("room_id");
      table.dropColumn("room_id");
  })
};
