"use strict"
const main = require("./utils");
const fs = require("fs");

function part1() {
    const input = fs.readFileSync("inputs/day15.txt", 'utf-8')
        .replace("\n", "")
        .split(",");

    const hash = (str) => Array.prototype.reduce.call(str, (h, char) => (h + char.charCodeAt(0))*17 % 256, 0);
    
    return input.reduce( (a, str) => a + hash(str), 0);
}

function part2() {
    const input = fs.readFileSync("inputs/day15.txt", 'utf-8')
        .replace("\n", "")
        .split(",");

    const hash = (str) => Array.prototype.reduce.call(str, (h, char) => (h + char.charCodeAt(0))*17 % 256, 0);

    const boxes = Array.from({length: 256}, () => []);

    next: for(const cmd of input) {
        if(cmd.endsWith('-')) {
            const label = cmd.slice(0, -1);
            boxes[hash(label)] = boxes[hash(label)].filter( (arr) => arr[0] !== label);
        }
        else {
            const strength = cmd[cmd.length-1];
            const label = cmd.slice(0, -2);
            const box = boxes[hash(label)];
            
            for(let i = 0; i < box.length; i++) {
                if(box[i][0] == label) {
                    box[i][1] = strength;
                    continue next;
                }
            }
            box.push([label, strength]);
        }
    }

    const reduceBox = (box) => box.reduce( (acc, lens, idx) => acc + (idx+1)*lens[1], 0);
    const reduceBoxes = (boxes) => boxes.reduce( (acc, box, idx) => acc + (idx+1)*reduceBox(box), 0);

    return reduceBoxes(boxes);
}

main(part1, part2);