export const generateToken = (length: number = 24) => {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';

  for (let i = 1; i < length; i++) {
    token =
      token + characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return token;
};
