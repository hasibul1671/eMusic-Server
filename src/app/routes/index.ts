import express from 'express';
import { BuyerRoutes } from '../modules/buyer/buyer.route';
import { CowRoutes } from '../modules/cow/cow.route';
import { SellerRoutes } from '../modules/seller/seller.route';
import {
  OrderGetRoutes,
  OrderPostRoutes,
  SignUpBuyerRoutes,
  SignUpSellerRoutes,
  UserRoutes,
} from '../modules/users/user.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth/signup',
    route: SignUpSellerRoutes,
  },

  {
    path: '/auth/signup',
    route: SignUpBuyerRoutes,
  },

  {
    path: '/cows',
    route: CowRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/buyers',
    route: BuyerRoutes,
  },
  {
    path: '/sellers',
    route: SellerRoutes,
  },
  {
    path: '/',
    route: OrderPostRoutes,
  },
  {
    path: '/',
    route: OrderGetRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
