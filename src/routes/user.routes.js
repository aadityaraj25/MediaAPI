import { Router } from "express"
import { changeUserPassword, getCurrentUser, getUserChannelProfile, getWatchHistory, loginUser, logoutUser, refreshAccessToken, registerUser, updateAccountDetails, updateAvatar, updateCoverImage } from "../controllers/user.controllers.js"
import { upload } from '../middlewares/multer.middleware.js'
import { VerifyJWT } from '../middlewares/auth.middleware.js'

const router = Router()


// const route = Router()
// route.post("/add",createTodo)
// route.get("/",getTodo)
// route.get("/:id",getTodobyID)
// route.put("/:id",updateTodo)
// route.patch("/:id/toggle",toggleTodobyId)
// route.delete("/:id",deleteTodo) 

router.route("/register").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1,
        },
        {
            name:"coverImage",
            maxCount:1,
        } 
    ]),
registerUser) 

router.route("/login").post(loginUser)

// secured routes
// router.route("/logout").post(VerifyJWT,logoutUser)
router.post("/logout",VerifyJWT,logoutUser)
router.post("/refreshToken",refreshAccessToken)
router.patch("update-password",VerifyJWT,changeUserPassword)
router.get("/current-user",VerifyJWT,getCurrentUser)
router.patch("/update-account",VerifyJWT,updateAccountDetails)
router.patch("/update-avatar",VerifyJWT,upload.single("avatar"),updateAvatar)
router.patch("/update-coverimage",VerifyJWT,upload.single("coverImage"),updateCoverImage)
router.get("/c/:username",VerifyJWT,getUserChannelProfile)
router.get("/history",VerifyJWT,getWatchHistory)


export default router