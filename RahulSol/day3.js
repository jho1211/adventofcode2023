"use strict"
const main = require("./utils");
const fs = require("fs");

function part1() {
    const input = fs.readFileSync("inputs/day3.txt", 'utf-8').split("\n");
    
    const checkForSymbol = (line, start, end) => {
        const re = /[^0-9.]/;
        const inBounds = (i, j) => (i >= 0 && i < input.length && j >= 0 && j < input[0].length)

        // check above and below
        for(let i = line - 1; i <= line + 1; i += 2) {
            for(let j = start-1; j <= end+1; j++) {
                if(inBounds(i,j) && re.test(input[i][j])) {
                    return(true)
                }       
            }
        }

        // check left and right
        if(start-1 >= 0 && re.test(input[line][start-1])) {
            return(true)
        }
        if(end+1 < input[0].length && re.test(input[line][end+1])) {
            return(true)
        }

        return(false);
    }

    let sum = 0;
    const re = /[0-9]+/g;
    for(let line = 0; line < input.length; line++) {        
        let match;

        while((match = re.exec(input[line])) != null) {
            const start = match.index;
            const end = start + match[0].length -1

            if(checkForSymbol(line, start, end)) {
                sum += Number(match[0]);
            };
        }
    }
    return sum;
}

function part2() {
    const input = fs.readFileSync("inputs/day3.txt", 'utf-8').split("\n");
    const re = /[0-9]+/g;
    let sum = 0;

    const map = new Map();
    const updateMap = (key, value) => {
        if(map.has(key)) {
            map.get(key).push(value);
        } else {
            map.set(key, [value]);
        }
    }

    const checkForGear = (line, start, end, number) => {
        const re = /\*/g;
        const inBounds = (i, j) => (i >= 0 && i < input.length && j >= 0 && j < input[0].length)

        // check above and below
        for(let i = line - 1; i <= line + 1; i += 2) {
            for(let j = start-1; j <= end+1; j++) {
                if(inBounds(i,j) && re.test(input[i][j])) {
                    updateMap(`${i},${j}`, number);
                }       
            }
        }

        // check left and right
        if(start-1 >= 0 && re.test(input[line][start-1])) {
            updateMap(`${line},${start-1}`, number);
        }
        if(end+1 < input[0].length && re.test(input[line][end+1])) {
            updateMap(`${line},${end+1}`, number);
        }
    }

    for(let line = 0; line < input.length; line++) {        
        let match;
        while((match = re.exec(input[line])) != null) {
            const start = match.index;
            const end = start + match[0].length -1
            checkForGear(line, start, end, Number(match[0])); 
        }
    }
    
    for(const numbers of map.values()) {
        if(numbers.length == 2) {
            sum += numbers[0]*numbers[1];
        }
    }
    return sum;
}

main(part1, part2);