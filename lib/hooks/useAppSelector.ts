import { RootState } from "@store";
import { TypedUseSelectorHook, useSelector } from "react-redux";

/**
 * Store selector typed to the current store
 */
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default useAppSelector