"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function postedBy(parent, args, context) {
    return context.prisma.link.findOne({ where: { id: parent.id } }).postedBy();
}
function votes(parent, args, context) {
    return context.prisma.link.findOne({ where: { id: parent.id } }).votes();
}
exports.default = { postedBy, votes };
//# sourceMappingURL=Link.js.map