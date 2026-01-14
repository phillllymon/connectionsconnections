export type Item = {
    id: number,
    label: string,
    selected: boolean
}

export type Group = {
    color: string,
    category: string,
    items: Item[],
    finished: boolean
};

export type GameState = {
    groups: Group[],
    guessed: string[],
    remainingGuesses: number,
    looseItemsByRow: Item[][],
    info: {
        id: number,
        title: string,
        author: string,
        wins: number,
        losses: number,
        rating: number
    }
};

export type PuzzleData = [string, string[]][];

export type RawPuzzle = {
    id: number,
    data: PuzzleData,
    title: string,
    author: string,
    rating: number,
    wins: number,
    losses: number
};