/**
 * @author Oyetunji Atilade <atiladeoyetunji@gmail.com>
 * @desc User login
   @access Public
 */

import validator from "validator";
import { NextFunction, Request, Response } from "express";

import User from "../../../models/User";
import Log from "../../../middlewares/Log";
import Token from "../../../models/Token";
import Customer from "../../../models/Customer";
import Role from "../../../models/Role";
import passport from "passport";

class Login {
  // public
  // private static redisClient = RedisService.getInstance()
  // .getBullOptions()
  // .createClient();

  /**
   * Signin a Customer
   * @route POST /api/auth/signin-customer
   * customer
   */
  public static async customer(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    passport.authenticate("local", (err: any, user: any, info: any) => {
      if (err) {
        Log.error(err.message);
        return next(err);
      }
      if (!user) {
        return res.status(400).json({
          status: "Unauthorized",
          message: "Email or Password incorrect",
        });
      }

      req.login(user, async (err: any) => {
        let accessToken;
        let refreshToken;
        let customDoc;
        let jwtPayload;
        let ipAddress;
        let device;
        let redisUser;
        let tokenDoc;
        let otpCode;

        if (err) {
          return res.status(400).json({
            message: err.message,
          });
        }

        try {
        } catch (error: any) {
          return res.status(500).json({
            message: error.message,
          });
        }
      });
    });
  }
}
