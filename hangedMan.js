const hangedMan = () => {
 

  var figlet = require("figlet");

  figlet("HANG MAN", function (err, data) {
    if (err) {
      console.log("Something went wrong...");
      console.dir(err);
      return;
    }
    console.log(data);
    selectAWord();
  });

  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  let numberOfGuesses = 10;
  let cycleResult = false;
  const inviteToGuess = (unhiddenLowerCased, hiddenItem) => {
    readline.question("What is your guess?\n", (guess) => {
      if (guess.toLowerCase().localeCompare(unhiddenLowerCased) === 0) {
        console.log("You guessed the correct word! Good job!");
        readline.close();
        return true;
      } else if (guess.length > 1) {
        console.log("Please enter only one character");
      } else if (guess.match(/^[a-zA-Z]$/gi) == null) {
        console.log("Invalid choice");
      } else if (unhiddenLowerCased.search(guess.toLowerCase()) < 0) {
        numberOfGuesses--;
        console.log("This letter does not exist");
      } else if (hiddenItem.includes(guess.toLowerCase())) {
        console.log("You already guessed that letter");
      } else if (unhiddenLowerCased.includes(guess.toLowerCase())) {
        hiddenItem = revealLetter(unhiddenLowerCased, hiddenItem, guess);
        if (hiddenItem.includes("*")) {
          console.log("That's correct!");
        } else {
          console.log("You guessed all the letters right! Good job!");
          responseToGuess(unhiddenLowerCased, hiddenItem);

          cycleResult = true;
          readline.close();
          return cycleResult;
        }
      }

      let answer2 = responseToGuess(unhiddenLowerCased, hiddenItem);
      if (answer2 === true) {
        return;
      }
    });
  };

  const revealLetter = (unhiddenLowerCased, hiddenItem, guess) => {
    let combinedStr = "";
    let newLetterArray = Array.from(unhiddenLowerCased);
    let startI = 0;
    for (let i = 0; i < newLetterArray.length; i++) {
      if (
        newLetterArray[i].localeCompare(guess.toLowerCase()) === 0 &&
        i != newLetterArray.length - 1
      ) {
        combinedStr = combinedStr
          .concat(hiddenItem.substring(startI, i))
          .concat(guess.toLowerCase());
        startI = i + 1;
      } else if (
        !(newLetterArray[i].localeCompare(guess.toLowerCase()) === 0) &&
        i === newLetterArray.length - 1
      ) {
        combinedStr = combinedStr
          .concat(hiddenItem.substring(startI, i))
          .concat(hiddenItem.substring(i));
      } else if (
        newLetterArray[i].localeCompare(guess.toLowerCase()) === 0 &&
        i === newLetterArray.length - 1
      ) {
        combinedStr = combinedStr
          .concat(hiddenItem.substring(startI, i))
          .concat(guess.toLowerCase());
      }
    }
    return combinedStr;
  };

  const responseToGuess = (unhiddenLowerCased, hiddenItem) => {
    if (!hiddenItem.includes("*")) {
      console.log("The word is: \n" + hiddenItem);
      return;
    }

    console.log(`You have ${numberOfGuesses} guesses`);
    if (numberOfGuesses === 0) {
      console.log("The word is: \n" + unhiddenLowerCased);
      console.log("Game over");
      readline.close();
      return;
    }

    console.log("The word is: \n" + hiddenItem);

    cycleResult = inviteToGuess(unhiddenLowerCased, hiddenItem);
    if (cycleResult === true) {
      readline.close();
      return cycleResult;
    }
  };
  const selectAWord = () => {
    let arr = [
      "just",
      "wow",
      "so",
      "with",
      "wonderland",
      "versions",
      "anything",
      "professor",
      "including",
      "sometimes",
    ];
    let unhiddenItem = arr[Math.floor(Math.random() * arr.length)];
    let unhiddenLowerCased = unhiddenItem.toLowerCase();
    let hiddenItem = unhiddenItem.replace(/[a-zA-Z]/gi, "*");
    let answer = responseToGuess(unhiddenLowerCased, hiddenItem);
    if (answer === true) {
      return;
    }
  };

  
};
// in order to invoke the function
hangedMan();
