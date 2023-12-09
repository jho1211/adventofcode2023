"use strict"
const main = require("./utils");
const fs = require("fs");

function part1() {
    const input = fs.readFileSync("inputs/day9.txt", 'utf-8')
        .split("\n")
        .map( (str) => str = str.split(" "))
        .map( (arr) => arr.map(Number));

    const process = (arr) => {
        if(arr.every((x) => x == 0)) {
            return 0;
        }
        else if(arr.length > 1) {
            const diffs = [];
            const last = arr.length -1;
            for(let i = 0; i < last; i++) {
                diffs.push(arr[i+1]-arr[i]);
            }

            return(arr[last] + process(diffs));
        }
        else {
            throw new Error("Bad input");
        }  
    };

    return input.reduce( (total, line) => total += process(line), 0);
}

function part2() {
    const input = fs.readFileSync("inputs/day9.txt", 'utf-8')
        .split("\n")
        .map( (str) => str = str.split(" "))
        .map( (arr) => arr.map(Number));

    const process = (arr) => {
        if(arr.every((x) => x == 0)) {
            return 0;
        }
        else if(arr.length > 1) {
            const diffs = [];
            const last = arr.length -1;
            for(let i = 0; i < last; i++) {
                diffs.push(arr[i+1]-arr[i]);
            }

            return(arr[0] - process(diffs)); //only difference from part1
        }
        else {
            throw new Error("Bad input");
        }  
    };
    
    return input.reduce( (total, line) => total += process(line), 0);
}

main(part1, part2);