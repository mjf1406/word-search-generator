// ----- Word Search ------
export type LetterCoord = {
    letter: string,
    x: number,
    y: number,
}
export type Word = {
    word: string,
    displayWord: string,
    coords: LetterCoord[],
    sections: number[]
}
export type WordSearch = {
    words: Word[],
    grid: string[][],
    failed: string[],
    sections: number[][]
}

// ----- Options ------
export type Direction = "N" | "S" | "E" | "W" | "NE" | "NW" | "SE" | "SW";
export type Options = {
    fit: boolean,
    cols: number,
    rows: number,
    disabledDirections: Direction[],
    words: string[],
    case: "upper" | "lower" | "random",
    sections: 0 | 4 | 9 | 16,
    maxRetries: number,
}