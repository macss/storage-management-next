/**
 * Capitalizes the given string if it is a string, lowercase the rest
 * 
 * @param word The word you want capitalizes
 * @returns The capitalized string
 */
const capitalize = (word: string) => {
  if (typeof word !== 'string')
    return word
  
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
}

export default capitalize