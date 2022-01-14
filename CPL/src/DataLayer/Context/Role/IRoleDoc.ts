import mongoose from 'mongoose';

export interface IRoleDoc extends mongoose.Document {
    name: string;
    rolePermissionId?:string;
    securityStamp: string;
}