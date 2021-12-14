
import mongoose from 'mongoose';

export default interface IUserSettingDoc extends mongoose.Document {
    field: string;
    value: string;
}
