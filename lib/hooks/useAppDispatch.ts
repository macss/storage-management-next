import { AppDispatch } from "@store/store";
import { useDispatch } from "react-redux";

export default () => useDispatch<AppDispatch>()