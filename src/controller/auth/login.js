// import _ from "lodash";

import enums from "../../helper/enums.js";
import utlis from "../../helper/utlis.js";

export default async function login(req, res, next) {
    try {
        const user = req.body;
        console.log(user);
        const token = {
            sessionToken: await utlis.generateJwtToken(enums.jwtTokenType.session, user),
            refreshToken: await utlis.generateJwtToken(enums.jwtTokenType.refresh,user)
        }
        return utlis.returnHttpSuccessResponse(res, 'token');
    } catch (error) {
        console.log(error);
        next(error);
    }
}

