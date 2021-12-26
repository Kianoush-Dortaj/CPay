import mongoose from 'mongoose';
import { Status } from '../../../DTO/Common/Status.enum';
import { UserVerificationType } from '../../../DTO/UserVerification/user-verification-enum';
import { IRoleDoc } from '../Role/IRoleDoc';
import { IUserDoc } from '../User/IUserDock';

export interface IUserVerificationDoc extends mongoose.Document {

    userId:any;
    birthDate: string;
    nationality: string;
    typeVerification: UserVerificationType;
    image: any;
    selfieImage: any;
    frontImage: any;
    backImage: any;
    createdAt: any;
    updateAt: any;
    status: Status;

}