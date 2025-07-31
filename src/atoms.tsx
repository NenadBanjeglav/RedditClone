import { atom } from "jotai";
import { Group } from "./types/types";

export const selectedGroupAtom = atom<Group | null>(null);
