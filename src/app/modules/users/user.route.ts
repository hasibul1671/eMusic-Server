import express from 'express';
import { UserController } from './user.controller';
const router = express.Router();

export const SignUpSellerRoutes = router.post(
  '/seller',
  UserController.createSeller
);

export const SignUpBuyerRoutes = router.post(
  '/buyer',
  UserController.createbuyer
);

export const OrderPostRoutes = router.post('/orders', UserController.orderCow);
export const OrderGetRoutes = router.get(
  '/orders',
  UserController.getAllOrders
);

router.get('/:id', UserController.getSingleUser);
router.delete('/:id', UserController.deleteUser);
router.patch('/:id', UserController.updateUser);
router.get('/', UserController.getAllUsers);

export const UserRoutes = router;
