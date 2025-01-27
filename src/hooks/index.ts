import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { AppDispatch, State } from '../types/store';
import { useDispatch } from 'react-redux';

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;

export const useAppDispatch: () => AppDispatch = useDispatch;
