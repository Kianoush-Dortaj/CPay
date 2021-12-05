import mongoose from 'mongoose';

export default interface ISettingAttr extends mongoose.Document {
    field: string;
    value: string;
}
