"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
function feed(parent, args, context, info) {
    return __awaiter(this, void 0, void 0, function* () {
        const where = args.filter
            ? {
                OR: [
                    { description: { contains: args.filter } },
                    { url: { contains: args.filter } }
                ]
            }
            : {};
        const links = yield context.prisma.link.findMany({
            where,
            skip: args.skip,
            take: args.take,
            orderBy: args.orderBy
        });
        const count = yield context.prisma.link.count({ where });
        return {
            links,
            count
        };
    });
}
exports.default = {
    feed
};
//# sourceMappingURL=Query.js.map