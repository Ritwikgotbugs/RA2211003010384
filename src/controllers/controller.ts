import { Request, Response, NextFunction } from "express";
import { getNumbers } from "../services/service";

export const fetchNumbers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const response = await getNumbers(id);
    res.json(response);
  } catch (error) {
    next(error);
  }
};
