const db = require('../data/config');
const User = require('./usersModel');

beforeEach(async () => {
    await db('users').truncate()
})

describe('users model', () => {
    describe('getAll()', () => {
        it('gets an array of 0 users initially', () => {
            User.getAll()
            .then(data=>{
                expect(data).toHaveLength(0)
            })
        })
        it('gets users after we insert them', async () => {
           let newUser = await db('users').insert({username: 'wow', password: 'wow'});
           let users = await User.getAll();
           expect(users).toHaveLength(1);

           //adding another user! (to check!!)

            newUser = await db('users').insert({username: 'hey', password: 'hey'});
            users = await User.getAll();
            expect(users).toHaveLength(2)
        })
    })
    describe('getById()', ()=>{
        it('gets an array of 0 initially', ()=>{
            db('users')
            .then(data=>{
                expect(data).toHaveLength(0)
            })
        })
        it('gets the user with the correct id',async () =>{
            let [userID] = await db('users').insert({username: 'wow', password: 'wow'});
            await db('users').insert({username: 'hey', password: 'hey'});
            let foundUser = await User.getById(userID);
            expect(userID).toEqual(foundUser.id)
        })
    })
    describe('addUser()', () => {
        it('correctly inserts users', async () => {
            let addedUser = await User.addUser({username: 'wow', password: 'wow'});
            let users = await db('users');
            expect(users).toHaveLength(1);
        })
        it('returns the recently added user', async () => {
            let wow = await User.addUser({username: 'wow', password: 'wow'});
            expect(wow).toMatchObject({username: 'wow', password: 'wow', id: 1});

            let hey = await User.addUser({
                username: 'hey', password: 'hey'
            })
            expect(hey).toMatchObject({username: 'hey', password: 'hey', id: 2})
        })
    })
    describe('updateUser()', () => {
        it('correctly updates users', async () => {
            let [id] = await db('users').insert({username: 'wow', password: 'wow'});
            let updated = await User.updateUser(id, {username: 'omgwow', password: 'omgwow'});
            expect(updated).toMatchObject({username: 'omgwow', password: 'omgwow', id: 1});

            [id] = await db('users').insert({username: 'hey', password: 'hey'});
            let user = await db('users').where({id}).first();
            let updatedUser = await User.updateUser(id, {username: 'woeifj', password: 'sjdlgkjs'});
            expect(user).not.toMatchObject(updatedUser);


        })
    })
    describe('deleteUser()', () => {
        it('successfully deltes a user', async () => {
            let [id] = await db('users').insert({username: 'wow', password: 'wow'});
            [id] = await db('users').insert({username: 'hey', password: 'hey'});

            let users = await db('users');
            expect(users.length).toEqual(2);

            await User.deleteUser(id);

            users = await db('users');
            expect(users).toHaveLength(1);
            expect(users[0]).toMatchObject({username: 'wow', password: 'wow', id: 1})
        })
    })
})