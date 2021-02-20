word = async (parent, args, context) => {
  return await context.prisma.wordPronunciation.findUnique({ where: { id: parent.id } }).word()
}

pronunciation = async (parent, args, context) => {
  return await context.prisma.wordPronunciation.findUnique({ where: { id: parent.id } }).pronunciation()
}

updatedBy = async (parent, args, context) => {
  return await context.prisma.wordPronunciation.findUnique({ where: { id: parent.id } }).updatedBy()
}

module.exports = {
  word,
  pronunciation,
  updatedBy,
}