"use strict"

function main(p1, p2) {
    switch(process.argv[2]) {
        case "1":
            console.log(p1());
            break;

        case "2":
            console.log(p2());
            break;

        default:
            console.log(p1());
            console.log(p2());
            break;
    }
}

module.exports = main;