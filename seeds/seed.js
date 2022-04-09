const sequelize = require('../config/connection');
const { User, Note, Comment, Language } = require('../models');

const userData = require('./userData.json');
const note = require('./note.json');
const commentData = require('./comments.json');
const languageCards = require('./languageCards.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const entry of languageCards) {
    await Language.create({
      ...entry,
    });
  };
  
  for (const entry of note) {
    await Note.create({
      ...entry,
    });
  }
  
  for (const entry of commentData) {
    await Comment.create({
      ...entry,
    });
  }

  process.exit(0);
};

seedDatabase();
