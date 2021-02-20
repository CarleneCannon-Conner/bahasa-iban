updatedBy = async (parent, args, context) => {
  return await context.prisma.origin.findUnique({ where: { id: parent.id } }).updatedBy()
}

module.exports = {
  updatedBy,
}