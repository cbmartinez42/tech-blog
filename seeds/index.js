const seedUsers = require('./user-seeds');
const seedPosts = require('./post-seeds');
const seedComments = require('./comment-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('\n ****** DATABASE SYNCED ******\N');
    await seedUsers();
    console.log('\n ****** USERS SYNCED ******\N');
    await seedPosts();
    console.log('\n ****** POSTS SYNCED ******\N');
    await seedComments();
    console.log('\n ****** COMMENTS SYNCED ******\N');

    process.exit(0);
};

seedAll();