"use strict"
const main = require("./utils");
const fs = require("fs");

function part1() {
    const input = fs.readFileSync("inputs/day18.txt", 'utf-8')
        .split("\n")
        .map( line => line.split(" ").slice(0, -1))
        .map ( arr => [arr[0], Number(arr[1])]);

    const dirs = {
        'R': [0, 1],
        'L': [0, -1],
        'U': [-1, 0],
        'D': [1, 0]
    };

    let boundaryPoints = 0;
    const vertices = [[0,0]];

    for(const [dir, num] of input) {
        const [x, y] = vertices[vertices.length-1];
        const [dx, dy] = dirs[dir];

        vertices.push([x+dx*num, y+dy*num]);
        boundaryPoints += num;
    }

    // Area = InteriorPoints + BoundaryPoints/2 - 1
    let area = 0; 
    for(let i = 0; i < vertices.length-1; i++) {
        area += (vertices[i][0]*vertices[i+1][1]) - (vertices[i+1][0]*vertices[i][1]);
    }
    area = Math.abs(area) / 2;

    const interiorPoints = area - boundaryPoints/2 + 1;

    return(interiorPoints + boundaryPoints);
}

function part2() {
    const input = fs.readFileSync("inputs/day18.txt", 'utf-8')
        .split("\n")
        .map( line => line.split(" ").slice(-1))
        .map( arr => [arr[0].substring(2, 7), Number(arr[0][arr[0].length-2])]);
    
    const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];

    let boundaryPoints = 0;
    const vertices = [[0,0]];

    for(const [hnum, dir] of input) {
        const num = parseInt(hnum, 16);

        const [x, y] = vertices[vertices.length-1];
        const [dx, dy] = dirs[dir];
        
        vertices.push([x+dx*num, y+dy*num]);
        boundaryPoints += num;
    }

    // Area = InteriorPoints + BoundaryPoints/2 - 1
    let area = 0; 
    for(let i = 0; i < vertices.length-1; i++) {
        area += (vertices[i][0]*vertices[i+1][1]) - (vertices[i+1][0]*vertices[i][1]);
    }
    area = Math.abs(area) / 2;

    const interiorPoints = area - boundaryPoints/2 + 1;

    return(interiorPoints + boundaryPoints);
}

main(part1, part2);