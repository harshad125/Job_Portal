

import authRoute from '../routes/authRoute.js'


const  setRoutes = (app) => {
    app.all('/auth*',authRoute);
}

export default setRoutes;