import express from 'express'
import cors from 'cors'
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true,
}))

app.use(express.json({ limit:"16kb" }))
app.use(express.urlencoded({extended: true, limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())




//there are four fields
// (err, req, res, next) ------ all the error requests are handeled here ---- global error handeler
app.use((err,req,res,next)=>{
    res.status(err.statusCode||500).json({
        success: false,
        message: err.message||"Internal Server Error",
    })
})

// routes import 
import userRouter from "./routes/user.routes.js"

// routes declaration
app.get("/api/v1",(req,res)=>{
    res.status(200).json({
        success: true,
        message: "repoB is a Node.js backend application providing user registration, authentication (JWT-based), profile management (including avatar/cover image uploads via Cloudinary), and data storage using MongoDB/Mongoose. It features secure authentication with access/refresh tokens, protected routes, and a global error handler. To get started, install Node.js and MongoDB, set up Cloudinary, install dependencies via `npm install`, configure environment variables in a `.env` file, and run the server using `npm run dev`.",
        routes: {
            public: [
                { path: "/api/v1/users/register", method: "POST", description: "Registers a new user. Requires fullName, email, username, password, avatar (file), and optional coverImage (file)." },
                { path: "/api/v1/users/login", method: "POST", description: "Logs in a user." }
            ],
            secured: [
                { path: "/api/v1/users/logout", method: "POST", description: "Logs out the current user. Requires authentication." },
                { path: "/api/v1/users/refreshToken", method: "POST", description: "Refreshes the access token. Requires authentication." },
                { path: "/api/v1/users/update-password", method: "PATCH", description: "Changes the user's password. Requires authentication." },
                { path: "/api/v1/users/current-user", method: "GET", description: "Gets the details of the currently logged-in user. Requires authentication." },
                { path: "/api/v1/users/update-account", method: "PATCH", description: "Updates user account details. Requires authentication." },
                { path: "/api/v1/users/update-avatar", method: "PATCH", description: "Updates the user's avatar. Requires avatar (file) and authentication." },
                { path: "/api/v1/users/update-coverimage", method: "PATCH", description: "Updates the user's cover image. Requires coverImage (file) and authentication." },
                { path: "/api/v1/users/c/:username", method: "GET", description: "Gets the channel profile of a specified user. Requires authentication." },
                { path: "/api/v1/users/history", method: "GET", description: "Gets the watch history of the current user. Requires authentication." }
            ]
        }
    })
})
app.use("/api/v1/users",userRouter)

export {app}   