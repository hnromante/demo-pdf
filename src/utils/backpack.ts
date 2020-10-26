//A solution is an array of 0s or 1s, take or don't take the item.
//Find ALL possible solutions to the items distribution given their height

//6x8 CANVAS
//[0, 0, 0, 0, 0, 0]
//[0, 0, 0, 0, 0, 0]
//[0, 0, 0, 0, 0, 0]
//[0, 0, 0, 0, 0, 0]
//[0, 0, 0, 0, 0, 0]
//[0, 0, 0, 0, 0, 0]
//[0, 0, 0, 0, 0, 0]
//[0, 0, 0, 0, 0, 0]
const capacity = 8;
const items = ['a', 'b', 'c', 'd'];
const heightValues = [2, 4, 3, 1];

backpackCanvas(capacity, items, heightValues)

function backpackCanvas(capacity: number, items: any[], heightValues: number[], { step: number} = {step: 1}){
    const solutions = []; //[[a, b,c ,d], [d,b,a,c], ...]
    let freeSpace = capacity;
    for (let x = 0; x<= heightValues.length; x = x+1) {
        if (heightValues[x] <= freeSpace) {
            solutions[x] = items[x]
            freeSpace-=heightValues[x]
            console.log({
                x,
                solutionX: items[x],
                freeSpace
            })
        }
    }
}
//https://pdf.sciencedirectassets.com/271538/1-s2.0-S0304397513X00386/1-s2.0-S030439751200744X/main.pdf?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIQCsKFF0mUL3lkF04unL%2FQvPDNPot%2BsF1ivvanOAr7gJ4AIgBNXEvvs%2BWNXAkIdyJPB3ygxTgHXgzGWMiUrvKhBoO7UqvQMI7f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARADGgwwNTkwMDM1NDY4NjUiDGxriilX81M8ujqPECqRA4A8By0T5XeUNcUc8ZP3kI7%2FfpHuRI1zuRT0H8FL71iyucPdI5qx52EmrGMVzCgwdrgc0%2Bbh0dbpwwnkPG5FSZIgHetTUMSl9CFR4nahS2PeG%2BlI6NKRBfDfjnq%2Fim7M1ChyW99I3TwZz7pqFwKL4X7GPvpop6jW4Do2IJHMOUn6we6gdls1ZU9uvuY1nKTSh4E1BmAP47IzVSjatAG3irAgt9IYNq5wC0SOrnPhhZ2NifpwCihdDVikkM2znuIazZlptD9YVWLyqVU5bIQGluyxGoQuX5rBkFpB7JdGHTcr3VU9MNTtAsanhc2Vda49%2BYlC5wgCUzudWksm4u7nSzg7ZYCf2pq%2BmAEZ7zc7gevkhMh9iW%2Bg80kkbrD3svyWGxNUXqiNWc87KIWYpE7yNRQjdbmNDllNLQY0R9Ul%2F3jlxdN24NQXHrK%2BdWDlmugH4cGaimhf2FjH664hrxBxix24oXt329Era3%2FMdiLlJAON14beZkzbUp4I0hMmEU9gB8f2vTQOEWMhTxqCbyC6mnL8MJrz2vwFOusBTXviPggVFzppzYceCzDXTn%2BbHsTpYlPX8NbX5Y6Dv4aAtIz5TUvIXYpifQ1tjPVkEO4MB9STbltvpOGW6Za%2F6LTsmrcc3bfHVAw7K3u2WKDurZZ00WzIugPp8qQ8lzIHYXDU57Y%2Fth6IuVBuqqQk3f8aihxsReBS24qzD8zVnyqZfS5P62bqwW2lK0Qdri%2FwsXSpCSzPiMoqjB8j3PDYsIajUyeIva3uqewciOC25How%2BUTKFa%2B3sD8si6UK%2FtT5y%2FtUn%2FjpXx4EMg%2Bs%2FLhVg%2FJZzSLjuRoPgH4wD9xL8Yl3ACdatEyvDy0j3w%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20201026T130627Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAQ3PHCVTY6TO4FCLV%2F20201026%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=35a82b28868850bb6b05f1965759b55c7cf2090959c812d6bf0590cf9644c4b7&hash=9154dfa806236e2da3d77cd08a9f1b8bc41730e3e95fdb2ef83d23a19a6f5c5e&host=68042c943591013ac2b2430a89b270f6af2c76d8dfd086a07176afe7c76c2c61&pii=S030439751200744X&tid=spdf-5d6266b8-4aa1-4252-8273-8c023d214ab7&sid=c9f4f3975b4125456138e75704ffdfef7503gxrqa&type=client

const DEFAULT_ITEMS = [{w: 1, h: 1}, {w: 3, h: 4}, {w: 2, h: 3}, {w: 1, h: 3}, {w: 5, h: 5}]
const DEFAULT_CANVAS_DIMENTIONS = {x: 8, y: 12}
function backPack2D(canvasDimentions = DEFAULT_CANVAS_DIMENTIONS, items = DEFAULT_ITEMS, ) {

}