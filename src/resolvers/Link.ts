function postedBy(parent: any, args: any, context: any) {
  return context.prisma.link.findOne({ where: { id: parent.id } }).postedBy();
}

export default { postedBy };
