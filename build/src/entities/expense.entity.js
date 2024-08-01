"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expense = void 0;
class Expense {
    constructor({ _id, title, color, amount }) {
        this._id = _id;
        this.title = title;
        this.color = color;
        this.amount = amount;
    }
}
exports.Expense = Expense;
