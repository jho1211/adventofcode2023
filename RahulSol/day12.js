"use strict"
const main = require("./utils");
const fs = require("fs");

function part1() {
    const input = fs.readFileSync("inputs/day12.txt", 'utf-8')
        .split("\n")
        .map( (line) => line.split(" "))
        .map( (line) => [line[0], line[1].split(",").map(Number)]);

    const count = (config, record, ci, ri, currLength) => {

        if(ci == config.length) {
            if(ri == record.length && currLength == 0) {
                return(1);
            }
            else if(ri == record.length-1 && record[ri] == currLength) {
                return(1);
            }
            else {
                return(0);
            }
        }

        let t = 0;
        if(config[ci] !== "#") {
            if(currLength == 0) {
                t += count(config, record, ci+1, ri, 0);
            }
            if(currLength > 0 && ri < record.length && record[ri]==currLength) {
                t += count(config, record, ci+1, ri+1, 0);
            }
        }

        if(config[ci] !== ".") {
            t += count(config, record, ci+1, ri, currLength+1);
        }

        return(t);
    }

    let total = 0;
    for(const line of input) {
        total += count(line[0], line[1], 0, 0, 0);
    }

    return(total);
}

function part2() {
    const input = fs.readFileSync("inputs/day12.txt", 'utf-8')
        .split("\n")
        .map( (line) => line.split(" "))
        .map( (line) => [line[0], line[1].split(",").map(Number)])
        .map( (line) => [(line[0]+"?").repeat(5).slice(0, -1), Array(5).fill(line[1]).flat()]);

    let cache = new Map();
    const count = (config, record, ci, ri, currLength) => {

        const key = `${ci},${ri},${currLength}`;
        if(cache.has(key)) {
            return(cache.get(key));
        }

        if(ci == config.length) {
            if(ri == record.length && currLength == 0) {
                return(1);
            }
            else if(ri == record.length-1 && record[ri] == currLength) {
                return(1);
            }
            else {
                return(0);
            }
        }

        let t = 0;
        if(config[ci] !== "#") {
            if(currLength == 0) {
                t += count(config, record, ci+1, ri, 0);
            }
            if(currLength > 0 && ri < record.length && record[ri]==currLength) {
                t += count(config, record, ci+1, ri+1, 0);
            }
        }

        if(config[ci] !== ".") {
            t += count(config, record, ci+1, ri, currLength+1);
        }

        cache.set(key, t);
        return(t);
    }

    let total = 0;
    for(const line of input) {
        total += count(line[0], line[1], 0, 0, 0);
        cache.clear();
    }

    return(total);    

}
main(part1, part2)