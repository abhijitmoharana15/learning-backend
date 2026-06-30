import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"  // importing multer middleware to store file 



const router = Router()

router.route("/register").post(     // controller.txt-1
 // injecting  middleware  jo method execte ho raha ha aus sa just pahala middleware injext karna hota ha (kahe be jao mujsa mil ka jao)
  upload.fields([                    // Returns middleware that processes multiple files associated with the given form fields.
    {
      name : "avatar",
      maxCount : 1
    },
    {
      name : "coverImage",
      maxCount:1
    }
  ]), 

  registerUser
)

export default router;