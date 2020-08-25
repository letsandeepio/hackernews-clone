"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function link(parent, args, context) {
    return context.prisma.vote.findOne({ where: { id: parent.id } }).link();
}
function user(parent, args, context) {
    return context.prisma.vote.findOne({ where: { id: parent.id } }).user();
}
exports.default = {
    link,
    user
};
//# sourceMappingURL=Vote.js.map