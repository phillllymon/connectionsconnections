const { addPuzzle } = require("./src/api/query.ts");

const newPuzzle = [
    ["Walter Ecklan isms", ["buzz off", "everybody's saying that", "no I walked", "did it on purpose"]],
    ["Ryan George isms", ["tight", "super easy", "oh woops", "oh, my god"]],
    ["Bush isms", ["misunderestimated", "mission accomplished", "fool me twice", "soil of a friend"]],
    ["Sean Connery isms", ["bulletsh", "pushy", "shit here", "shtate to shtate"]],
];

const author = "Parker";
const title = "screen time";

addPuzzle(newPuzzle, author, title).then((res) => {
    console.log(res);
});