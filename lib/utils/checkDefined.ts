/**
 * Check if the given string is defined or different of ''
 * 
 * @param str The string you want to check if is defined or different of ''
 * @returns 'Não especificado' if undefined, else returns `str`
 */
const checkDefined = (str?: string) => {
  if (str === '' || !str)
    return 'Não especificado'
  return str
}

export default checkDefined