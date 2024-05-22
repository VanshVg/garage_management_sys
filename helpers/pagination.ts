import { NextFunction, Response } from "express";
import { RequestWithPagination } from "../interfaces/interface";

export const paginationMiddleware = (pageSize: number) => {
  return (req: RequestWithPagination, res: Response, next: NextFunction) => {
    const pageNumber: number = (req.query.page || 1) as number; // Get the current page number from the query parameters
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    // Attach pagination data to the request object
    req.pagination = {
      page: pageNumber,
      limit: pageSize,
      startIndex,
      endIndex,
    };

    next(); // Call the next middleware
  };
};
