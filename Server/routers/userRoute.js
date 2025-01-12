import express from 'express';
import { loginUser , getUserData, logoutUser} from '../controllers/userController.js';
import { authenticateUser } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/login',loginUser)
router.get('/user-data',authenticateUser,getUserData)
router.post("/logout", logoutUser); //  logout route



export default router;
