function abbr(parent, args, context) {
  return context.prisma.description.findUnique({ where: { id: parent.id } }).abbr()
}

function origin(parent, args, context) {
  return context.prisma.description.findUnique({ where: { id: parent.id } }).origin()
}

module.exports = {
  abbr,
  origin,
}