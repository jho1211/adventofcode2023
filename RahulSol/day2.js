"use strict"
const fs = require("fs");
const main = require("./utils.js");


function part1() {
    const input = fs.readFileSync("inputs/day2.txt", 'utf-8').split("\n");
    const RED = 12;
    const GREEN = 13;
    const BLUE = 14;

    let sum = 0;
    nextGame: for(var id = 0; id < input.length; id++) {
        const cubes = input[id]
            .split(":")[1]
            .split(";")
            .map( str => str.split(","))
            .join(",")
            .split(",");

        for(const cube of cubes) {
            const num = Number(cube.split(" ")[1])
            const impossible = 
                (cube.endsWith("red") && num > RED) ||
                (cube.endsWith("green") && num > GREEN) ||
                (cube.endsWith("blue") && num > BLUE)

            if(impossible) {
                continue nextGame
            }
        }
        sum += id+1;
    }  
    return sum;      
}


function part2() {
    const input = fs.readFileSync("inputs/day2.txt", 'utf-8').split("\n");
    
    let sum = 0;
    for(const game of input) {
        const cubes = game
                .split(":")[1]
                .split(";")
                .map( str => str.split(","))
                .join(",")
                .split(",");
        
        var {r, g, b} = {r: 1, g: 1, b: 1};

        for(const cube of cubes) {
            const num = Number(cube.split(" ")[1]);
            if(cube.endsWith("red")) {
                r = Math.max(r, num);
            }
            if(cube.endsWith("green")) {
                g = Math.max(g, num);
            }
            if(cube.endsWith("blue")) {
                b = Math.max(b, num);
            }
        }

        sum += r*g*b;
    }

    return sum;
}


main(part1, part2)