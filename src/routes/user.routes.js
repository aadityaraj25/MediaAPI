import { Router } from "express"
import { registerUser } from "../controllers/user.controllers.js"
import { upload } from '../middlewares/multer.middleware.js'

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

export default router