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