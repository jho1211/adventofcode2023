"use strict"
const main = require("./utils");
const fs = require("fs");

function part1() {
    const input = fs.readFileSync("inputs/day16.txt", 'utf-8')
        .split("\n")
        .map (str => str.split(''));

    const d = {
        up: 1,
        left: 2,
        down: 3,
        right: 4
    };

    const move = (pos, dir) => {
        switch(dir) {
            case d.up: 
                pos[0] -= 1;
                break;
            case d.left: 
                pos[1] -= 1;
                break;
            case d.down:
                pos[0] += 1;
                break;
            case d.right:
                pos[1] += 1;
                break;
        }
        return(pos);
    }


    let todo = [[[0, -1], d.right]];
    const visited = new Set();

    const update = ([i, j], dir) => {
        const key = `${i},${j},${dir}`;
        if(!visited.has(key)) {
            visited.add(key)
            todo.push([[i,j], dir]);
        }
    }

    while(todo.length !== 0) {
        const [curr, dir] = todo[0]
        todo = todo.slice(1);

        const [i, j] = move(curr, dir);

        if(i < 0 || i > input.length-1 || j < 0 || j > input[0].length-1) {
            continue;
        }
        
        const next = input[i][j];

        if(next === '.') {
            update([i,j], dir);    
        }
        else if(next === "/") {
            let nextdir;
            switch(dir) {
                case d.right: nextdir = d.up; break;
                case d.left: nextdir = d.down; break;
                case d.up: nextdir = d.right; break;
                case d.down: nextdir = d.left; break;
            }
            update([i, j], nextdir);
        }
        else if(next === "\\") {
            let nextdir;
            switch(dir) {
                case d.right: nextdir = d.down; break;
                case d.left: nextdir = d.up; break;
                case d.up: nextdir = d.left; break;
                case d.down: nextdir = d.right; break;
            }
            update([i, j], nextdir);
        }
        else if(next === '|') {
            if(dir == d.right || dir == d.left) {
                update([i, j], d.up);
                update([i, j], d.down);
            }
            else {
                update([i, j], dir);
            }
        }
        else if(next === '-') {
            if(dir == d.up || dir == d.down) {
                update([i, j], d.left);
                update([i, j], d.right);
            }
            else {
                update([i, j], dir);
            }
        }
    }

    const unique = new Set();
    visited.forEach( (element) => {
        unique.add(element.slice(0, -2));
    })

    return(unique.size);
}

function part2() {
    const input = fs.readFileSync("inputs/day16.txt", 'utf-8')
        .split("\n")
        .map (str => str.split(''));

    const d = {
        up: 1,
        left: 2,
        down: 3,
        right: 4
    };

    const p1 = (start) => {
        const move = (pos, dir) => {
            switch(dir) {
                case d.up: 
                    pos[0] -= 1;
                    break;
                case d.left: 
                    pos[1] -= 1;
                    break;
                case d.down:
                    pos[0] += 1;
                    break;
                case d.right:
                    pos[1] += 1;
                    break;
            }
            return(pos);
        }
    
        let todo = [start];
        const visited = new Set();
    
        const update = ([i, j], dir) => {
            const key = `${i},${j},${dir}`;
            if(!visited.has(key)) {
                visited.add(key);
                todo.push([[i,j], dir]);
            }
        }
    
        while(todo.length !== 0) {
            const [curr, dir] = todo[0];
            todo = todo.slice(1);
    
            const [i, j] = move(curr, dir);
    
            if(i < 0 || i > input.length-1 || j < 0 || j > input[0].length-1) {
                continue;
            }
            
            const next = input[i][j];
    
            if(next === '.') {
                update([i,j], dir);    
            }
            else if(next === "/") {
                let nextdir;
                switch(dir) {
                    case d.right: nextdir = d.up; break;
                    case d.left: nextdir = d.down; break;
                    case d.up: nextdir = d.right; break;
                    case d.down: nextdir = d.left; break;
                }
                update([i, j], nextdir);
            }
            else if(next === "\\") {
                let nextdir;
                switch(dir) {
                    case d.right: nextdir = d.down; break;
                    case d.left: nextdir = d.up; break;
                    case d.up: nextdir = d.left; break;
                    case d.down: nextdir = d.right; break;
                }
                update([i, j], nextdir);
            }
            else if(next === '|') {
                if(dir == d.right || dir == d.left) {
                    update([i, j], d.up);
                    update([i, j], d.down);
                }
                else {
                    update([i, j], dir);
                }
            }
            else if(next === '-') {
                if(dir == d.up || dir == d.down) {
                    update([i, j], d.left);
                    update([i, j], d.right);
                }
                else {
                    update([i, j], dir);
                }
            }
        }
    
        const unique = new Set();
        visited.forEach( (element) => {
            unique.add(element.slice(0, -2));
        })
    
        return(unique.size);
    }

    let max = -1;
    for(let i = 0; i < input.length; i++) {
        max = Math.max(max, p1([[i, -1], d.right]), p1([[i, input[0].length], d.left]));
    }

    for(let j = 0; j < input[0].length; j++) {
        max = Math.max(max, p1([[-1, j], d.down]), p1([[input.length, j], d.up]));
    }

    return(max);
}

main(part1, part2);