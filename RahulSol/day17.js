"use strict"
const main = require("./utils");
const fs = require("fs");
const PriorityQueue = require("./pq");

function part1() {
    const input = fs.readFileSync("inputs/day17.txt", 'utf-8')
        .split("\n")
        .map (str => str.split('').map(Number));

    const pq = new PriorityQueue();
    const visited = new Set();
    const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];

    pq.push([0, [0, 0, 0, 0, 0]])
    while(!pq.isEmpty()) {
        const [l, [r, c, dr, dc, n]] = pq.pop();
        const key = `${r},${c},${dr},${dc},${n}`;

        if(r == input.length-1 && c == input[0].length-1) {
            return(l);
        }

        if(visited.has(key)) {
            continue;
        }

        visited.add(key);

        let nr, nc;
        if((n < 3) && dr+dc != 0) {
            nr = r+dr;
            nc = c+dc;
            if((nr >= 0 && nr < input.length && nc >= 0 && nc < input[0].length)) {
                pq.push([l+input[nr][nc], [nr, nc, dr, dc, n+1]]);
            }
        }
        
        for(const [ndr, ndc] of dirs) {
            if(!((ndr == dr && ndc == dc) || (ndr == -dr && ndc == -dc))) {
                nr = r+ndr;
                nc = c+ndc;
                if(!(nr < 0 || nr >= input.length || nc < 0 || nc >= input[0].length)) {
                    pq.push([l+input[nr][nc], [nr, nc, ndr, ndc, 1]]);
                }
            }
        }
    }
    throw new Error("No value found");
}

function part2() {
    const input = fs.readFileSync("inputs/day17.txt", 'utf-8')
        .split("\n")
        .map (str => str.split('').map(Number));

    const pq = new PriorityQueue();
    const visited = new Set();
    const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];

    pq.push([0, [0, 0, 0, 0, 0]])
    while(!pq.isEmpty()) {
        const [l, [r, c, dr, dc, n]] = pq.pop();
        const key = `${r},${c},${dr},${dc},${n}`;

        if(r == input.length-1 && c == input[0].length-1 && n >= 4) {
            return(l);
        }

        if(visited.has(key)) {
            continue;
        }

        visited.add(key);

        let nr, nc;
        if((n < 10) && dr+dc != 0) {
            nr = r+dr;
            nc = c+dc;
            if((nr >= 0 && nr < input.length && nc >= 0 && nc < input[0].length)) {
                pq.push([l+input[nr][nc], [nr, nc, dr, dc, n+1]]);
            }
        }

        if(n >= 4 || dr+dc == 0) {
            for(const [ndr, ndc] of dirs) {
                if(!((ndr == dr && ndc == dc) || (ndr == -dr && ndc == -dc))) {
                    nr = r+ndr;
                    nc = c+ndc;
                    if(!(nr < 0 || nr >= input.length || nc < 0 || nc >= input[0].length)) {
                        pq.push([l+input[nr][nc], [nr, nc, ndr, ndc, 1]]);
                    }
                }
            }
        }
    }
    throw new Error("No value found");
}

main(part1, part2)