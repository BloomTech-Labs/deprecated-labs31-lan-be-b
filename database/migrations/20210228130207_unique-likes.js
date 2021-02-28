exports.up = function(knex) {
    return knex.schema.alterTable("liked_posts", table=>{
        table.unique(["post_id", "user_id"]);
    })
    .alterTable("liked_comments", table=>{
        table.unique(["comment_id", "user_id"]);
    });
};

exports.down = function(knex) {
  return knex.schema.alterTable("liked_posts", table=>{
      table.dropUnique(["post_id", "user_id"]);
  })
  .alterTable("liked_comments", table=>{
      table.dropUnique(["comment_id", "user_id"]);
  });
};