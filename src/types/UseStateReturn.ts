import { Dispatch, SetStateAction } from 'react';

export type UseStateReturn<T = any> = [T, Dispatch<SetStateAction<T>>];
