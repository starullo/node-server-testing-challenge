
exports.seed = function(knex) {
  return knex('users').insert([
    {username: 'thomasaquinas', password: 'thomas'},
    {username: 'johnkimble', password: 'john'},
    {username: 'adamgibson', password: 'adam'}
  ]);
};
