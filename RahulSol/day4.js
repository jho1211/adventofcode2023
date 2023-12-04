"use strict"
const main = require("./utils");
const fs = require("fs");

function part1() {
    const input = fs.readFileSync("inputs/day4.txt", 'utf-8').split("\n");
    let total = 0;

    for(let i = 0; i < input.length; i++) {
        let score = 0;
        const card = input[i]
            .split(":")[1]
            .split("|")
            .map( (str) => str.split(" "))
            .map( (arr) => arr.filter( str => str !== ""));

        const s = new Set();
        card[0].forEach( (number) => s.add(Number(number)));
        
        card[1].forEach( (number) => {
            if(s.has(Number(number))) {
                score = (score > 0) ? score*2 : 1
            }
        });

        total += score;
    }
    return total;
}

function part2() {
    const input = fs.readFileSync("inputs/day4.txt", 'utf-8').split("\n");
    const copies = new Array(input.length).fill(1)

    for(let i = 0; i < input.length; i++) {
        const card = input[i]
            .split(":")[1]
            .split("|")
            .map( (str) => str.split(" "))
            .map( (arr) => arr.filter( str => str !== ""));

        const s = new Set();
        card[0].forEach( (number) => s.add(Number(number)));

        let matches = 0;
        card[1].forEach( (number) => matches += Number(s.has(Number(number))));

        for(let j = i+1; j < i+1+matches; j++) {
            copies[j] += copies[i]
        }
    } 
    
    return copies.reduce((a, b) => a + b, 0);
}

main(part1, part2);