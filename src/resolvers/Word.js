function language(parent, args, context) {
  return context.prisma.word.findUnique({ where: { id: parent.id } }).language()
}

function descriptions(parent, args, context) {
  return context.prisma.word.findUnique({ where: { id: parent.id } }).descriptions()
}

module.exports = {
  language,
  descriptions,
}