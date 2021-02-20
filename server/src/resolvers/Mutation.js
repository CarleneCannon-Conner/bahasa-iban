const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { getUserId } = require('../utils')

createUser = async (parent, args, context, info) => {
  console.log("*** createUser", args)
  const password = await bcrypt.hash(args.password, 10)
  const user = await context.prisma.user.create({ data: { ...args, password } })

  const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)

  return {
    token,
    user,
  }
}

updateUser = async (parent, {id, name, password}, context, info) => {
  const userId = getUserId(context)
  if (id && userId !== id) throw new Error('Error unable to edit a user that is not you') 
  const user = await context.prisma.user.findUnique({ where: { id: Number(id || userId) } })



  return context.prisma.user.update({
    where: {
      id: Number(user.id)
    },
    data: {
      name: name || user.name,
      email: email || user.email,
      password: password || user.password
    }
  })
}

login = async (parent, args, context, info) => {
  console.log("*** login", args)
  const user = await context.prisma.user.findUnique({ where: { email: args.email } })
  if (!user) {
    throw new Error('No such user found')
  }

  const valid = await bcrypt.compare(args.password, user.password)
  if (!valid) {
    throw new Error('Invalid password')
  }

  const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)

  return {
    token,
    user,
  }
}

createWord = async (parent, {spelling, phonetic, langId}, context, info) => {
  const userId = getUserId(context)
  return await context.prisma.word.create({  
    data: {
      spelling,
      phonetic,
      language: { connect: { id: Number(langId) } },
      descriptions: [],
      pronunciations: [],
      updatedBy: { connect: { id: Number(userId) } },
    }
  })
}

updateWord = async (parent, {id, spelling, phonetic, langId}, context, info) => {
  const userId = getUserId(context)
  const word = await context.prisma.word.findUnique({ where: { id: Number(id) } })

  return context.prisma.word.update({
    where: {
      id: Number(id)
    },
    data: {
      spelling: spelling || word.spelling,
      phonetic: phonetic || word.phonetic,
      langId: langId || word.langId,
      updatedBy: { connect: { id: Number(userId) } },
    }
  })
}

deleteWord = async (parent, {id}, context, info) => {
  const userId = getUserId(context) 
  return await context.prisma.word.delete({
    where: {
      id: Number(id)
    }
  })
}

addDescription = async (parent, {translation, wordId, originId, abbrId}, context, info) => {
  const userId = getUserId(context)
  return await context.prisma.description.create({  
    data: {
      translation,
      word: { connect: { id: Number(wordId) } },
      updatedBy: { connect: { id: Number(userId) } },
      origin: originId && { connect: { id: Number(originId) } },
      abbr: abbrId && { connect: { id: Number(abbrId) } },
    }
  })
}

updateDescription = async (parent, {id, translation, wordId, originId, abbrId}, context, info) => {
  const userId = getUserId(context)
  const description = await context.prisma.description.findUnique({ where: { id: Number(id) } })

  return context.prisma.description.update({
    where: {
      id: Number(id)
    },
    data: {
      translation: translation || description.translation,
      updatedBy: { connect: { id: Number(userId) } },
      word: { connect: { id: Number(wordId && wordId || description.wordId) } },
      origin: { connect: { id: Number(originId && originId || description.originId) } },
      abbr: { connect: { id: Number(abbrId && abbrId || description.abbrId) } },
    }
  })
}

removeDescription = async (parent, {id}, context, info) => {
  const userId = getUserId(context) 
  return await context.prisma.description.delete({
    where: {
      id: Number(id)
    }
  })
}

createWordPronunciation = async (parent, args, context, info) => {
  const userId = getUserId(context)
  return await context.prisma.wordPronunciation.create({
    data: {
      word: { connect: { id: Number(args.wordId) } },
      pronunciation: { connect: { id: Number(args.pronunciationId) } },
      updatedBy: { connect: { id: userId } },
    },
  })
}


deleteWordPronunciation = async (parent, {id}, context, info) => {
  const userId = getUserId(context) 
  return await context.prisma.wordPronunciation.delete({
    where: {
      id: Number(id)
    }
  })
}

createAbbr = async (parent, {abbr, value}, context, info) => {
  const userId = getUserId(context)
  return await context.prisma.abbreviation.create({  
    data: {
      abbr,
      value,
      updatedBy: { connect: { id: userId } },
    }
  })
}

updateAbbr = async (parent, {id, abbr, value}, context, info) => {
  const userId = getUserId(context)
  const abbreviation = await context.prisma.abbreviation.findUnique({ where: { id: Number(id) } })

  return context.prisma.abbreviation.update({
    where: {
      id: Number(id)
    },
    data: {
      abbr: abbr || abbreviation.abbr,
      value: value || abbreviation.value,
      updatedBy: { connect: { id: Number(userId) } },
    }
  })
}

deleteAbbr = async (parent, {id}, context, info) => {
  const userId = getUserId(context)
  return await context.prisma.abbreviation.delete({
    where: {
      id: Number(id)
    }
  })
}

createOrigin = async (parent, {abbr, value}, context, info) => {
  const userId = getUserId(context)
  return await context.prisma.origin.create({  
    data: {
      abbr,
      value,
      updatedBy: { connect: { id: userId } },
    }
  })
}

updateOrigin = async (parent, {id, abbr, value}, context, info) => {
  const userId = getUserId(context)
  const origin = await context.prisma.origin.findUnique({ where: { id: Number(id) } })

  return context.prisma.origin.update({
    where: {
      id: Number(id)
    },
    data: {
      abbr: abbr || origin.abbr,
      value: value || origin.value,
      updatedBy: { connect: { id: Number(userId) } },
    }
  })
}

deleteOrigin = async (parent, {id}, context, info) => {
  const userId = getUserId(context)
  return await context.prisma.origin.delete({
    where: {
      id: Number(id)
    }
  })
}

createLanguage = async (parent, {description}, context, info) => {
  const userId = getUserId(context)
  return await context.prisma.language.create({  
    data: {
      description,
      updatedBy: { connect: { id: Number(userId) } },
    }
  })
}

updateLanguage = async (parent, {id, description}, context, info) => {
  const userId = getUserId(context)
  const language = await context.prisma.language.findUnique({ where: { id: Number(id) } })

  return context.prisma.language.update({
    where: {
      id: Number(id)
    },
    data: {
      description: description || language.description,
      updatedBy: { connect: { id: Number(userId) } },
    }
  })
}

deleteLanguage = async (parent, {id}, context, info) => {
  const userId = getUserId(context)
  return await context.prisma.language.delete({
    where: {
      id: Number(id)
    }
  })
}

createPronunciation = async (parent, {symbol, description, iban, english}, context, info) => {
  const userId = getUserId(context)
  return await context.prisma.pronunciation.create({  
    data: {
      symbol,
      description: description && description,
      iban: iban && iban,
      english: english && english,
      updatedBy: { connect: { id: userId } },
    }
  })
}

updatePronunciation = async (parent, {id, symbol, description, iban, english}, context, info) => {
  const userId = getUserId(context)
  const pronunciation = await context.prisma.pronunciation.findUnique({ where: { id: Number(id) } })

  return context.prisma.pronunciation.update({
    where: {
      id: Number(id)
    },
    data: {
      symbol: symbol || pronunciation.symbol,
      description: description || pronunciation.description,
      iban: iban || pronunciation.iban,
      english: english || pronunciation.english,
      updatedBy: { connect: { id: Number(userId) } },
    }
  })
}

deletePronunciation = async (parent, {id}, context, info) => {
  const userId = getUserId(context)
  return await context.prisma.pronunciation.delete({
    where: {
      id: Number(id)
    }
  })
}

module.exports = {
  createUser,
  updateUser,
  login,
  createWord,
  updateWord,
  deleteWord,
  addDescription,
  updateDescription,
  removeDescription,
  createWordPronunciation,
  deleteWordPronunciation,
  createAbbr,
  updateAbbr,
  deleteAbbr,
  createOrigin,
  updateOrigin,
  deleteOrigin,
  createLanguage,
  updateLanguage,
  deleteLanguage,
  createPronunciation,
  updatePronunciation,
  deletePronunciation
}