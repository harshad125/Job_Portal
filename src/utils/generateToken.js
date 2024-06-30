import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv';
dotenv.config({ path: './.env' });


const generateToken = async (userData, key) => {
    const { id, email, role } = userData
    if (key == 'AccessToken') {
        return jwt.sign({ id, email, role },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY
            })
    }
    else if (key == 'RefreshToken') {
        return jwt.sign({ id },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRY
            })
    }
    return null
}

export default generateToken