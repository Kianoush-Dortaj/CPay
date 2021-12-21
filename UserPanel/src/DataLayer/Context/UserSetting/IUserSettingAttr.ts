import mongoose from 'mongoose';

export default interface IUserSettingAttr extends mongoose.Document {
    field: string;
    userId:any;
    value: string;
}
