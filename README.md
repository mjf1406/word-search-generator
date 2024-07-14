# Word Search Generator

A package to generate a word search expressed as a 2D array.

## Installation

## Usage

See the below usage example.

```
// If an option is missing, its default value will be used.
const options = {
    fit: false,
    cols: 6,
    rows: 6,
    disabledDirections: ["NE", "NW", "SE", "SW"],
    words: ["tiger", "walrus", "monkey", "marmoset", "lemur"],
    case: "upper",
    sections: 4
};

// Create a new word search
const ws = new WordSearch(options)

```

## Options

The below are the options you can pass when creating a new word search.

| NAME               | TYPE         | DEFAULT | DESCRIPTION                                                                                                  |
| ------------------ | ------------ | ------- | ------------------------------------------------------------------------------------------------------------ |
| fit                | Boolean      | false   | Whether cols and rows should be automatically determined to ensure all words are able to be placed           |
| cols               | Integer      | "fit"   | Number of columns                                                                                            |
| rows               | Integer      | "fit"   | Number of rows                                                                                               |
| disabledDirections | Array.string | []      | Directions to disable (any of "N", "S", "E", "W", "NE", "NW", "SE" or "SW")                                  |
| words              | Array.string | []      | The words to insert into the word search. Unless cols or rows is set to "fit", some words may not be placed. |
| case               | String       | "upper" | The case of the letters (any one of "upper", "lower", "random")                                              |
| sections           | Integer      | 0       | The number of sections that the word search should be divided into (any one of 4, 9, 16)                     |
| maxRetries         | Integer      | 10      | The number of times the word search should retry if not all words were inserted                              |

## Properties and Methods

### ws.grid

Returns the word search as a 2D array

```

```

### ws.words

Returns the words that were inserted into the word search

```

```

### ws.failed

Returns the words that were not inserted into the word search

```

```

### ws.sections

Returns the sections and their coordinates

```

```
