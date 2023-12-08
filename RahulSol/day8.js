"use strict"
const main = require("./utils");
const fs = require("fs");

function part1() {
    const input = fs.readFileSync("inputs/day8.txt", 'utf-8').split("\n\n");

    const instructions = input[0];

    const map = new Map();
    for(const mapping of input[1].split("\n")) {
        map.set(mapping.slice(0, 3), [mapping.slice(7,10), mapping.slice(12,15)]);
    }
    
    let count = 0;
    let current = "AAA";
    while(current != "ZZZ") {
        const index = (instructions[count%instructions.length] == "L") ? 0 : 1;
        current = map.get(current)[index];
        count++;
    }   
    
    return(count);
}

function part2() {
    const input = fs.readFileSync("inputs/day8.txt", 'utf-8').split("\n\n");

    const instructions = input[0];

    const map = new Map();
    const toProcess = [];
    for(const mapping of input[1].split("\n")) {
        const [k, v1, v2] = [mapping.slice(0, 3), mapping.slice(7,10), mapping.slice(12,15)];
        map.set(k, [v1, v2]);

        if(k.endsWith("A")) {
            toProcess.push(k);
        }
    }

    const ts = [];
    for(let node of toProcess) {
        let count = 0;

        // Input is specially formed s.t. each node hits target periodically every t steps 
        while(!node.endsWith("Z")) {
            const index = (instructions[count%instructions.length] == "L") ? 0 : 1;
            node = map.get(node)[index];
            count++;
        }

        ts.push(count);
    }

    const lcm = (num1, num2) => {
        const gcd = (m, n) => n==0 ? m : gcd(n, m%n);
        return num1*num2 / gcd(num1, num2);
    }

    return(ts.reduce((a, b) => lcm(a,b)));
}

main(part1, part2)