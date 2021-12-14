import { NextFunction, Request, Response } from "express";
import AuthFailurError from "../../core/Reponse/auth-failure-error";
import UnitOfWork from "../../DataLayer/Repository/UnitOfWork/UnitOfWork";

export default new class Authrization {

    constructor() { }

    async AuthToken(req: Request, res: Response, next: NextFunction) {

        let decodeToken = await UnitOfWork.jwtRepository.DecodeToken(req, res, next);

        if (decodeToken.success) {
            return next();
        }

        return new AuthFailurError("Ivalid Token").send(res);

    }

}