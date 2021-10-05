const shortenName = (name?: string | null) => {
  if (!name) {
    throw new Error('Name must be defined.')
  }

  const words = name.split(' ')
  return words.map((word, idx) => {
    if (idx === 0 || idx === words.length - 1)
      return word
    return `${word.toUpperCase().charAt(0)}.`
  }).join(' ')
}

export default shortenName