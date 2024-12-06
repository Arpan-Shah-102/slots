spin = document.querySelector('.spin');
autoSpin = document.querySelector('.auto-spin');

terminal = document.querySelector('.terminal');
moneySpent = document.querySelector('.money-spent > span');
moneyEarned = document.querySelector('.money-earned > span');

a = document.querySelector('.a');
b = document.querySelector('.b');
c = document.querySelector('.c');

spin.addEventListener("click", function() {
  spinSlot(1);
});
autoSpin.addEventListener("click", function() {
  try {
    numberOfItereations = Number(prompt("How many times would you like to spin?"));
    if (isNaN(numberOfItereations) || numberOfItereations <= 0) {
      throw new Error("Invalid number of iterations. Please enter a positive number.");
    }
    spinSlot(numberOfItereations);
  }
  catch (err) {
    alert("You did not enter a valid number. Please try again.");
    console.log(err);
  }
});

symbols = ['🍒','💎','🔔','🍉','⭐','🍇','7️⃣','🥇','🥈','🥉'];
moneySpentVar = 0;
moneyEarnedVar = 0;

function spinSlot(iterations) {
  let completedSpins = 0
  slotSound = new Audio('./assets/slot-spin-sound.mp3');
  slotSound.play();
  for (let j = 0; j < iterations; j++) {
    setTimeout(function () {
      spin.disabled = true;
      autoSpin.disabled = true;

      moneySpentVar += 10;
      moneySpent.innerText = moneySpentVar;

      let s1;
      let s2;
      let s3;

      for (let i = 0; i < 10; i++) {
        setTimeout(function() {
          s1 = symbols[Math.floor(Math.random() * symbols.length)];
          s2 = symbols[Math.floor(Math.random() * symbols.length)];
          s3 = symbols[Math.floor(Math.random() * symbols.length)];

          a.innerText = s1;
          b.innerText = s2;
          c.innerText = s3;
        }, 100 * i);
      }
      setTimeout(function() {
        if (a == b && b == c) {
          moneyEarnedVar += 300;
          terminal.innerText = "Congratulations! You won $300!";
          moneyEarned.innerText = moneyEarnedVar;
        }
        else if (s1 == s2 || s1 == s3 || s2 == s3) {
          moneyEarnedVar += 10;
          terminal.innerText = "Congratulations! You won $10!";
          moneyEarned.innerText = moneyEarnedVar;
        }
        else {
          terminal.innerText = "Sorry, you didn't win.";
        }

        completedSpins++;
        if (completedSpins == iterations) {
          spin.disabled = false;
          autoSpin.disabled = false;
        }
      }, 1000);
    }, 1250 * j);
  }
}