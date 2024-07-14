import type { Direction } from "./types";

export const LETTERS: string = "abcdefghijklmnopqrstuvwxyz";
export const WORD_RE = /^[a-z]+$/;
export const WORD_SEARCH_MAX_ROW_SIZE: number = 25;
export const WORD_SEARCH_MIN_ROW_SIZE: number = 4;
export const WORD_SEARCH_MAX_COL_SIZE: number = 30;
export const WORD_SEARCH_MIN_COL_SIZE: number = 4;
export const WORD_SEARCH_MAX_WORDS: number = 32;
export const DIRECTIONS: Direction[] = ["N", "S", "E", "W", "NE", "NW", "SE", "SW"];
export const SECTIONS = {
    four: {
        rows: 2,
        cols: 2,
        num: 4,
    },
    nine: {
        rows: 3,
        cols: 3,
        num: 9,
    },
    sixteen: {
        rows: 4,
        cols: 4,
        num: 16,
    },
};