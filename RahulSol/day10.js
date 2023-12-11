"use strict"
const main = require("./utils");
const fs = require("fs");

function part1() {
    const path = findPath();
    return(path.length / 2);
}

function part2() {
    const path = findPath();

    // Shoelace formula
    let area = 0; 
    for(let i = 0; i < path.length-1; i++) {
        area += (path[i][0]*path[i+1][1]) - (path[i+1][0]*path[i][1]);
    }

    area += (path[path.length-1][0]*path[0][1]) - (path[0][0]*path[path.length-1][1]);
    area /= 2;

    // Area = InteriorPoints + BoundaryPoints/2 - 1
    const interiorPoints = area - path.length/2 + 1; 
    return(interiorPoints); 
}



function findPath() {
    const input = fs.readFileSync("inputs/day10.txt", 'utf-8').split("\n");

    // find starting position "S"
    let start;
    for(let i = 0; i < input.length; i++) {
        let j = input[i].indexOf("S");
        if(j !== -1) {
            start = [i, j];
            break;
        }
    }

    // enum
    const d = {
        North: 1,
        East: 2,
        South: 3,
        West: 4
    }

    // go in a certain direction
    const nextCoords = (arr, dir) => {
        switch(dir) {
            case d.North:
                return([arr[0]-1, arr[1]]);
            case d.East:
                return([arr[0], arr[1]+1]);
            case d.South:
                return([arr[0]+1, arr[1]]);
            case d.West:
                return([arr[0], arr[1]-1]);
        }
    };

    // which direction to go next based on which direction the pipe was entered from
    // if you enter F going North, the next direction will be East 
    const dirMap = {
        "|": {
            [d.North]: d.North,
            [d.South]: d.South
        },
        "-": {
            [d.East]: d.East,
            [d.West]: d.West
        },
        "L": {
            [d.South]: d.East,
            [d.West]: d.North
        },
        "J": {
            [d.East]: d.North,
            [d.South]: d.West
        },
        "7": {
            [d.East]: d.South,
            [d.North]: d.West
        },
        "F": {
            [d.North]: d.East, 
            [d.West]: d.South
        },
    }

    // 
    const canGo = (current, dir) => {
        const currentChar = input[current[0]][current[1]]
        const [i, j] = nextCoords(current, dir);

        // out of bounds
        if(i < 0 || i > input.length-1 || j < 0 || j > input[0].length-1) {
            return(false);
        }

        const nextChar = input[i][j];

        // cycle completed 
        if(nextChar == "S") {
            return(["S", 0]);
        }

        // check if the next location is valid given the current one and the direction.
        // return coords of the next location and which direction to go from there
        // if invalid, return [0, 0] 
        switch(dir) {
            case d.North:
                if(!"S|JL".includes(currentChar)) {
                    return([0, 0]);
                }
    
                if("|7F".includes(nextChar)) {
                    return([[i,j], dirMap[nextChar][dir]]);
                }
                return [0, 0];
                
            case d.South:
                if(!"S|7F".includes(currentChar)) {
                    return([0, 0]);
                }
                
                if("|JL".includes(nextChar)) {
                    return([[i,j], dirMap[nextChar][dir]]);
                };
                return [0, 0];

            case d.East:
                if(!"S-LF".includes(currentChar)) {
                    return([0, 0]);
                }
    
                if("-7J".includes(nextChar)) {
                    return([[i,j], dirMap[nextChar][dir]]);
                }
                return [0, 0];
            
            case d.West:
                if(!"S-7J".includes(currentChar)) {
                    return([0, 0]);
                }
    
                if("-LF".includes(nextChar)) {
                    return([[i,j], dirMap[nextChar][dir]]);
                }
                return [0, 0];
            
            default:
                throw new Error("Invalid direction, " + dir);
        }
    }
    
    // search each path until a loop is found
    // input is formed s.t. there is only one **linear** path
    const dirs = [d.North, d.East, d.South, d.West];
    for(const dir of dirs) {
        let path = [];
        let current = start;
        let nextDir = dir;

        while(current) {
            path.push(current);
            [current, nextDir] = canGo(current, nextDir);
            if(current == "S") { // loop found
                return(path);
            }
        } 
    }
    throw new Error("No loop found");
}

main(part1, part2, false);