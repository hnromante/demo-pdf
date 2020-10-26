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

const DEFAULT_ITEMS = [{w: 1, h: 1}, {w: 3, h: 4}, {w: 2, h: 3}, {w: 1, h: 3}, {w: 5, h: 5}]
const DEFAULT_CANVAS_DIMENTIONS = {x: 8, y: 12}
function backPack2D(canvasDimentions = DEFAULT_CANVAS_DIMENTIONS, items = DEFAULT_ITEMS, ) {

}