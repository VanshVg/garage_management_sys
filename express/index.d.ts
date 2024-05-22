import { paginationInterface, userInterface } from "../interfaces/interface";

declare global {
  namespace Express {
    export interface Request {
      user?: userInterface;
      pagination?: paginationInterface;
      file?: { filename: string };
      data?: any;
    }
  }
}
