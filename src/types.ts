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