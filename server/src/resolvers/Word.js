language = async (parent, args, context) => {
  return await context.prisma.word.findUnique({ where: { id: parent.id } }).language()
}

updatedBy = async (parent, args, context) => {
  return await context.prisma.word.findUnique({ where: { id: parent.id } }).updatedBy()
}

descriptions = async (parent, args, context) => {
  return await context.prisma.word.findUnique({ where: { id: parent.id } }).descriptions()
}

pronunciations = async (parent, args, context, info) => {
  const wordPronunciation = await context.prisma.wordPronunciation.findMany({
    where: {
      wordId: parent.id,
    },
  })

  const pronunciationIds = wordPronunciation.map((elem) => {
    return elem.pronunciationId
  })

  return await context.prisma.pronunciation.findMany({
    where: {
      id: {
        in: pronunciationIds,
      },
    },
  })
}

module.exports = {
  language,
  updatedBy,
  descriptions,
  pronunciations,
}