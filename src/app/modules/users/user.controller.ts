import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from './user.interface';
import { UserService } from './user.service';

const sendUserResponse = async (res: Response, message: string, data: any) => {
  sendResponse<IUser>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message,
    data,
  });
};

const createSeller: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { seller, ...userData } = req.body;
    const result = await UserService.createSeller(seller, userData);
    sendUserResponse(res, 'Seller created successfully!', result);
  }
);

const createbuyer: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { buyer, ...userData } = req.body;
    const result = await UserService.createbuyer(buyer, userData);
    sendUserResponse(res, 'Buyer created successfully!', result);
  }
);
//get all users
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllUsers();
  sendUserResponse(res, ' All  Users are fetched successfully', result);
});

//Get a Single User
const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.getSingleUser(id);
  sendUserResponse(res, 'Single User is found', result);
});

//Update User
const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.updateUser(id, req.body);
  await sendUserResponse(res, `User is Updated successfully`, result);
});
//Delete a Single User
const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.deleteUser(id);
  await sendUserResponse(res, `User is Deleted successfully`, result);
});

// Controller: cowController.js
const orderCow = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.orderCow(req.body);
  sendUserResponse(res, ' Order is crerated  successfully', result);
});

//get all orders
const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllOrders();
  sendUserResponse(res, ' All Order are fetched successfully', result);
});

export const UserController = {
  createSeller,
  orderCow,
  createbuyer,
  deleteUser,
  getAllOrders,
  updateUser,
  getSingleUser,
  getAllUsers,
};
