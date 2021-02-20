updatedBy = async (parent, args, context) => {
  return await context.prisma.language.findUnique({ where: { id: parent.id } }).updatedBy()
}

module.exports = {
  updatedBy,
}