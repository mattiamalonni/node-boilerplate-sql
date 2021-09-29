import Migration from './migrations';
import Post from './post';
import User from './user';

User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });

export default {
  Migration,
  Post,
  User,
};
