const checkDefined = (str?: string) => {
  if (str === '' || !str)
    return 'Não especificado'
  return str
}

export default checkDefined