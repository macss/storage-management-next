const getDateFromMilis = (milis: number) => {
  return new Date(milis).toLocaleString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  })
}

export default getDateFromMilis