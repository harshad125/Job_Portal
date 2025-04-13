import fs from 'fs';
import constants from '../constants.js';

const setTokens = async () => {
  const publicKeyFile = constants.jwt.publicKeyFile;
  const privateKeyFile = constants.jwt.privateKeyFile;

  const base = process.cwd();
  const jwtPrivateKey = fs.readFileSync(`${base}/src/helper/jwt/${privateKeyFile}`, 'utf8');
  const jwtPublicKey = fs.readFileSync(`${base}/src/helper/jwt/${publicKeyFile}`, 'utf8');

  global.jwtPrivateKey = jwtPrivateKey;
  global.jwtPublicKey = jwtPublicKey;
};

export default { setTokens };
