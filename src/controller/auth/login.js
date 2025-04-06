// import _ from "lodash";

import enums from "../../helper/enums.js";
import utlis from "../../helper/utlis.js";
import { User } from "../../model/user.model.js";
import * as userError from '../../helper/userError.js';

export default async function login(req, res, next) {
    try {
        const {email,password } = req.body;

        const user = await User.findOne({
            email: { $regex: `^${email}\\b`, $options: 'i' },
        }).exec();

        if(!user) {
            return next(new userError.NotFoundError("email","user not found based on this email."))
        }

        const isValidPassword =await  user.isPasswordCorrect(password);
        if(!isValidPassword) {
            return next(new userError.BadRequestError("password","password is incorrect."))
        }
        
        const token = {
            sessionToken: await utlis.generateJwtToken(enums.jwtTokenType.session, user),
            refreshToken: await utlis.generateJwtToken(enums.jwtTokenType.refresh,user)
        }
        return utlis.returnHttpSuccessResponse(res, token);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

