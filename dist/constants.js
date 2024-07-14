"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SECTIONS = exports.DIRECTIONS = exports.PAPER_SIZES = exports.WORD_SEARCH_MAX_WORDS = exports.WORD_SEARCH_MIN_COL_SIZE = exports.WORD_SEARCH_MAX_COL_SIZE = exports.WORD_SEARCH_MIN_ROW_SIZE = exports.WORD_SEARCH_MAX_ROW_SIZE = exports.WORD_RE = exports.LETTERS = void 0;
exports.LETTERS = "abcdefghijklmnopqrstuvwxyz";
exports.WORD_RE = /^[a-z]+$/;
exports.WORD_SEARCH_MAX_ROW_SIZE = 25;
exports.WORD_SEARCH_MIN_ROW_SIZE = 4;
exports.WORD_SEARCH_MAX_COL_SIZE = 30;
exports.WORD_SEARCH_MIN_COL_SIZE = 4;
exports.WORD_SEARCH_MAX_WORDS = 32;
exports.PAPER_SIZES = {
    a4: {
        width: 595,
        height: 842,
    },
    letter: {
        width: 612,
        height: 792,
    },
};
exports.DIRECTIONS = [
    "left-to-right",
    "right-to-left",
    "bottom-to-top",
    "top-to-bottom",
    "diagonal-down-left",
    "diagonal-down-right",
    "diagonal-up-right",
    "diagonal-up-left",
];
exports.SECTIONS = {
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
