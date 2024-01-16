import { buildWhereConditions } from '../../../helpers/buildWhereCondition';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { cowSearchableFields } from './cow.constant';
import { ICow, ICowFilters } from './cow.interface';
import { Cow } from './cow.model';
//createCow Service Section
const createCow = async (payload: ICow) => {
  const result = (await Cow.create(payload)).populate('seller');
  return result;
};
//getAllCow Service Section
const getAllCows = async (
  filters: ICowFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ICow[]>> => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);
  const { searchTerm, ...filtersData } = filters;

  const { whereConditions, sortConditions } = buildWhereConditions(
    searchTerm,
    filtersData,
    cowSearchableFields,
    sortBy,
    sortOrder
  );

  const result = await Cow.find(whereConditions)
    .populate('seller')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Cow.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
//getSingleCow Service Section
const getSingleCow = async (id: string) => {
  const result = await Cow.findById(id).populate('seller');

  return result;
};
//updateCow Service Section
const updateCow = async (id: string, payload: Partial<ICow>) => {
  const result = await Cow.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  }).populate('seller');
  return result;
};
//deleteCow Service Code
const deleteCow = async (id: string) => {
  const result = await Cow.findByIdAndDelete(id).populate('seller');
  return result;
};
export const CowService = {
  createCow,
  getAllCows,
  getSingleCow,
  deleteCow,
  updateCow,
};
