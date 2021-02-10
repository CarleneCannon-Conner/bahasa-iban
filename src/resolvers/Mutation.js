async function createWord(parent, {pronunciationIds, spelling, phonetic, langId}, context, info) {
  const newWord = await context.prisma.word.create({  
    data: {
      spelling,
      phonetic,
      language: { connect: { id: Number(langId) } },
      descriptions: [],
    }
  })

  return newWord
}

async function addDescription(parent, {translation, wordId, originId, abbrId, }, context, info) {
  const data = {
    translation: translation,
    word: { connect: { id: Number(wordId) } },
  }

  if (originId) {
    data.origin = { connect: { id: Number(originId) } }
  }

  if (abbrId) {
    data.abbr = { connect: { id: Number(abbrId) } }
  }

  const description =  await context.prisma.description.create({  
    data
  })

  return description
}

async function createWordPronunciation (parent, args, context, info) {
  return context.prisma.wordPronunciation.create({
    data: {
      word: { connect: { id: Number(args.wordId) } },
      pronunciation: { connect: { id: Number(args.pronunciationId) } },
    },
  });
}

async function deleteWord(parent, {id}, context, info) {

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

async function createAbbr(parent, {abbr, value}, context, info) {
  return await context.prisma.abbreviation.create({  
    data: {
      abbr,
      value,
    }
  })
}

async function deleteAbbr(parent, {id}, context, info) {
  return await context.prisma.abbreviation.delete({
    where: {
      id: Number(id)
    }
  })
}

async function createOrigin(parent, {abbr, value}, context, info) {
  return await context.prisma.origin.create({  
    data: {
      abbr,
      value,
    }
  })
}

async function deleteOrigin(parent, {id}, context, info) {
  return await context.prisma.origin.delete({
    where: {
      id: Number(id)
    }
  })
}

async function createLanguage(parent, {description}, context, info) {
  return await context.prisma.language.create({  
    data: {
      description,
    }
  })
}

async function deleteLanguage(parent, {id}, context, info) {
  return await context.prisma.language.delete({
    where: {
      id: Number(id)
    }
  })
}

async function createPronunciation (parent, {symbol, description, iban, english}, context, info) {
  let data = {
    symbol,
  }

  if (description) {
    data.descriptions
  }

  if (iban) {
    data.iban
  }

  if (english) {
    data.english
  }

  const pronunciation =  await context.prisma.pronunciation.create({  
    data
  })

  return pronunciation
}

async function deletePronunciation(parent, {id}, context, info) {
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


