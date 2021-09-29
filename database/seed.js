const { ROOT_USER_PASSWORD } = process.env;

import models from '../models';

const execute = async () => {
  const [rootUser, created] = await models.User.findOrCreate({
    where: { email: 'root@myproject.com' },
    defaults: {
      firstName: 'root',
      lastName: 'root',
      password: ROOT_USER_PASSWORD,
      root: true,
      admin: true,
      active: true,
    },
  });

  if (created) {
    await models.Post.create({
      userId: rootUser.id,
      title: 'Lorem ipsum dolor sit amet.',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et nisi facere earum quod eos atque illum odit perferendis ipsa rerum!',
    });
  }
};

export default {
  execute,
};
