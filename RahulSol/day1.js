"use strict";
const fs = require("fs");
const main = require("./utils");

function part1() {
    const input = fs.readFileSync("inputs/day1.txt", 'utf-8').split("\n");
    const re = /[0-9]/;

    let sum = 0;
    for(const line of input) {
        var first = -1;
        var last = -1;

        var i = 0;
        while(first < 0) {
            if(re.test(line[i])) {
                first = i;
            }
            i++;
        }

        i = line.length - 1;
        while(last < 0) {
            if(re.test(line[i])) {
                last = i;
            }
            i--;
        }
        sum += Number(line[first] + line[last])
    }

    console.log(sum);
}

function part2() {
    const input = fs.readFileSync("inputs/day1.txt", 'utf-8').split("\n");
    const re = /([0-9]|zero|one|two|three|four|five|six|seven|eight|nine)/g;

    const map = new Map([
        ["zero", "0"],
        ["one", "1"],
        ["two", "2"],
        ["three", "3"],
        ["four", "4"],
        ["five", "5"],
        ["six", "6"],
        ["seven", "7"],
        ["eight", "8"],
        ["nine", "9"]]
    );

    let sum = 0;
    let first, last, match; 
    for(const line of input) {
        first = null;
        while((match = re.exec(line)) != null) {
            if(first == null) {
                first = match[0];
            }
            last = match[0];
            re.lastIndex -= Number(match[0].length > 1);
        }

        if(map.has(first)) {
            first = map.get(first);
        }
        if(map.has(last)) {
            last = map.get(last);
        }

        sum += Number(first+last);
    }

    console.log(sum);
}

main(part1, part2);

