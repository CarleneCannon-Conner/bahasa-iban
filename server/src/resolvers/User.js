languages = async (parent, args, context) => {
  return await context.prisma.user.findUnique({ where: { id: parent.id } }).languages()
}

words = async (parent, args, context) => {
  return await context.prisma.user.findUnique({ where: { id: parent.id } }).words()
}

descriptions = async (parent, args, context) => {
  return await context.prisma.user.findUnique({ where: { id: parent.id } }).descriptions()
}

abbreviations = async (parent, args, context) => {
  return await context.prisma.user.findUnique({ where: { id: parent.id } }).abbreviations()
}

origins = async (parent, args, context) => {
  return await context.prisma.user.findUnique({ where: { id: parent.id } }).origins()
}

pronunciations = async (parent, args, context) => {
  return await context.prisma.user.findUnique({ where: { id: parent.id } }).pronunciations()
}

wordPronunciations = async (parent, args, context) => {
  return await context.prisma.user.findUnique({ where: { id: parent.id } }).wordPronunciations()
}

module.exports = {
  languages,
  words,
  descriptions,
  abbreviations,
  origins,
  pronunciations,
  wordPronunciations,
}