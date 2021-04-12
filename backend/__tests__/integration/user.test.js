const UserModel = require('../../src/models/user');
const TicketModel = require('../../src/models/ticket');
const EventModel = require('../../src/models/event');

const server = require('../../src/index');
const request = require('supertest');
const jwt = require('../../src/utils/generateToken');

describe('Create user', () => {
    beforeAll(async () => {
        await UserModel.deleteMany({});
        await TicketModel.deleteMany({});
        await EventModel.deleteMany({});
    });
    beforeEach(async () => {
        await UserModel.deleteMany({});
        await TicketModel.deleteMany({});
        await EventModel.deleteMany({});
    });
    afterAll(async () => {
        await UserModel.deleteMany({});
        await TicketModel.deleteMany({});
        await EventModel.deleteMany({});
    });
    afterEach(async () => {
        await UserModel.deleteMany({});
        await TicketModel.deleteMany({});
        await EventModel.deleteMany({});
    });

    it('should create a user', async () => {
        const response = await request(server)
        .post('/user/create')
        .send({
            name: 'name test',
            email: 'email@test.com',
            password: '123456'
        });
        
        expect(response.status).toBe(200);
        expect(response.body.user.name).toBe('name test');
        expect(response.body.user.email).toBe('email@test.com');
        
    });

    it('should try to create a user that was created before', async () => {
        await UserModel.create({
            name: 'name test',
            email: 'email@test.com',
            password: '123456'
        });

        const response = await request(server)
        .post('/user/create')
        .send({
            name: 'name test',
            email: 'email@test.com',
            password: '123456'
        });
        
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('User already eists');
        
    });

    it('should try to create a user without send all arguments', async () => {

        const response = await request(server)
        .post('/user/create')
        .send({
            email: 'email@test.com',
            password: '123456'
        });
        
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Missing arguments');
        
    });

});

describe('Delete a user', () => {
    beforeAll(async () => {
        await UserModel.deleteMany({});
        await TicketModel.deleteMany({});
        await EventModel.deleteMany({});
    });
    beforeEach(async () => {
        await UserModel.deleteMany({});
        await TicketModel.deleteMany({});
        await EventModel.deleteMany({});
    });
    afterAll(async () => {
        await UserModel.deleteMany({});
        await TicketModel.deleteMany({});
        await EventModel.deleteMany({});
    });
    afterEach(async () => {
        await UserModel.deleteMany({});
        await TicketModel.deleteMany({});
        await EventModel.deleteMany({});
    });

    it('should delete a user', async () => {
        const user = await UserModel.create({
            name: 'name test',
            email: 'email@test.com',
            password: '123456'
        });

        const token = await jwt({ id: user._id });

        const response = await request(server)
        .delete('/user/delete')
        .send({
            name: 'name test',
            email: 'email@test.com',
            password: '123456'
        })
        .set('authorization', `Bearer ${token}`);
        
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('User deleted');
        
    });

    it('should try to delete a user that does not exist', async () => {
        const user = await UserModel.create({
            name: 'name test',
            email: 'email@test.com',
            password: '123456'
        });

        const token = await jwt({ id: user._id });

        await UserModel.deleteOne({ _id: user._id });

        const response = await request(server)
        .delete('/user/delete')
        .send({
            name: 'name test',
            email: 'email@test.com',
            password: '123456'
        })
        .set('authorization', `Bearer ${token}`);
        
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Failed to delete user');
        
    });

});

describe('Update user', () => {
    beforeAll(async () => {
        await UserModel.deleteMany({});
        await TicketModel.deleteMany({});
        await EventModel.deleteMany({});
    });
    beforeEach(async () => {
        await UserModel.deleteMany({});
        await TicketModel.deleteMany({});
        await EventModel.deleteMany({});
    });
    afterAll(async () => {
        await UserModel.deleteMany({});
        await TicketModel.deleteMany({});
        await EventModel.deleteMany({});
    });
    afterEach(async () => {
        await UserModel.deleteMany({});
        await TicketModel.deleteMany({});
        await EventModel.deleteMany({});
    });


    it('should update a user', async () => {
        const user = await UserModel.create({
            name: 'name test',
            email: 'email@test.com',
            password: '123456'
        });

        const token = await jwt({ id: user._id });

        const response = await request(server)
        .put('/user/update')
        .send({
            name: 'name test 2',
            email: 'email2@test.com'
        })
        .set('authorization', `Bearer ${token}`);
        
        expect(response.status).toBe(200);
        expect(response.body.user.name).toBe('name test 2');
        expect(response.body.user.email).toBe('email2@test.com');
    });

});

describe('Athentication', () => {
    beforeAll(async () => {
        await UserModel.deleteMany({});
        await TicketModel.deleteMany({});
        await EventModel.deleteMany({});
    });
    beforeEach(async () => {
        await UserModel.deleteMany({});
        await TicketModel.deleteMany({});
        await EventModel.deleteMany({});
    });
    afterAll(async () => {
        await UserModel.deleteMany({});
        await TicketModel.deleteMany({});
        await EventModel.deleteMany({});
    });
    afterEach(async () => {
        await UserModel.deleteMany({});
        await TicketModel.deleteMany({});
        await EventModel.deleteMany({});
    });


    it('Shoud make a login', async () => {
        await UserModel.create({
            name: 'name test',
            email: 'email@test.com',
            password: '123456'
        });

        const response = await request(server)
        .get('/user/auth')
        .send({
            password: '123456',
            email: 'email@test.com'
        });
        
        expect(response.status).toBe(200);
        expect(response.body.user.name).toBe('name test');
        expect(response.body.user.email).toBe('email@test.com');
    });

    it('Shoud make try to make a login with wrong email or password', async () => {
        await UserModel.create({
            name: 'name test',
            email: 'email@test.com',
            password: '123456'
        });

        const response = await request(server)
        .get('/user/auth')
        .send({
            password: 'wrong password',
            email: 'email2@test.com'
        });
        
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Invalid email or password');
    });

    it('Shoud make try to make a login with wrong email or password', async () => {
        await UserModel.create({
            name: 'name test',
            email: 'email@test.com',
            password: '123456'
        });

        const response = await request(server)
        .get('/user/auth')
        .send({
            password: '123456',
            email: 'emailasd@test.com'
        });
        
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Invalid email or password');
    });

    it('Shoud make try to make a login without send all arguments', async () => {
        await UserModel.create({
            name: 'name test',
            email: 'email@test.com',
            password: '123456'
        });

        const response = await request(server)
        .get('/user/auth')
        .send({
            password: 'wrong password',
        });
        
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Missing arguments');
    });

});

describe('Get user', () => {
    beforeAll(async () => {
        await UserModel.deleteMany({});
        await TicketModel.deleteMany({});
        await EventModel.deleteMany({});
    });
    beforeEach(async () => {
        await UserModel.deleteMany({});
        await TicketModel.deleteMany({});
        await EventModel.deleteMany({});
    });
    afterAll(async () => {
        await UserModel.deleteMany({});
        await TicketModel.deleteMany({});
        await EventModel.deleteMany({});
    });
    afterEach(async () => {
        await UserModel.deleteMany({});
        await TicketModel.deleteMany({});
        await EventModel.deleteMany({});
    });


    it('should return a user', async () => {
        const user = await UserModel.create({
            name: 'name test',
            email: 'email@test.com',
            password: '123456'
        });

        const token = await jwt({ id: user._id });

        const response = await request(server)
        .get('/user/getUser')
        .set('authorization', `Bearer ${token}`);
        
        expect(response.status).toBe(200);
        expect(response.body.user.name).toBe('name test');
        expect(response.body.user.email).toBe('email@test.com');
    });

    it('should get a user without a token', async () => {

        const response = await request(server)
        .get('/user/getUser');
        
        expect(response.status).toBe(401);
    });

});

describe('Get users', () => {
    beforeAll(async () => {
        await UserModel.deleteMany({});
        await TicketModel.deleteMany({});
        await EventModel.deleteMany({});
    });
    beforeEach(async () => {
        await UserModel.deleteMany({});
        await TicketModel.deleteMany({});
        await EventModel.deleteMany({});
    });
    afterAll(async () => {
        await UserModel.deleteMany({});
        await TicketModel.deleteMany({});
        await EventModel.deleteMany({});
    });
    afterEach(async () => {
        await UserModel.deleteMany({});
        await TicketModel.deleteMany({});
        await EventModel.deleteMany({});
    });

    it('should try to get users', async () => {
        await UserModel.create({
            name: 'name test1',
            email: 'email1@test.com',
            password: '123456'
        });

        await UserModel.create({
            name: 'name test2',
            email: 'email2@test.com',
            password: '123456'
        });

        await UserModel.create({
            name: 'name test3',
            email: 'email3@test.com',
            password: '123456'
        });

        const response = await request(server)
        .get('/user/getUsers')
        .send({
            pageLimit: 3,
            pageNumber: 0
        });
        
        expect(response.status).toBe(200);

        expect(response.body.users.length).toBe(3);

        expect(response.body.users[0].name).toBe('name test1');
        expect(response.body.users[0].email).toBe('email1@test.com');

        expect(response.body.users[1].name).toBe('name test2');
        expect(response.body.users[1].email).toBe('email2@test.com');

        expect(response.body.users[2].name).toBe('name test3');
        expect(response.body.users[2].email).toBe('email3@test.com');
    });

    it('should try to get users', async () => {
        const response = await request(server)
        .get('/user/getUsers')
        .send({
            pageLimit: 3,
            pageNumber: 0
        });
        
        expect(response.status).toBe(200);

        expect(response.body.users.length).toBe(0);
    });

});

// buy ticket