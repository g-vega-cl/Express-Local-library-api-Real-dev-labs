/**
 *
 * !!!!!!!!!!!!!  IMPORTANT  !!!!!!!!!!!!!!!!!
 *
 * Please do not modify this file
 *
 */

import { NextFunction, Request, Response } from "express";
import computeFormula from "./main";

const express = require("express");
const router = express.Router();

/**
 * Call interpreter
 */
router.post(
  "/compute",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { formula, inputVariables } = req.body;
      res.json(computeFormula(formula, inputVariables));
    } catch (error) {
      next(error);
    }
  },
);

export default router;
