import bcrypt from 'bcrypt';

bcrypt.compareAsync = (data, encrypted) => {
  return new Promise(resolve => {
    try {
      const match = bcrypt.compareSync(data, encrypted);
      resolve(match);
    } catch (err) {
      resolve(null);
    }
  });
};
bcrypt.compare;
