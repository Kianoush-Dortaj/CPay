import mongoose from 'mongoose';

export interface IUserLevelDoc extends mongoose.Document {
    name: string;
    isDelete : boolean;
    isDefault: boolean;
    isPublish:  boolean;
}