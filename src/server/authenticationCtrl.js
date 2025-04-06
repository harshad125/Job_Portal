import _ from "lodash";
import constants from "../helper/constants.js"
import { UnauthorizedError } from "../helper/userError.js";
import utlis from "../helper/utlis.js";

const authenticationCtrl = async(req,res,next) => {
    try {
        const authHeader = req.headers[constants.auth.authorization];
        if(authHeader) {
            const authToken = authHeader.split(' ')[1];
            if (!authToken) {
                return next(new UnauthorizedError(null, "authentication token is invalid"));
            }
            const isLogoutUrl = _.includes(req.url, 'auth/logout');
            const isRenewUrl = _.includes(req.url, 'auth/token/renew');
            const ignoreExpiration = isLogoutUrl || isRenewUrl;
            const decodeToken = utlis.verifyJwt(authToken,constants.jwt.audience.session,ignoreExpiration)

            if (decodeToken) {
                req.user = {
                    id:decodeToken.id,
                    name:decodeToken.name,
                    email:decodeToken.email
                }
            }
           return next();
        }else {
            return next(new UnauthorizedError('null','you are not authorize'))
        }  
    } catch (error) {
        next(error);
    }
}

export default authenticationCtrl;