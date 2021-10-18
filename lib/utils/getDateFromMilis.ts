/**
 * Function to get the date string given the milis
 * 
 * @param milis The date timestamp in milis
 * @returns Date in string form
 */
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