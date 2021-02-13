createWord = async (parent, {spelling, phonetic, langId}, context, info) => {
  return await context.prisma.word.create({  
    data: {
      spelling,
      phonetic,
      language: { connect: { id: Number(langId) } },
      descriptions: [],
      pronunciations: [],
    }
  })
}

addDescription = async (parent, {translation, wordId, originId, abbrId, }, context, info) => {
  return await context.prisma.description.create({  
    data: {
      translation,
      word: { connect: { id: Number(wordId) } },
      origin: originId && { connect: { id: Number(originId) } },
      abbr: abbrId && { connect: { id: Number(abbrId) } },
    }
  })
}

createWordPronunciation = async (parent, args, context, info) => {
  return await context.prisma.wordPronunciation.create({
    data: {
      word: { connect: { id: Number(args.wordId) } },
      pronunciation: { connect: { id: Number(args.pronunciationId) } },
    },
  })
}

deleteWord = async (parent, {id}, context, info) => {

  const where = id
    ? {
      OR: [
        { wordId: { contains: id } },
      ],
    }
    : {}

  const descriptions = await context.prisma.descriptions.findMany({
    where,
  })

  for (const description of descriptions) {
    await context.prisma.description.delete({
      where: {
        id: Number(description.id)
      }
    })
  }
  
  return context.prisma.word.delete({
    where: {
      id: Number(args.id)
    }
  })
}

createAbbr = async (parent, {abbr, value}, context, info) => {
  return await context.prisma.abbreviation.create({  
    data: {
      abbr,
      value,
    }
  })
}

deleteAbbr = async (parent, {id}, context, info) => {
  return await context.prisma.abbreviation.delete({
    where: {
      id: Number(id)
    }
  })
}

createOrigin = async (parent, {abbr, value}, context, info) => {
  return await context.prisma.origin.create({  
    data: {
      abbr,
      value,
    }
  })
}

deleteOrigin = async (parent, {id}, context, info) => {
  return await context.prisma.origin.delete({
    where: {
      id: Number(id)
    }
  })
}

createLanguage = async (parent, {description}, context, info) => {
  return await context.prisma.language.create({  
    data: {
      description,
    }
  })
}

deleteLanguage = async (parent, {id}, context, info) => {
  return await context.prisma.language.delete({
    where: {
      id: Number(id)
    }
  })
}

createPronunciation = async (parent, {symbol, description, iban, english}, context, info) => {
  return await context.prisma.pronunciation.create({  
    data: {
      symbol,
      description: description && description,
      iban: iban && iban,
      english: english && english
    }
  })
}

deletePronunciation = async (parent, {id}, context, info) => {
  return await context.prisma.pronunciation.delete({
    where: {
      id: Number(id)
    }
  })
}

module.exports = {
  createWord,
  addDescription,
  createWordPronunciation,
  deleteWord,
  createAbbr,
  deleteAbbr,
  createOrigin,
  deleteOrigin,
  createLanguage,
  deleteLanguage,
  createPronunciation,
  deletePronunciation
}