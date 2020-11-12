
exports.up = function(knex) {
    return knex.schema
    .createTable('users', tbl=>{
        tbl.increments()
        tbl.string('username', 20).notNullable()
        tbl.string('password', 20).notNullable()
        tbl.string('nickname', 128)
  
    })
  };
  
  exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('users')
  };
  