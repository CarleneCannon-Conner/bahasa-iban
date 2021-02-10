async function words(parent, args, context, info) {
  const wordPronunciation = await context.prisma.wordPronunciation.findMany({
    where: {
      pronunciationId: parent.id,
    },
  })


  const wordIds = wordPronunciation.map((elem) => {
    return elem.wordId
  })

  return await context.prisma.word.findMany({
    where: {
      id: {
        in: wordIds,
      },
    },
  })
}

module.exports = {
  words,
}