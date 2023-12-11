"use strict"
const main = require("./utils");
const fs = require("fs");

function part1() {
    const input = fs.readFileSync("inputs/day11.txt", 'utf-8').split("\n");

    const stars = [];
    const emptyCols = new Array(input.length).fill(true);
    const emptyRows = new Array(input[0].length).fill(true);

    for(let i = 0; i < input.length; i++) {
        for(let j = 0; j < input[0].length; j++) {
            if(input[i][j] == "#") {
                stars.push([i,j]);
                emptyCols[i] = false;
                emptyRows[j] = false;
            }
        }
    }

    const adjustedStars = stars.map( ([x,y]) => {
        x += emptyCols.slice(0,x).filter(Boolean).length;
        y += emptyRows.slice(0,y).filter(Boolean).length;

        return [x, y];
    })

    let total = 0;
    for(let i = 0; i < adjustedStars.length; i++) {
        for(let j = i+1; j < adjustedStars.length; j++) {
            const [x1, y1] = adjustedStars[i];
            const [x2, y2] = adjustedStars[j];

            total += Math.abs(x1-x2) + Math.abs(y1-y2);
        }
    }
    return(total);
}

function part2() {
    const input = fs.readFileSync("inputs/day11.txt", 'utf-8').split("\n");

    const stars = [];
    const emptyCols = new Array(input.length).fill(true);
    const emptyRows = new Array(input[0].length).fill(true);

    for(let i = 0; i < input.length; i++) {
        for(let j = 0; j < input[0].length; j++) {
            if(input[i][j] == "#") {
                stars.push([i,j]);
                emptyCols[i] = false;
                emptyRows[j] = false;
            }
        }
    }

    const adjustedStars = stars.map( ([x,y]) => {
        x += (1E6 -1) * emptyCols.slice(0,x).filter(Boolean).length;
        y += (1E6 -1) * emptyRows.slice(0,y).filter(Boolean).length;

        return [x, y];
    })

    let total = 0;
    for(let i = 0; i < adjustedStars.length; i++) {
        for(let j = i+1; j < adjustedStars.length; j++) {
            const [x1, y1] = adjustedStars[i];
            const [x2, y2] = adjustedStars[j];

            total += Math.abs(x1-x2) + Math.abs(y1-y2);
        }
    }
    return(total);
}

main(part1, part2);