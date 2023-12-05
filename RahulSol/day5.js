"use strict"
const main = require("./utils");
const fs = require("fs");

function part1() {
    const input = fs.readFileSync("inputs/day5.txt", 'utf-8').split("\n\n");

    // Process first line (seeds)
    const seeds = input[0]
        .split(":")[1]
        .trim()
        .split(" ")
        .map(Number);

    // Process other lines (mappings)
    const maps = [];
    for(const map of input.slice(1)) {
        const entries = map
            .split(":")[1]
            .trim()
            .split("\n");
        
        const m = [];
        for(const entry of entries) {
            const [, dest, source, length] = /(\d+) (\d+) (\d+)/.exec(entry).map(Number);
            m.push( [[source, source+length-1], dest] );
        } 
        maps.push(m);
    }

    const applyMapping = (seed, map) => {
        for(const rangeMap of maps[map]) {
            const [low, high] = [rangeMap[0][0], rangeMap[0][1]]
            if(seed >= low && seed <= high) {
                return rangeMap[1]+seed-low;
            }
        }
        return seed;
    }

    let min = Infinity;
    for(const seed of seeds) {
        let dest = seed;
        for(let i = 0; i < maps.length; i++) {
            dest = applyMapping(dest, i); 
        }
        min = Math.min(dest, min);
    }

    return min;
}

function part2() {
    const input = fs.readFileSync("inputs/day5.txt", 'utf-8').split("\n\n");

    // Process first line (seeds)
    const re = /(\d+) (\d+)/g;
    let match;
    const seeds = [];

    while((match = re.exec(input[0])) !== null) {
        seeds.push( [Number(match[1]), Number(match[2])] );
    }

    // Process other lines (mappings)
    const getMappings = (index) => {
        const mappings = [];
        const re = /(\d+) (\d+) (\d+)/g;

        let match;
        while((match = re.exec(input[index])) !== null) {
            const dest = Number(match[1]);
            const source = Number(match[2]);
            const range = Number(match[3]);

            mappings.push( [[source, source+range], dest] );
        }
        return mappings;
    }

    // Apply mappings to range of seeds
    const applyMapping = (range, mappings) => {
        const result = [];
        let start = range[0];
        let remaining= range[1];

        next: while(remaining > 0) {
            let toClosest = Infinity;
            for(const mapping of mappings) {
                const [low, high] = [mapping[0][0], mapping[0][1]];

                // If start falls within range
                if(start >= low && start < high) {
                    const dest = mapping[1];
                    const end = Math.min(remaining, high-start);
                    result.push([start-low+dest, end]);
                    remaining -= end;
                    start += end;
                    continue next;
                } 
                // If start is lower than any starting range
                else if(low-start > 0) {
                    toClosest = Math.min(low-start, toClosest);
                }
            }
            // If range not found
            result.push([start, Math.min(start+toClosest, remaining)]);
            start += toClosest;
            remaining -= Math.min(toClosest, remaining);
        }
        return result
    }  

    let mappedSeeds = seeds;
    for(let i = 1; i < input.length; i++) {
        const newMapping = [];
        mappedSeeds.forEach( (seed) => newMapping.push(...applyMapping(seed, getMappings(i))));
        mappedSeeds = newMapping;
    }

    let min = Infinity;
    mappedSeeds.forEach( (map) => min = Math.min(min, map[0]));
    
    return min;
}

main(part1, part2)