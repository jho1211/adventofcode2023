"use strict"
const main = require("./utils");
const fs = require("fs");

function part1() {
    const input = fs.readFileSync("inputs/day19.txt", 'utf-8')
        .split("\n\n")
        .map( str => str.split("\n"));

    const ops = {">": (a, b) => a > b, "<": (a, b) => a < b};   

    const workflows = new Map();
    for(const line of input[0]) {
        const [key, conds] = line
            .slice(0, -1)
            .split("{")
            .map( str => str.split(","));
    
        const flow = [];
        for(let i = 0; i < conds.length-1; i++) {
            const [cond, to] = conds[i].split(":");
            flow.push([cond[0], cond[1], Number(cond.slice(2)), to]);
        }
        
        workflows.set(key[0], [flow, conds[conds.length-1]]);
    };

    const process = (item, key) => {
        if(key == "A") {
            return true;
        }
        if(key == "R") {
            return false;
        }

        const [flow, def] = workflows.get(key);
        for(const [ltr, op, num, to] of flow) {
            if(ops[op](item[ltr], num)) {
                return process(item, to);
            }
        }
        return process(item, def);
    }

    let total = 0;
    for(const part of input[1]) {
        const [_, x, m, a, s] = part.match(/\{x=(\d+),m=(\d+),a=(\d+),s=(\d+)\}/).map(Number);
        const item = {"x": x, "m": m, "a": a, "s": s};

        if(process(item, "in")) {
            total += x+m+a+s;
        }
    }
    
    return(total);
}

function part2() {
    const input = fs.readFileSync("inputs/day19.txt", 'utf-8')
        .split("\n\n")
        .map( str => str.split("\n"))[0];

    const workflows = new Map();
    for(const line of input) {
        const [key, conds] = line
            .slice(0, -1)
            .split("{")
            .map( str => str.split(","));
    
        const flow = [];
        for(let i = 0; i < conds.length-1; i++) {
            const [cond, to] = conds[i].split(":");
            flow.push([cond[0], cond[1], Number(cond.slice(2)), to]);
        }
        
        workflows.set(key[0], [flow, conds[conds.length-1]]);
    };

    const process = (itemRanges, key) => {
        if(key == "A") {
            return Object.values(itemRanges).reduce( (a, b) => a *= b[1]-b[0]+1, 1);
        }
        if(key == "R") {
            return 0;
        }

        let total = 0;
        const [flow, def] = workflows.get(key);
        for(const [ltr, op, num, to] of flow) {
            let th, fh;
            const [low, high] = itemRanges[ltr];
            if(op == "<") {
                th = [low, Math.min(num-1, high)];
                fh = [Math.max(num, low), high];
            }
            else {
                th = [Math.max(num+1, low), high];
                fh = [low, Math.min(num, high)];   
            }
            
            if(th[0] <= th[1]) {
                const copy = {...itemRanges};
                copy[ltr] = th;
                total += process(copy, to);
            }
            if(fh[0] <= fh[1]) {
                itemRanges = {...itemRanges};
                itemRanges[ltr] = fh;
            }
            else {
                return(total);
            }
        }
        total += process(itemRanges, def);
        return total;
    }

    const todo = {"x": [1, 4000], "m": [1, 4000], "a": [1, 4000], "s": [1, 4000]};
    return(process(todo, "in"));
}

main(part1, part2);
