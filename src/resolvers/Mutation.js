async function createWord(parent, args, context, info) {

  const newWord = await context.prisma.word.create({  
    data: {
      spelling: args.spelling,
      phonetic: args.phonetic,
      language: { connect: { id: Number(args.langId) } },
      descriptions: []
    }
  })

  return newWord
}

async function addDescription(parent, args, context, info) {
  const descriptionData = {
    translation: args.translation,
    word: { connect: { id: Number(args.wordId) } },
  }

  if (args.originId) {
    descriptionData.origin = { connect: { id: Number(args.originId) } }
  }

  if (args.abbrId) {
    descriptionData.abbr = { connect: { id: Number(args.abbrId) } }
  }

  return await context.prisma.description.create({  
    data: descriptionData
  })
}
async function deleteWord(parent, args, context, info) {
  const word = await context.prisma.word.findUnique({ where: { id: Number(args.id) } })

  const where = args.wordId
    ? {
      OR: [
        { wordId: { contains: args.wordId } },
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

async function createAbbr(parent, args, context, info) {
  return await context.prisma.abbreviation.create({  
    data: {
      abbr: args.abbr,
      value: args.value,
    }
  })
}

async function deleteAbbr(parent, args, context, info) {
  return await context.prisma.abbreviation.delete({
    where: {
      id: Number(args.id)
    }
  })
}

async function createOrigin(parent, args, context, info) {
  return await context.prisma.origin.create({  
    data: {
      abbr: args.abbr,
      value: args.value,
    }
  })
}

async function deleteOrigin(parent, args, context, info) {
  return await context.prisma.origin.delete({
    where: {
      id: Number(args.id)
    }
  })
}

async function createLanguage(parent, args, context, info) {
  return await context.prisma.language.create({  
    data: {
      description: args.description,
    }
  })
}

async function deleteLanguage(parent, args, context, info) {
  return await context.prisma.language.delete({
    where: {
      id: Number(args.id)
    }
  })
}

async function createPronunciation(parent, args, context, info) {
  return await context.prisma.pronunciation.create({  
    data: {
      symbol: args.symbol,
      description: args.description || null,
      iban: args.iban || null,
      english: args.english || null,
    }
  })
}

async function deletePronunciation(parent, args, context, info) {
  return await context.prisma.pronunciation.delete({
    where: {
      id: Number(args.id)
    }
  })
}

module.exports = {
  createWord,
  addDescription,
  deleteWord,
  createAbbr,
  deleteAbbr,
  createOrigin,
  deleteOrigin,
  createLanguage,
  deleteLanguage,
  createPronunciation,
  deletePronunciation,
}


