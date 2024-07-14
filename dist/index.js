"use strict";
function adjustCase(wordData, letterCase) {
    if (letterCase === "lowercase") {
        for (let index = 0; index < wordData.length; index++) {
            let word = wordData[index].word;
            wordData[index].word = word.toLowerCase();
        }
    }
    else if (letterCase === "uppercase") {
        for (let index = 0; index < wordData.length; index++) {
            let word = wordData[index].word;
            wordData[index].word = word.toUpperCase();
        }
    }
    else if (letterCase === "random-case") {
        for (let index = 0; index < wordData.length; index++) {
            let newWord = [];
            let word = wordData[index].word;
            word = word.split("");
            for (let index = 0; index < word.length; index++) {
                let letter = word[index];
                let randCase = getRndInteger(0, 1);
                if (randCase == 0)
                    letter = letter.toUpperCase();
                else
                    letter = letter.toLowerCase();
                newWord.push(letter);
            }
            wordData[index].word = newWord.join("");
        }
    }
    return wordData;
}
function computeSectionDimensions(params) {
    const height = params.height;
    const width = params.width;
    const wordData = params.wordData;
    // const sections = params.sections
    const sections = [];
    const numberOfSectionsWord = params.numberOfSections;
    const cols = SECTIONS[numberOfSectionsWord].cols;
    const rows = SECTIONS[numberOfSectionsWord].rows;
    const numberOfSections = SECTIONS[numberOfSectionsWord].num;
    const sectionWidth = Math.floor(width / cols);
    const sectionHeight = Math.floor(height / rows);
    let sectionId = 0;
    // Section Dimensions
    for (let colIdx = 0; colIdx < cols; colIdx++) {
        for (let rowIdx = 0; rowIdx < rows; rowIdx++) {
            let xStart = sectionHeight * colIdx;
            let xEnd = xStart + (sectionHeight - 1);
            let yStart = sectionWidth * rowIdx;
            let yEnd = yStart + (sectionWidth - 1);
            // The last column
            if (colIdx === cols - 1) {
                xEnd = height - 1;
            }
            // The last row
            if (rowIdx === rows - 1) {
                yEnd = width - 1;
            }
            sections.push({
                id: sectionId,
                start: `${xStart}-${yStart}`,
                end: `${xEnd}-${yEnd}`,
            });
            sectionId++;
        }
    }
    params.sections = sections;
    return params;
}
function determineWordSections(params) {
    const wordData = params.wordData;
    const sections = params.sections;
    sections.sort(function (a, b) {
        return a.id - b.id;
    });
    let placedWords = [];
    for (let wordDataIdx = 0; wordDataIdx < wordData.length; wordDataIdx++) {
        const element = wordData[wordDataIdx];
        const wordCoords = element.coords;
        element.sections = [];
        if (!wordCoords)
            continue; // Word was not placed
        if (!placedWords.includes(element.word))
            placedWords.push(element.word);
        for (let wordCoordIdx = 0; wordCoordIdx < wordCoords.length; wordCoordIdx++) {
            const letterCoords = wordCoords[wordCoordIdx];
            const letter = element.word[wordCoordIdx];
            const x = letterCoords.x;
            const y = letterCoords.y;
            for (let sectionIdx = 0; sectionIdx < sections.length; sectionIdx++) {
                const section = sections[sectionIdx];
                const id = section.id;
                const start = section.start.split("-");
                const xStart = start[0];
                const yStart = start[1];
                const end = section.end.split("-");
                const xEnd = end[0];
                const yEnd = end[1];
                if (x >= xStart && y >= yStart && x <= xEnd && y <= yEnd) {
                    if (!element.sections.includes(id + 1))
                        element.sections.push(id + 1);
                    break; // A letter cannot be in more than one section
                }
            }
        }
    }
    return params;
}
function generateWordSearch(params) {
    const revealSections = document.getElementById("reveal-section").checked;
    let height = parseInt(params.height);
    let width = parseInt(params.width);
    const MAX_ATTEMPTS = height * width;
    let letterCase = params.letterCase;
    let directions = params.directions;
    let words = params.words;
    let wordData = words.map((word) => {
        return { word: word };
    });
    const wordsNotPlaced = [];
    // Error Handling
    let invalidWordLength = false;
    for (let index = 0; index < words.length; index++) {
        const word = words[index];
        if (word.length > width && word.length > height) {
            invalidWordLength = true;
            if (invalidWordLength)
                makeToast("One or more of your words is longer than the word search width and height. Please ensure yours words are shorter than at least one of the dimensions.", "error");
            if (invalidWordLength)
                break;
        }
    }
    if (invalidWordLength)
        return "Error: Invalid word length";
    // Answer Key
    let answerKey = new Array(height);
    for (let index = 0; index < answerKey.length; index++) {
        answerKey[index] = new Array(width);
    }
    // Grid
    let grid = new Array(height);
    for (let index = 0; index < grid.length; index++) {
        grid[index] = new Array(width);
    }
    // Modify Words
    wordData = adjustCase(wordData, letterCase);
    // Place words
    function placeLetter(direction, x1, y1, letterIndex, grid, letterCoords, letter, answerKey) {
        const [dx, dy] = DELTAS[direction];
        const x = x1 + dx * letterIndex;
        const y = y1 + dy * letterIndex;
        if (x < 0 || x >= grid.length || y < 0 || y >= grid[0].length) {
            return false;
        }
        const charAtCoordInGrid = grid[x][y];
        const charAtCoordInAnswerKey = answerKey[x][y];
        // Empty grid tile
        if (charAtCoordInGrid === undefined &&
            charAtCoordInAnswerKey === undefined) {
            grid[x][y] = letter;
            letterCoords.push({ x, y });
            return true;
        }
        // Overlapping letters
        else if (charAtCoordInGrid === letter &&
            charAtCoordInAnswerKey === letter) {
            letterCoords.push({ x, y });
            return true;
        }
        return false;
    }
    for (let wordIndex = 0; wordIndex < wordData.length; wordIndex++) {
        let word = wordData[wordIndex].word;
        let attempt = 1;
        let wordPlaced = false;
        while (attempt <= MAX_ATTEMPTS && wordPlaced === false) {
            let direction = directions[Math.floor(Math.random() * directions.length)];
            wordData[wordIndex].direction = direction;
            let letterCoords = [];
            let wordLength = word.length;
            let x1 = getRndInteger(0, width - 1);
            let y1 = getRndInteger(0, height - 1);
            let lettersPlaced = 0;
            for (let letterIndex = 0; letterIndex < wordLength; letterIndex++) {
                const letter = word[letterIndex];
                if (!placeLetter(direction, x1, y1, letterIndex, grid, letterCoords, letter, answerKey)) {
                    break;
                }
                lettersPlaced += 1;
            }
            if (wordLength === lettersPlaced)
                wordPlaced = true;
            if (wordPlaced === true) {
                for (let index = 0; index < letterCoords.length; index++) {
                    const element = letterCoords[index];
                    answerKey[element.x][element.y] =
                        grid[element.x][element.y];
                }
                wordData[wordIndex].coords = letterCoords;
            }
            if (wordPlaced === false) {
                for (let index = 0; index < letterCoords.length; index++) {
                    const element = letterCoords[index];
                    grid[element.x][element.y] = undefined;
                }
            }
            attempt += 1;
        }
        if (wordPlaced == false) {
            wordsNotPlaced.push(word);
        }
    }
    // Add filler characters
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let charAtCoord = grid[y][x] != undefined ? true : false; // Check to see if there is a character at these coords
            if (charAtCoord)
                continue; // Skip these coords because there's a character
            let randomLetter = LETTERS[Math.floor(Math.random() * LETTERS.length)];
            if (letterCase === "uppercase")
                randomLetter = randomLetter.toUpperCase();
            else if (letterCase === "random-case") {
                let roll = getRndInteger(0, 1);
                if (roll === 0)
                    randomLetter = randomLetter.toUpperCase();
            }
            grid[y][x] = randomLetter; // Get a random letter and place it
        }
    }
    params.wordData = wordData;
    params.grid = grid;
    params.key = answerKey;
    params.wordsNotPlaced = wordsNotPlaced;
    if (revealSections) {
        params = computeSectionDimensions(params);
        params = determineWordSections(params);
    }
    return params;
}
