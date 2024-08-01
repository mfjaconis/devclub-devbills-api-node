"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupMongo = setupMongo;
const mongoose_1 = __importDefault(require("mongoose"));
async function setupMongo() {
    try {
        if (mongoose_1.default.connection.readyState === 1) {
            return;
        }
        console.log("🎲 Connecting to DB...");
        await mongoose_1.default.connect(process.env.MONGO_URL);
        console.log("ℹ️ DB Connected!");
    }
    catch {
        throw new Error("❌ DB not connected");
    }
}
