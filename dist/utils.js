"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserId = exports.APP_SECRET = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const APP_SECRET = 'GraphQL-is-aw3some';
exports.APP_SECRET = APP_SECRET;
function getUserId(context) {
    const Authorization = context.request.get('Authorization');
    if (Authorization) {
        const token = Authorization.replace('Bearer ', '');
        const { userId } = jsonwebtoken_1.default.verify(token, APP_SECRET);
        return userId;
    }
    throw new Error('Not authenticated');
}
exports.getUserId = getUserId;
//# sourceMappingURL=utils.js.map