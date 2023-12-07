"use strict"
const main = require("./utils");
const fs = require("fs");

function part1() {
    const input = fs.readFileSync("inputs/day7.txt", 'utf-8').split("\n");

    const parseCardInput = (str) => {return str
        .split("")
        .join(" ")
        .replaceAll("T", "10")
        .replaceAll("J", "11")
        .replaceAll("Q", "12")
        .replaceAll("K", "13")
        .replaceAll("A", "14")
        .split(" ")
    } 

    const hands = input
        .map(str => str.split(" "))
        .map(arr => arr = [parseCardInput(arr[0]), Number(arr[1])])

    hands.forEach( (hand) => {
        const m = {};
        for(const card of hand[0]) {
            if(m[card]) {
                m[card] += 1;
            }
            else {
                m[card] = 1;
            }
        }
        
        const scoreMapping = {
            "5": 6,
            "1,4": 5,
            "2,3": 4,
            "1,1,3": 3,
            "1,2,2": 2,
            "1,1,1,2": 1,
            "1,1,1,1,1" : 0  
        }

        hand.push(scoreMapping[Object.values(m).sort().join(",")]);
    })

    
    const compare = (hand1, hand2) => {
        // hand1, hand2 : [[cards], points, compareScore] 
        if(hand1[2] != hand2[2]) {
            return(hand1[2] - hand2[2]);
        }
        else {
            for(let i = 0; i < hand1[0].length; i++) {
                if(hand1[0][i] != hand2[0][i]) {
                    return(hand1[0][i] - hand2[0][i]);
                }
            }
            return 0; // identical
        }
    }

    return(hands
        .sort( (hand1, hand2) => compare(hand1, hand2))
        .reduce( (a, arr, index) => a += (index+1)*arr[1], 0)
    );
}

function part2() {
    const input = fs.readFileSync("inputs/day7.txt", 'utf-8').split("\n");

    const parseCardInput = (str) => {return str
        .split("")
        .join(" ")
        .replaceAll("T", 10)
        .replaceAll("J", 1)
        .replaceAll("Q", 12)
        .replaceAll("K", 13)
        .replaceAll("A", 14)
        .split(" ")
        .map(Number)
    } 

    const hands = input
        .map(str => str.split(" "))
        .map(arr => arr = [parseCardInput(arr[0]), Number(arr[1])])

    hands.forEach( (hand) => {
        const m = {};
        for(const card of hand[0]) {
            if(m[card]) {
                m[card] += 1;
            }
            else {
                m[card] = 1;
            }
        }

        let [maxCard, maxNum] = [-1, -1];
        for(const [card, num] of Object.entries(m)) {
            if(card != 1 && num > maxNum) {
                maxCard = card;
                maxNum = num;
            }
            else if(card != 1 && num == maxNum && card > maxCard) {
                maxCard = card;
                maxNum = num;
            }
        }

        if(maxCard == -1) {
            maxCard = 14;
            m[maxCard] = 0;
        }

        if(m[1]) {
            m[String(maxCard)] += m["1"];
            delete m["1"];
        }
        
        const scoreMapping = {
            "5": 6,
            "1,4": 5,
            "2,3": 4,
            "1,1,3": 3,
            "1,2,2": 2,
            "1,1,1,2": 1,
            "1,1,1,1,1" : 0  
        }

        hand.push(scoreMapping[Object.values(m).sort().join(",")]);
    })

    const compare = (hand1, hand2) => {
        // hand1, hand2 : [[cards], points, compareScore] 
        if(hand1[2] != hand2[2]) {
            return(hand1[2] - hand2[2]);
        }
        else {
            for(let i = 0; i < hand1[0].length; i++) {
                if(hand1[0][i] != hand2[0][i]) {
                    return(hand1[0][i] - hand2[0][i]);
                }
            }
            return 0; // identical
        }
    }

    return(hands
        .sort( (hand1, hand2) => compare(hand1, hand2))
        .reduce( (a, arr, index) => a += (index+1)*arr[1], 0)
    );
}

main(part1, part2);