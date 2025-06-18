import express from 'express';
import {
  createUser,
  loginUser,
  getUsers,
  updateUser,
  deleteUser,
} from '../controllers/usersController.js';

const router = express.Router();

router.post('/', createUser);
router.post('/login', loginUser);
router.get('/', getUsers);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
