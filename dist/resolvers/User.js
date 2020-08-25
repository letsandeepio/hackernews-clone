"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function links(parent, args, context) {
    return context.prisma.user.findOne({ where: { id: parent.id } }).links();
}
exports.default = {
    links
};
//# sourceMappingURL=User.js.map