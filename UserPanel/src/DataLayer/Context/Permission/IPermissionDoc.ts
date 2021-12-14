import mongoose from 'mongoose';

export default interface IPermissionDoc extends mongoose.Document {
    name: string;
    parentId: string;
    permissionId: string;
    isDelete: boolean;
}