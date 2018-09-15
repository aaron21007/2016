var score = 0;
var penalty = 10; // Penalty can be fine-tuned.
var lastact = new Date();

function talk() {

    /* The smaller the distance, more time has to pass in order
     * to negate the score penalty cause{d,s}.
     */
    score -= (new Date() - lastact) * 0.55;

    // Score shouldn't be less than zero.
    score = (score < 0) ? 0 : score;

    console.log("--------------");
    console.log((score += penalty));

    if (parseInt((score += penalty)) <= 1000) {
        // Do things.
        console.log("Work");
    } else {
        console.log("Error");
    }

    lastact = new Date();

}

async function corre() {
    for (let index = 0; index < 100; index++) {
        console.log(`Inicio`);

        await talk()
        console.log(`Fin \n`);


    }
}

corre()