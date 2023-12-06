"use strict"
const main = require("./utils");
const fs = require("fs");

function part1() {
    const input = fs.readFileSync("inputs/day6.txt", 'utf-8').split("\n");

    const races = input.map( (line) => line
        .split(":")[1]
        .split(" ")
        .filter( (char) =>  char !== "")
        .map(Number)
    );

    let result = 1;
    for(let i = 0; i < races[0].length; i++) {
        const time = races[0][i];
        const dist = races[1][i];

        let low = 1;
        let total = 0;
        while(low <= time-low) {
            total += Number(low*(time-low) > dist);
            low++;
        }
        result *= (2*total - Number(low-(time-low) == 2));
    }

   return(result);
}

function part2() {
    const input = fs.readFileSync("inputs/day6.txt", 'utf-8').split("\n");

    const [time, dist] = input
        .map( (str) => str.split(":")[1])
        .map( (str) => str.replace(/\s+/g, ""))
        .map(Number);

    let total = 0;
    let i = 1;
    while(i <= time-i) {
        total += Number(i*(time-i) > dist);
        i++;
    }

    return(2*total - Number(i-(time-i) == 2));
}

main(part1, part2)