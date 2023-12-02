"use strict"

function main(p1, p2) {
    switch(process.argv[2]) {
        case "1":
            p1();
            break;

        case "2":
            p2();
            break;

        default:
            p1();
            p2();
            break;
    }
}

module.exports = main;