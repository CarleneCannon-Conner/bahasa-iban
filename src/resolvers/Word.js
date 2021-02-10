function language(parent, args, context) {
  return context.prisma.word.findUnique({ where: { id: parent.id } }).language()
}

function descriptions(parent, args, context) {
  return context.prisma.word.findUnique({ where: { id: parent.id } }).descriptions()
}

async function pronunciations(parent, args, context, info) {
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
  descriptions,
  pronunciations,
}