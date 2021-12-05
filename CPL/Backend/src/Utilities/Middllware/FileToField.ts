import { NextFunction, Request, Response } from "express";
import Middllware from "./Middllware";


export default new class FileToField extends Middllware {


    FileToAvatar(req:Request, res:Response, next:NextFunction) {
        if (!req.file) {
          req.body.avatar = undefined;
        } else {
          req.body.avatar = req.file.originalname;
        }
        next();
      }
    

}