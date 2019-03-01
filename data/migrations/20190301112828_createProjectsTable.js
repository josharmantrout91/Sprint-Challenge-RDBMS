exports.up = function(knex, Promise) {
  return knex.schema.createTable("projects", function(tbl) {
    // id as primary key that will auto-increment and is unique
    tbl.increments();

    tbl
      .string("name", 128)
      .unique()
      .notNullable();

    tbl.text("description").notNullable();

    tbl.boolean("completed").defaultTo("false");

    tbl.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("projects");
};
