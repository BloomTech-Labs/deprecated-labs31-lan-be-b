exports.up = function(knex) {
  return knex.schema
    .createTable("permissions", table => {
        table.increments();
        table.boolean("UC").defaultTo(false).notNullable();
        table.boolean("UU").defaultTo(false).notNullable();
        table.boolean("UD").defaultTo(false).notNullable();
        table.boolean("PCU").defaultTo(false).notNullable();
        table.boolean("PCD").defaultTo(false).notNullable();
        table.boolean("RC").defaultTo(false).notNullable();
        table.boolean("RU").defaultTo(false).notNullable();
        table.boolean("RD").defaultTo(false).notNullable();
    })
    .createTable("roles", table =>{
        table.increments();
        table.string("name").notNullable().unique();
        table.integer("permission_id").references("id").inTable("permissions").onDelete("CASCADE").onUpdate("CASCADE");
    })
    .createTable("user_roles", table => {
        table.increments();
        table.string('user_id').notNullable().unsigned().references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE');
        table.integer('role_id').notNullable().unsigned().references('id').inTable('roles').onUpdate('CASCADE').onDelete('CASCADE');
        table.unique(["user_id", "role_id"]);
    });
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('user_roles')
    .dropTableIfExists('roles')
    .dropTableIfExists('permissions')
};
