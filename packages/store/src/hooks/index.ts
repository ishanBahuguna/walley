import { TypedUseSelectorHook, useDispatch , useSelector } from "react-redux";
import type { RootState , AppDispatch } from "../store";

export const useBalanceDispatch: () => AppDispatch = useDispatch;
export const useBalanceSelector: TypedUseSelectorHook<RootState> = useSelector;