const User = require('./User');
const Note = require('./Note');
const Comment = require('./Comment');
const Language = require('./Language');

User.hasMany(Note, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Note.belongsTo(User, {
  foreignKey: 'user_id'
});

Note.hasMany(Comment, {
  foreignKey: 'note_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(Note, {
  foreignKey: 'note_id'
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})

Comment.belongsTo(User, {
  foreignKey: 'user_id'
})

Language.hasMany(Note, {
  foreignKey: 'language_id',
  onDelete: 'CASCADE'
});

Note.belongsTo(Language, {
  foreignKey: 'language_id'
});

module.exports = { User, Note, Comment, Language };
