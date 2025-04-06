import authRoute from '../routes/authRoute.js'
import userRoute from '../routes/userRoute.js'

const  setRoutes = (app) => {
    app.all('/auth*',authRoute);
    app.all('/user*',userRoute)
}

export default setRoutes;