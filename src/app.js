import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRouter from './routes/user.route.js'
import session from "express-session"
import projectRouter from "./routes/project.route.js"
import jobRouter from "./routes/jobApplication.route.js"
import applicationRoute from "./routes/application.route.js"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded())
app.use(express.static("public"))
app.use(cookieParser())
// app.use(cookieParser("javiyaharshad")) - it will use if you want encrypt the cookie data
// app.use(session({
//     secret:"javiyaharshad",
//     saveUninitialized:false,
//     resave:false,
//     cookie:{
//         maxAge:60000
//     }
// }))


// app.get("/",(req,res)=>{
//     res.send({msg:"hello"})
// })

//routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/projects", projectRouter)
app.use("/api/v1/job", jobRouter)
app.use("/api/v1/application", applicationRoute)


// http://localhost:8000/api/v1/users/register


export { app }