export const createUserData = () => {
  const timeStamp = Date.now();

  return {
    name: `Test User${timeStamp}`,
    username: `user${timeStamp}`,
    email: `user${timeStamp}@test.com`,
  };
};
