"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const mkdirp_1 = __importDefault(require("mkdirp"));
const GetDirectory = () => {
    let year = new Date().getFullYear();
    let month = new Date().getMonth();
    let day = new Date().getDay();
    return `src/public/uploads/language/${year}/${month}/${day}`;
};
const langaugeStorage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        let dir = GetDirectory();
        (0, mkdirp_1.default)(dir).then((made) => {
            cb(null, dir);
        });
    },
    filename: (req, file, cb) => {
        let fileName = GetDirectory() + "/" + file.originalname;
        cb(null, file.originalname);
    },
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
const UploadCoinIcon = (0, multer_1.default)({
    storage: langaugeStorage,
    fileFilter: fileFilter
});
exports.default = UploadCoinIcon;
