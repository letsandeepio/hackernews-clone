function feed(parent: any, args: any, context: any, info: any) {
  console.log('I am invoked');
  return context.prisma.link.findMany();
}

export default {
  feed
};
