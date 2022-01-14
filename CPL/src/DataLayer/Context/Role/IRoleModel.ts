import { IRoleAttrs } from "./IRoleAttrs";
import { IRoleDoc } from "./IRoleDoc";
import mongoose from 'mongoose';

export interface IRoleModel extends mongoose.Model<IRoleDoc> {
    build(roleAttrs: IRoleAttrs): IRoleDoc;
}