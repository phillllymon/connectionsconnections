export type Item = {
    id: number,
    label: String,
    selected: Boolean
}

export type Group = {
    color: String,
    category: String,
    items: Item[],
    finished: Boolean
};

export type GameState = {
    groups: Group[],
    guessed: String[],
    remainingGuesses: number,
    looseItemsByRow: Item[][]
};