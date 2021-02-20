word = async (parent, args, context) => {
  return await context.prisma.description.findUnique({ where: { id: parent.id } }).word()
}

abbr = async (parent, args, context) => {
  return await context.prisma.description.findUnique({ where: { id: parent.id } }).abbr()
}

origin = async (parent, args, context) => {
  return await context.prisma.description.findUnique({ where: { id: parent.id } }).origin()
}

updatedBy = async (parent, args, context) => {
  return await context.prisma.description.findUnique({ where: { id: parent.id } }).updatedBy()
}

module.exports = {
  word,
  abbr,
  origin,
  updatedBy,
}
