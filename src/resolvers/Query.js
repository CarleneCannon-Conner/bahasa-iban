async function words(parent, {filter, langId, skip, take, orderBy}, context, info) {
  console.log("*** word")
  const where = filter
    ? {
      AND: [
        { spelling: { contains: filter } },
        { langId: langId },
      ],
    }
    : {}

  const words = await context.prisma.word.findMany({
    where,
    skip,
    take,
    orderBy,
  })

  const count = await context.prisma.word.count({ where })

  return {
    words,
    count,
  }
}

async function word(parent, args, context, info) {
  return await context.prisma.word.findUnique({ where: { id: Number(args.id) } })
}

async function pronunciations(parent, {filter, skip, take, orderBy}, context, info) {
  const where = filter
  ? {
    OR: [
      { symbol: { contains: filter } },
    ],
  }
  : {}

 const pronunciations = await context.prisma.pronunciation.findMany({
    where,
    skip,
    take,
    orderBy,
  })
  const count = await context.prisma.pronunciation.count({ where })

  return {
    pronunciations,
    count,
  }
}

async function pronunciation(parent, args, context, info) {
  return await context.prisma.pronunciation.findUnique({ where: { id: Number(args.id) } })
}

module.exports = {
  words,
  word,
  pronunciations,
  pronunciation,
}