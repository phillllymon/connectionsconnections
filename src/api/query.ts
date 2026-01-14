import type {
    PuzzleData,
    RawPuzzle
} from "../types";

export function addPuzzle(puzzle: PuzzleData, author: string, title: string): Promise<RawPuzzle> {
    return new Promise((resolve) => {
        fetch("https://connectionsapi-l8i1.vercel.app/api/addPuzzle", {
            method: "POST",
            body: JSON.stringify({
                newPuzzle: puzzle,
                author: author,
                title: title
            })
        }).then((res) => {
            res.json().then((r) => {
                const data = JSON.parse(r.data[0].puzzle);
                const title = r.data[0].title.length > 0 ? r.data[0].title : `Puzzle ${r.data[0].id}`;
                const author = r.data[0].author;
                const rating = r.data[0].rating.length > 0 ? JSON.parse(r.data[0].rating)["rating"] : 0;
                const wins = r.data[0].wins;
                const losses = r.data[0].loses;
                const id = r.data[0].id;
                resolve({
                    id: id,
                    data: data,
                    title: title,
                    author: author,
                    rating: rating,
                    wins: wins,
                    losses: losses
                });
            });
        });
    });
}

export function getRandomPuzzle(): Promise<RawPuzzle> {
    return new Promise((resolve) => {
        fetch("https://connectionsapi-l8i1.vercel.app/api/getRandomPuzzle").then((res) => {
            res.json().then((r) => {
                const data = JSON.parse(r.puzzle);
                const title = r.title.length > 0 ? r.title : `Puzzle ${r.id}`;
                const author = r.author;
                const rating = r.rating.length > 0 ? JSON.parse(r.rating)["rating"] : 0;
                const wins = r.wins;
                const losses = r.loses;
                const id = r.id;
                resolve({
                    id: id,
                    data: data,
                    title: title,
                    author: author,
                    rating: rating,
                    wins: wins,
                    losses: losses
                });
            });
        });
    });
}

export function getPuzzleById(puzzleId: number): Promise<RawPuzzle> {
    return new Promise((resolve) => {
        fetch("https://connectionsapi-l8i1.vercel.app/api/getPuzzleById", {
            method: "POST",
            body: JSON.stringify({
                id: puzzleId
            })
        }).then((res) => {
            res.json().then((r) => {
                const data = JSON.parse(r.puzzle.puzzle);
                const title = r.puzzle.title.length > 0 ? r.puzzle.title : `Puzzle ${r.puzzle.id}`;
                const author = r.puzzle.author;
                const rating = r.puzzle.rating.length > 0 ? JSON.parse(r.puzzle.rating)["rating"] : 0;
                const wins = r.puzzle.wins;
                const losses = r.puzzle.loses;
                const id = r.puzzle.id;
                resolve({
                    id: id,
                    data: data,
                    title: title,
                    author: author,
                    rating: rating,
                    wins: wins,
                    losses: losses
                });
            });
        });
    });
}

export function ratePuzzle(puzzleId: number, rating: number): void {
    fetch("https://connectionsapi-l8i1.vercel.app/api/ratePuzzle", {
        method: "POST",
        body: JSON.stringify({
            puzzleId: puzzleId,
            newRating: rating
        })
    });
}

export function reportWin(puzzleId: number): void {
    fetch("https://connectionsapi-l8i1.vercel.app/api/reportWin", {
        method: "POST",
        body: JSON.stringify({
            puzzleId: puzzleId
        })
    });
}

export function reportLoss(puzzleId: number): void {
    fetch("https://connectionsapi-l8i1.vercel.app/api/reportLoss", {
        method: "POST",
        body: JSON.stringify({
            puzzleId: puzzleId
        })
    });
}


    // fetch("http://connectionsapi-l8i1.vercel.app/api/getPuzzlesByAuthor", {
    //     method: "POST",
    //     body: JSON.stringify({
    //         author: "Parker"
    //     })
    // }).then((res) => {
    //     res.json().then((r) => {
    //         console.log(r);
    //     });
    // });


    // fetch("http://connectionsapi-l8i1.vercel.app/api/getPuzzlesByRating", {
    //     method: "POST",
    //     body: JSON.stringify({
    //         numRequested: 2,
    //         asc: false,
    //         excludeIds: [],
    //         numToSkip: 1
    //     })
    // }).then((res) => {
    //     res.json().then((r) => {
    //         console.log(r);
    //     });
    // });