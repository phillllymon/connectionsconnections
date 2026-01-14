import type { RawPuzzle, GameState } from "./types";

export function createGameStateFromRawPuzzle(rawPuzzle: RawPuzzle): GameState {
    return {
        groups: [
            { color: "yellow", category: rawPuzzle.data[0][0], items: rawPuzzle.data[0][1].map((str, i) => {
                return {
                    id: Math.random(),
                    label: str,
                    selected: false
                };
            }), finished: false},
            { color: "green", category: rawPuzzle.data[1][0], items: rawPuzzle.data[1][1].map((str, i) => {
                return {
                    id: Math.random(),
                    label: str,
                    selected: false
                };
            }), finished: false},
            { color: "blue", category: rawPuzzle.data[2][0], items: rawPuzzle.data[2][1].map((str, i) => {
                return {
                    id: Math.random(),
                    label: str,
                    selected: false
                };
            }), finished: false},
            { color: "purple", category: rawPuzzle.data[3][0], items: rawPuzzle.data[3][1].map((str, i) => {
                return {
                    id: Math.random(),
                    label: str,
                    selected: false
                };
            }), finished: false}
        ],
        guessed: [],
        remainingGuesses: 4,
        looseItemsByRow: [],
        info: {
            id: rawPuzzle.id,
            title: rawPuzzle.title,
            author: rawPuzzle.author,
            wins: rawPuzzle.wins,
            losses: rawPuzzle.losses,
            rating: rawPuzzle.rating
        }
    };
}

export function toPercent(fraction: number): number {
    const hundredTimes = 100.00 * fraction;
    const truncated = Math.floor(hundredTimes);
    return truncated;
}

export function shuffleInPlace(arr: any[]) {
    arr.sort(() => {
        if (Math.random() > 0.5) {
            return 1;
        } else {
            return -1;
        }
    });
}

export function arrDeleteVal(arr: any[], val: any): any[] {
    const answer: any[] = [];
    arr.forEach((ele) => {
        if (ele !== val) {
            answer.push(ele);
        }
    });
    return answer;
}