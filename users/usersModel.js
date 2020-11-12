const db = require('../data/config');

module.exports = {
    getAll() {
        return db('users')
    },
    getById(id) {
        return db('users').where({id}).first();
    },
    async addUser(user) {
        const [id] = await db('users').insert(user);
        return db('users').where({id}).first();
    },
    async updateUser(id, object) {
      await db('users').update(object).where({id});
      return db('users').where({id}).first();
    },
    async deleteUser(id) {
        await db('users').where({id}).delete();
    }
}