
import mongoose from 'mongoose';

export default interface ISettingDoc extends mongoose.Document {
    field: string;
    value: string;
}
