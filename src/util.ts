export function shuffleInPlace(arr: any[]) {
    arr.sort(() => {
        if (Math.random() > 0.5) {
            return 1;
        } else {
            return -1;
        }
    });
}