import { AppDispatch } from '@store'
import { useDispatch } from 'react-redux'

/**
 * Store dispatch typed to the store type
 */
const useAppDispatch = () => useDispatch<AppDispatch>()

export default useAppDispatch
