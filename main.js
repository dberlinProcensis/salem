/* TABLE OF CONTENTS */
/* ----- GLOBAL SECTION ----- */
// 1 -- Global Variables
// 2 -- Player Number Function
// 3 -- Valid Number Function
// 4 -- Checkbox Function
/* ----- PSYCHIC SECTION ----- */
// 5 -- Vision Function
/* ----- PIRATE SECTION ----- */
// 6 -- 
/* END TABLE OF CONTENTS */

/* 1 -- GLOBAL VARIABLES */
let playerNumber;
let deadNums = [];
let oldPlayerNumber;
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

/* 3 -- VALID NUMBER FUNCTION */
const numValid = (num) => {
    if (deadNums.length >= 12) {
        throw new Error('T O O   M A N Y   D E A D !   >:(');
    } else if (deadNums.includes(num)) {
        return false; // Number submitted for exclusion is a duplicate - not valid
    } else {
        return true; // Number is unique - valid
    }
};
/* END 3 -- VALID NUMBER FUNCTION */

/* 4 -- CHECKBOX FUNCTION */
const checkOff = (num) => {
    if (numValid(num) == true) { // If number is unique, add it
        deadNums.push(num);
        deadNums.sort(function(a, b){return a-b});
    } else {
        for (let i = 0; i < deadNums.length; i++) {
            if (deadNums[i] == num) {
                deadNums.splice(i, 1) // If number is a duplicate, remove it
            }
        }
        deadNums.sort(function(a, b){return a-b});
    }
    
    console.log(`you checked off player number ${num}`)
    console.log(`Excluded numbers: ${deadNums}... ${deadNums.length} total`);
};
/* END 4 -- CHECKBOX FUNCTION */

/* 5 -- VISION FUNCTION */
const vision = (type) => {
    let visionOutput = [];
    let reading = document.getElementsByClassName('reading');
    reading.innerHTML = '';  // Clear any previous vision

    const randos = (amount) => { // AMOUNT = 2 for good || 3 for evil
        let i = visionOutput.length; 
        while (i < amount) {
            let num = (Math.ceil(Math.random() * 15)); // RANDOM number
            // Generated rando validation process
            if (num != playerNumber // Failsafe for excluding yourself from visions
                && !visionOutput.includes(num) // Prevents duplicate numbers in vision
                && numValid(num)) { // Explicitly excluded numbers
                    visionOutput.push(num); // Push to vision after validation
                    i++;
            } else {
                randos();
            }
        } 
    };

    // CALCULATE VISION
    let visionStr; 
    if (type === 'evil') {
        console.log('You selected an EVIL vision...')
        randos(3);
        visionStr = visionOutput.join(', ');
        reading.append(`EVIL => { ${visionStr} }`);
    } else if (type === 'good') {
        console.log('You selected a GOOD vision...')
        randos(2);
        visionStr = visionOutput.join(', ');
        reading.append(`good => { ${visionStr} }`);
    }
        
};
/* END 5 -- VISION FUNCTION */

/* 6 -- PLUNDER FUNCTION */
const plunder = () => {
    let target;
    let directive = document.getElementById('directive');

    const directive = () => {
        let actions = ['slash em wit yerr scimitar!', 'stab em wit yerr rapier!', 'shoot em wit yerr pistol!'];
        let randoAction = Math.floor(Math.random() * actions.length);
        let action = actions[randoAction];
        console.log(action);
        return action;
    };

    const rando = () => {
        let num15 = (Math.ceil(Math.random() * 15));
        if (numValid(num15) && num15 != playerNumber) {
            console.log('target: ' + num15);
            target = num15;
        } else {
            rando();
        }
    };

    // CALLS
    directive.innerHTML = '';  // Clear any previous directive
    rando();
    directive.append(`\nYarr... plunder ${target}, and ${directive()}\n`);
}

/* END 6 -- PLUNDER FUNCTION */

/*THIS SPACE INTENTIONALLY LEFT BLANK // DO NOT WRITE BELOW THIS LINE
//
//
//
//
//
//
//
//
// OK*/