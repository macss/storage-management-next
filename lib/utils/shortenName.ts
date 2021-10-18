import { capitalize } from "@utils"

/**
 * Transforms a name like `Marco Antônio Chaves Soares` to the form `Marco A. C. Soares`
 * @param name Name you want to shorten
 * @returns The shortened version of the name
 */
const shortenName = (name?: string | null) => {
  if (!name) {
    throw new Error('Name must be defined.')
  }

  const words = name.split(' ')
  return words.map((word, idx) => {
    if (idx === 0 || idx === words.length - 1)
      return capitalize(word)
    return `${word.toUpperCase().charAt(0)}.`
  }).join(' ')
}

export default shortenName