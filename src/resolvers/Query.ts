async function feed(parent: any, args: any, context: any, info: any) {
  const where = args.filter
    ? {
        OR: [
          { description: { contains: args.filter } },
          { url: { contains: args.filter } }
        ]
      }
    : {};

  const links = await context.prisma.link.findMany({
    where,
    skip: args.skip,
    take: args.take
  });

  return links;
}

export default {
  feed
};
