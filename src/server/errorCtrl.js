import { ApplicationError } from '../helper/baseError.js';
import HttpStatus from 'http-status-codes';
import utlis from '../helper/utlis.js';
import constants from '../helper/constants.js';

const loggPrefix = `${constants.logging.logPrefix} [ErrorCtrl]`;
const errorCtrl = (err, req, res, next) => {
  try {
    const param = err.param || err.name;
    if (err instanceof ApplicationError) {
      console.log(`${loggPrefix}: [ApplicationError] [${err.statusCode}] ${JSON.stringify(err)}`);
      res.status(err.statusCode).send(utlis.returnHttpErrorResponse(param, err.message));
    } else {
      console.log(`${loggPrefix}: [GeneralError] ${JSON.stringify(err)}`);
      res.status(err.statuCode).send(utlis.returnHttpErrorResponse(param, err.message));
    }
  } catch (error) {
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send(`${loggPrefix}: [InternalServerError] An unknown error occured: ${error}`);
  }
};

export default errorCtrl;
