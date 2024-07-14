export const LETTERS: string = "abcdefghijklmnopqrstuvwxyz";
export const WORD_RE = /^[a-z]+$/;
export const WORD_SEARCH_MAX_ROW_SIZE: number = 25;
export const WORD_SEARCH_MIN_ROW_SIZE: number = 4;
export const WORD_SEARCH_MAX_COL_SIZE: number = 30;
export const WORD_SEARCH_MIN_COL_SIZE: number = 4;
export const WORD_SEARCH_MAX_WORDS: number = 32;
export const PAPER_SIZES = {
    a4: {
        width: 595,
        height: 842,
    },
    letter: {
        width: 612,
        height: 792,
    },
};
export const DIRECTIONS: string[] = [
    "left-to-right",
    "right-to-left",
    "bottom-to-top",
    "top-to-bottom",
    "diagonal-down-left",
    "diagonal-down-right",
    "diagonal-up-right",
    "diagonal-up-left",
];
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
    },
};