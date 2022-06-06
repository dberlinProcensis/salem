/* TABLE OF CONTENTS */
// 1 -- Global Variables
// 2 -- Player Number Function
// 3 -- Vision Function
// 4 -- Valid Number Function
// 5 -- Checkbox Function
/* END TABLE OF CONTENTS */

/* 1 -- GLOBAL VARIABLES */
let deadNums = [0];
let oldPlayerNumber = 0;
let playerNumber;
/* END 1 -- GLOBAL VARIABLES */

/* 2 -- PLAYER NUMBER FUNCTION */
const playerNum = (num) => {
    // DEACTIVATE OLD PLAYER NUMBER
    $(`#${oldPlayerNumber}`).removeAttr('checked');
    checkOff(oldPlayerNumber);

    // ADDRESS NEW PLAYER NUMBER
    console.log(`Blessed Be! You are player number: ${num}`);
    playerNumber = num;
    checkOff(playerNumber);
    $(`#${num}`).attr('checked', "checked");    
    oldPlayerNumber = playerNumber;
};
/* END 2 -- PLAYER NUMBER FUNCTION */

/* 3 -- VISION FUNCTION */
const vision = (type) => {
    let visionOutput = [];
    $('.reading').empty();  // Clear any previous vision

    const randos = (amount) => { // AMOUNT = 2 for good || 3 for evil
        let i = visionOutput.length; 
        while (i < amount) {
            let num = (Math.ceil(Math.random() * 15)); // RANDOM number
            // Generated rando validation process
            if (num != playerNumber // Failsafe for excluding yourself from visions
                && !visionOutput.includes(num) // Prevents duplicate numbers in vision
                && !deadNums.includes(num)) { // Explicitly excluded numbers
                    visionOutput.push(num); // Push to vision after validation
                    i++;
            } else {
                randos();
            }
        } 
    };

    // CALCULATE VISION
    if (type === 'evil') {
        console.log('You selected an EVIL vision...')
        randos(3);
        $('.reading').append(`EVIL VISION: [${visionOutput}]`);
    } else if (type === 'good') {
        console.log('You selected a GOOD vision...')
        randos(2);
        $('.reading').append(`GOOD VISION: [${visionOutput}]`);
    }
        
};
/* END 3 -- VISION FUNCTION */

/* 4 -- VALID NUMBER FUNCTION */
const numValid = (num) => {
    if (deadNums.length >= 12) {
        throw new Error('T O O   M A N Y   D E A D !   >:(');
    } else if (deadNums.includes(num)) {
        return false; // Number submitted for exclusion is a duplicate - not valid
    } else if (!deadNums.includes(num)) {
        return true; // Number is unique - valid
    }
};
/* END 4 -- VALID NUMBER FUNCTION */

/* 5 -- CHECKBOX FUNCTION */
const checkOff = (num) => {
    if (numValid(num) === true) { // If number is unique, add it
        deadNums.push(num);
        deadNums.sort(function(a, b){return a-b});
    } else {
        for (let i = 0; i < deadNums.length; i++) {
            if (deadNums[i] === num) {
                deadNums.splice(i, 1) // If number is a duplicate, remove it
            }
        }
        deadNums.sort(function(a, b){return a-b});
    }
    
    console.log(`you checked off player number ${num}`)
    console.log(`Excluded numbers: ${deadNums}... ${deadNums.length} total`);
};
/* END 5 -- CHECKBOX FUNCTION */