function link(parent: any, args: any, context: any) {
  return context.prisma.vote.findOne({ where: { id: parent.id } }).link();
}

function user(parent: any, args: any, context: any) {
  return context.prisma.vote.findOne({ where: { id: parent.id } }).user();
}

export default {
  link,
  user
};
