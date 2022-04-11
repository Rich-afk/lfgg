const sequelize = require('../config/connection');
const { User, BlogPost, Comment } = require('../models');

const userData = require('./userData.json');
const blogPost = require('./blogPost.json');
const commentData = require('./comments.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const entry of blogPost) {
    await BlogPost.create({
      ...entry,
    });
    
  };
  for (const entry of commentData) {
    await Comment.create({
      ...entry,
    });
    
  }

  process.exit(0);
};

seedDatabase();
