updatedBy = async (parent, args, context) => {
  return await context.prisma.pronunciation.findUnique({ where: { id: parent.id } }).updatedBy()
}

words = async (parent, args, context) => {
  return await context.prisma.pronunciation.findUnique({ where: { id: parent.id } }).words()
}

module.exports = {
  updatedBy,
  words,
}
