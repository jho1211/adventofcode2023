"use strict"
const main = require("./utils");
const fs = require("fs");

function part1() {
    const input = fs.readFileSync("inputs/day14.txt", 'utf-8')
        .split('\n')
        .map((line) => line.split(""));

    // tilt north
    for(let i = 0; i < input.length; i++) {
        for(let j = 0; j < input[0].length; j++) {
            let shift = 0;
            if(input[i][j] == 'O') {
                while(i-shift-1 >= 0 && input[i-shift-1][j] === '.') {
                    shift += 1;
                }
                if(shift > 0) {
                    input[i-shift][j] = 'O';
                    input[i][j] = '.';
                }
            }
        }
    }
    
    return input.reduce( (a, line, i) => a += line.filter((c) => c === 'O').length*(input.length-i), 0);
}

function part2() {
    const input = fs.readFileSync("inputs/day14.txt", 'utf-8')
        .split('\n')
        .map((line) => line.split(""));

    const stringify = (arr2D) => {
        return arr2D
            .map((chars) => chars.join(''))
            .join("\n");
    }

    const tiltCycle = (grid) => {
        // tilt North
        for(let i = 0; i < grid.length; i++) {
            for(let j = 0; j < grid[0].length; j++) {
                let shift = 0;
                if(grid[i][j] == 'O') {
                    while(i-shift-1 >= 0 && grid[i-shift-1][j] === '.') {
                        shift += 1;
                    }
                    if(shift > 0) {
                        grid[i-shift][j] = 'O';
                        grid[i][j] = '.';
                    }
                }
            }
        }

        // tilt West
        for(let i = 0; i < grid.length; i++) {
            for(let j = 0; j < grid[0].length; j++) {
                let shift = 0;
                if(grid[i][j] == 'O') {
                    while(j-shift-1 >= 0 && grid[i][j-shift-1] === '.') {
                        shift += 1;
                    }
                    if(shift > 0) {
                        grid[i][j-shift] = 'O';
                        grid[i][j] = '.';
                    }
                }
            }
        }

        //tilt South
        for(let i = grid.length-1; i >= 0; i--) {
            for(let j = grid[0].length-1; j >= 0; j--) {
                let shift = 0;
                if(grid[i][j] == 'O') {
                    while(i+shift+1 < grid.length && grid[i+shift+1][j] === '.') {
                        shift += 1;
                    }
                    if(shift > 0) {
                        grid[i+shift][j] = 'O';
                        grid[i][j] = '.';
                    }
                }
            }
        }

        // tilt East
        for(let i = grid.length-1; i >= 0; i--) {
            for(let j = grid[0].length-1; j >= 0; j--) {
                let shift = 0;
                if(grid[i][j] == 'O') {
                    while(j+shift+1 < grid.length && grid[i][j+shift+1] === '.') {
                        shift += 1;
                    }
                    if(shift > 0) {
                        grid[i][j+shift] = 'O';
                        grid[i][j] = '.';
                    }
                }
            }
        }
    }

    const map = new Map();
    let [cycleNum, cycle] = [0, []];

    while(cycleNum < 1e9) {
        tiltCycle(input);
        cycleNum++;
        const layout = stringify(input);
        
        if(map.has(layout)) {
            cycle.push(map.get(layout), cycleNum);
            break;
        }
        else {
            map.set(layout, cycleNum);
        }
    }
    
    if(cycle.length !== 0) {
        const remaining = (1e9-cycle[0]) % (cycle[1]-cycle[0]); 
        for(let i = 0; i < remaining; i++) {
            tiltCycle(input);
        }
    }
    
    return input.reduce( (a, line, i) => a += line.filter((c) => c === 'O').length*(input.length-i), 0);
}

main(part1, part2);
