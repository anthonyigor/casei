"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_source_1 = require("./db/data-source");
data_source_1.AppDataSource.initialize()
    .then(() => {
    const app = (0, express_1.default)();
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.json());
    app.get('/', (req, res) => res.send("Hello World"));
    app.listen(5000, () => console.log("Server rodando"));
})
    .catch((err) => console.log(err));
