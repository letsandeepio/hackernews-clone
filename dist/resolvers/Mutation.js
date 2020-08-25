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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const utils_1 = require("../utils");
const post = (_, { url, description }, context) => {
    const userId = utils_1.getUserId(context);
    const newLink = context.prisma.link.create({
        data: {
            url,
            description,
            postedBy: { connect: { id: userId } }
        }
    });
    context.pubsub.publish('NEW_LINK', newLink);
    return newLink;
};
const updateLink = (_, { id, url, description }, context) => {
    const linkToUpdate = context.prisma.link.update({
        where: {
            id
        },
        data: {
            url,
            description
        }
    });
    return linkToUpdate;
};
const deleteLink = (_, { id }, context) => {
    const userId = utils_1.getUserId(context);
    id = parseInt(id, 10);
    return context.prisma.link.delete({
        where: {
            id,
            postedById: userId
        }
    });
};
function signup(parent, args, context, info) {
    return __awaiter(this, void 0, void 0, function* () {
        // 1
        const password = yield bcryptjs_1.default.hash(args.password, 10);
        // 2
        const user = yield context.prisma.user.create({
            data: Object.assign(Object.assign({}, args), { password })
        });
        // 3
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, utils_1.APP_SECRET);
        // 4
        return {
            token,
            user
        };
    });
}
function login(parent, args, context) {
    return __awaiter(this, void 0, void 0, function* () {
        // 1
        const user = yield context.prisma.user.findOne({
            where: { email: args.email }
        });
        if (!user) {
            throw new Error('No such user found');
        }
        // 2
        const valid = yield bcryptjs_1.default.compare(args.password, user.password);
        if (!valid) {
            throw new Error('Invalid password');
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, utils_1.APP_SECRET);
        console.log('user ' + JSON.stringify(user));
        // 3
        return {
            token,
            user
        };
    });
}
function vote(parent, args, context, info) {
    return __awaiter(this, void 0, void 0, function* () {
        // 1
        const userId = utils_1.getUserId(context);
        // 2
        const prevVote = yield context.prisma.vote.findOne({
            where: {
                linkId_userId: {
                    linkId: Number(args.linkId),
                    userId
                }
            }
        });
        if (Boolean(prevVote)) {
            throw new Error(`Already voted for link: ${args.linkId}`);
        }
        // 3
        const newVote = context.prisma.vote.create({
            data: {
                user: { connect: { id: userId } },
                link: { connect: { id: Number(args.linkId) } }
            }
        });
        context.pubsub.publish('NEW_VOTE', newVote);
        return newVote;
    });
}
exports.default = {
    post,
    updateLink,
    deleteLink,
    signup,
    login,
    vote
};
//# sourceMappingURL=Mutation.js.map