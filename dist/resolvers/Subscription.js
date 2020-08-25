"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function newLinkSubscribe(parent, args, context, info) {
    return context.pubsub.asyncIterator('NEW_LINK');
}
const newLink = {
    subscribe: newLinkSubscribe,
    resolve: (payload) => {
        return payload;
    }
};
function newVoteSubscribe(parent, args, context, info) {
    return context.pubsub.asyncIterator('NEW_VOTE');
}
const newVote = {
    subscribe: newVoteSubscribe,
    resolve: (payload) => {
        return payload;
    }
};
exports.default = {
    newLink,
    newVote
};
//# sourceMappingURL=Subscription.js.map