"use strict"
const { isUtf8 } = require("buffer");
const main = require("./utils");
const fs = require("fs");

function part1() {
    const input = fs.readFileSync("inputs/day13.txt", 'utf-8')
        .split("\n\n")
        .map( grid => grid.split("\n"));

    const checkMirror = (grid) => {
        nextRow: for(let i = 1; i < grid.length; i++) {
            for(let j = 1; j < i+1; j++) {
                const above = i-j;
                const below = i+j-1;

                if(above < 0 || below > grid.length-1) {
                    break;
                }

                if(grid[above] !== grid[below]) {
                    continue nextRow;
                }
            }
            return(i);
        }
        return(0);
    }

    const transpose = (grid) => {
        return grid[0]
            .split('')
            .map( (_, i) => grid.map( (row) => row[i]))
            .map( (row) => row.join(''));
    }

    let result = 0;
    for(const grid of input) {
        result += checkMirror(grid)*100;
        result += checkMirror(transpose(grid));
    }

    return(result);
}

function part2() {
    const input = fs.readFileSync("inputs/day13.txt", 'utf-8')
        .split("\n\n")
        .map( grid => grid.split("\n"));

    const diffChars = (str1, str2) => {
        let diff = 0;
        for(let i = 0; i < str1.length; i++) {
            if(str1[i] !== str2[i]) {
                diff++;
            }
        }
        return(diff);
    }

    const checkMirror = (grid) => {
        nextRow: for(let i = 1; i < grid.length; i++) {
            let diff = 0;
            for(let j = 1; j < i+1; j++) {
                const above = i-j;
                const below = i+j-1;

                if(above < 0 || below > grid.length-1) {
                    break;
                }

                diff += diffChars(grid[above], grid[below]);

                if(diff > 1) {
                    continue nextRow;
                }
            }
            if(diff == 1) {
                return(i)
            }
        }
        return(0);
    }

    const transpose = (grid) => {
        return grid[0]
            .split('')
            .map( (_, i) => grid.map( (row) => row[i]))
            .map( (row) => row.join(''))
    }

    let result = 0;
    for(const grid of input) {
        result += checkMirror(grid) * 100;
        result += checkMirror(transpose(grid));
    }

    return(result);
}

main(part1, part2)