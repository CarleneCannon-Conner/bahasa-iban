users = async (parent, {filter, skip, take, orderBy}, context, info) => {
  const where = filter
    ? {
      AND: [
        { name: { contains: filter } },
        { email: { contains: filter } },
      ],
    }
    : {}

  const users = await context.prisma.user.findMany({
    where,
    skip,
    take,
    orderBy,
  })

  const count = await context.prisma.user.count({ where })

  return {
    users,
    count,
  }
}

user = async (parent, args, context, info) => {
  return await context.prisma.user.findUnique({ where: { id: Number(args.id) } })
}

languages = async (parent, {filter, skip, take, orderBy}, context, info) => {
  const where = filter
  ? {
    OR: [
      { description: { contains: filter } },
    ],
  }
  : {}

  const languages = await context.prisma.language.findMany({
    where,
    skip,
    take,
    orderBy,
  })

  const count = await context.prisma.language.count({ where })

  return {
    languages,
    count,
  }
}

language = async (parent, args, context, info) => {
  return await context.prisma.language.findUnique({ where: { id: Number(args.id) } })
}

descriptions = async (parent, {filter, skip, take, orderBy}, context, info) => {
  const where = filter
    ? {
      AND: [
        { abbr: { contains: filter } },
        { origin: { contains: filter } },
        { translation: { contains: filter } },
      ],
    }
    : {}

  const descriptions = await context.prisma.description.findMany({
    where,
    skip,
    take,
    orderBy,
  })

  const count = await context.prisma.description.count({ where })

  return {
    descriptions,
    count,
  }
}

description = async (parent, args, context, info) => {
  return await context.prisma.description.findUnique({ where: { id: Number(args.id) } })
}

abbreviations = async (parent, {filter, skip, take, orderBy}, context, info) => {
  const where = filter
    ? {
      AND: [
        { abbr: { contains: filter } },
        { value: { contains: filter } },
      ],
    }
    : {}

  const abbreviations = await context.prisma.abbreviation.findMany({
    where,
    skip,
    take,
    orderBy,
  })

  const count = await context.prisma.abbreviation.count({ where })

  return {
    abbreviations,
    count,
  }
}

abbreviation = async (parent, args, context, info) => {
  return await context.prisma.abbreviation.findUnique({ where: { id: Number(args.id) } })
}

origins = async (parent, {filter, skip, take, orderBy}, context, info) => {
  const where = filter
    ? {
      AND: [
        { abbr: { contains: filter } },
        { value: { contains: filter } },
      ],
    }
    : {}

  const origins = await context.prisma.origin.findMany({
    where,
    skip,
    take,
    orderBy,
  })

  const count = await context.prisma.origin.count({ where })

  return {
    origins,
    count,
  }
}

origin = async (parent, args, context, info) => {
  return await context.prisma.origin.findUnique({ where: { id: Number(args.id) } })
}

words = async (parent, {filter, langId, skip, take, orderBy}, context, info) => {
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

word = async (parent, args, context, info) => {
  return await context.prisma.word.findUnique({ where: { id: Number(args.id) } })
}

pronunciations = async (parent, {filter, skip, take, orderBy}, context, info) => {
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

pronunciation = async (parent, args, context, info) => {
  return await context.prisma.pronunciation.findUnique({ where: { id: Number(args.id) } })
}

wordPronunciations = async (parent, {filter, skip, take, orderBy}, context, info) => {
 const wordPronunciations = await context.prisma.wordPronunciation.findMany({
    skip,
    take,
    orderBy,
  })
  const count = await context.prisma.wordPronunciation.count({})

  return {
    wordPronunciations,
    count,
  }
}

wordPronunciation = async (parent, args, context, info) => {
  return await context.prisma.wordPronunciation.findUnique({ where: { id: Number(args.id) } })
}

module.exports = {
  users,
  user,
  languages,
  language,
  descriptions,
  description,
  abbreviations,
  abbreviation,
  origins,
  origin,
  words,
  word,
  pronunciations,
  pronunciation,
  wordPronunciations,
  wordPronunciation,
}