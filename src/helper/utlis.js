import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import constants from './constants.js';
import * as userError from './userError.js';
import enums from './enums.js';
import _ from 'lodash';

const _generatePayload = (user) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};

const _generateSessionToken = async (tokenType, payload) => {
  const expireSessionJwtTime = constants.jwt.sessionTokenExpiryInSecs;
  const expireRefreshJwtTime = constants.jwt.refreshTokenExpiryInSecs;

  let expiresIn;
  let audience = constants.jwt.audience.session;
  expiresIn = parseInt(expireSessionJwtTime, 10);

  if (Number.isNaN(expiresIn)) {
    expiresIn = constants.jwt.sessionTokenExpiryInSecs;
    console.error(
      'generateSessionJwt: ERROR: NaN sessionTokenExpiry value, setting it to default: %d',
      expiresIn
    );
  }

  if (tokenType === enums.jwtTokenType.refresh) {
    audience = constants.jwt.audience.refresh;
    expiresIn = parseInt(expireRefreshJwtTime, 10);
    if (Number.isNaN(expiresIn)) {
      expiresIn = constants.jwt.refreshTokenExpiryInSecs;
      console.error(
        'generateSessionJwt: ERROR: NaN sessionTokenExpiry value, setting it to default: %d',
        expiresIn
      );
    }
  }

  const signInOptions = {
    issuer: constants.jwt.issuer,
    audience,
    expiresIn,
    algorithm: constants.jwt.algorithm,
  };
  const jwtPriveteKey = global.jwtPrivateKey;
  const authToken = jwt.sign(payload, jwtPriveteKey, signInOptions);
  return authToken;
};

const generateRenewSessionToken = async (user, refreshToken) => {
  return new Promise((resolve, reject) => {
    const decodeRefreshToken = verifyJwt(refreshToken, constants.jwt.audience.refresh);

    if (!_.isNil(decodeRefreshToken)) {
      const payload = _generatePayload(user);
      console.log(payload);
      const sessionToken = _generateSessionToken(enums.jwtTokenType.session, payload);
      resolve(sessionToken);
    }

    reject(new userError.UnauthorizedError(null, 'Authentication token is invalid'));
  });
};

const generateJwtToken = async (tokenType, user) => {
  return new Promise((resolve) => {
    const payload = _generatePayload(user);
    const authToken = _generateSessionToken(tokenType, payload);
    resolve(authToken);
  });
};

const verifyJwt = (token, audience, ignoreExpiration = false) => {
  const jwtPublicKey = global.jwtPublicKey;
  const VerifyOption = {
    issuer: constants.jwt.issuer,
    audience,
    algorithm: constants.jwt.algorithm,
    clockTolerance: 20,
    ignoreExpiration,
  };
  try {
    const decodeJwtToken = jwt.verify(token, jwtPublicKey, VerifyOption);
    return decodeJwtToken;
  } catch (err) {
    console.log(err);
    throw new userError.UnauthorizedError(err.param || err.name, `[${audience}] ${err}`);
  }
};

const returnHttpErrorResponse = (param, message) => {
  return {
    success: false,
    errors: [
      {
        param,
        message,
      },
    ],
  };
};

const returnHttpSuccessResponse = (res, data) => {
  return res.status(HttpStatus.OK).json({ success: true, data });
};

export default {
  returnHttpErrorResponse,
  returnHttpSuccessResponse,
  verifyJwt,
  generateJwtToken,
  generateRenewSessionToken,
};
