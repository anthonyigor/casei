"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Convidado = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
let Convidado = class Convidado {
    constructor() {
        this.id = 0;
        this.nome = '';
        this.quant_familia = 0;
        this.presente = false;
        this.confirmado = false;
    }
};
exports.Convidado = Convidado;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Convidado.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Convidado.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Convidado.prototype, "quant_familia", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Convidado.prototype, "confirmado", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Convidado.prototype, "presente", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, user => user.convidados),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", User_1.User)
], Convidado.prototype, "user", void 0);
exports.Convidado = Convidado = __decorate([
    (0, typeorm_1.Entity)('convidados'),
    __metadata("design:paramtypes", [])
], Convidado);
