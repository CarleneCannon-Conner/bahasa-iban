async function words(parent, args, context, info) {
  const where = args.filter
    ? {
      OR: [
        { spelling: { contains: args.filter } },
      ],
    }
    : {}

  const words = await context.prisma.word.findMany({
    where,
    skip: args.skip,
    take: args.take,
    orderBy: args.orderBy,
  })

  const count = await context.prisma.word.count({ where })

  return {
    words,
    count,
  }
}

async function pronunciation(parent, args, context, info) {
  const chars = args.filter.split('')
  const pronunciations = []

  for (const char of chars) {
    const where = char
    ? {
      OR: [
        { symbol: { contains: char } },
      ],
    }
    : {}

    const pronunciation = await context.prisma.pronunciation.findMany({
      where
    })
    pronunciations.push(pronunciation)
  }
}

module.exports = {
  words,
  pronunciation,
}