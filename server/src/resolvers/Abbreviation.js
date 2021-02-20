updatedBy = async (parent, args, context) => {
  return await context.prisma.abbreviation.findUnique({ where: { id: parent.id } }).updatedBy()
}

module.exports = {
  updatedBy,
}
