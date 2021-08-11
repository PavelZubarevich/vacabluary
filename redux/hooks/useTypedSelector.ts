import { TypedUseSelectorHook, useSelector } from "react-redux";
import { reduserType } from "../redusers";


export const useTypedSelector:TypedUseSelectorHook<reduserType> = useSelector;