"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingEntitie = void 0;
const mongoose_1 = require("mongoose");
const setting_enum_1 = require("../../../DTO/Sertting/setting-enum");
const SettingSchema = new mongoose_1.Schema({
    field: { type: String, enums: [setting_enum_1.SETTING_ENUM], require: true },
    value: { type: String, require: true },
});
exports.SettingEntitie = (0, mongoose_1.model)("Setting", SettingSchema);
