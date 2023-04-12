let rng_chance = [
  { name: "New PS5 Game", image: "none", chance: 0.001 },
  { name: "Eat Ouside", image: "none", chance: 0.05 },
  { name: "Take Home Food", image: "none", chance: 0.05 },
];

let chipAnimation = (selector) => {
  let chips = document.querySelectorAll(selector);
  let counter = 0;
  let interval = setInterval(() => {
    if (counter == chips.length - 1) clearInterval(interval);
    chips[counter].classList.add("animated");
    counter++;
  }, 200);
};

setTimeout(() => {
  chipAnimation(".chip");
}, 200);
setTimeout(() => {
  chipAnimation(".all-rewards");
}, 800);

let firstVisit = true;
function countNumber(number) {
  let startNumber = 0;
  let container = document.querySelector(".preview-reward p span");
  let intervals;

  if (firstVisit) {
    intervals = setInterval(() => {
      if (startNumber > number) {
        container.innerText = number.toLocaleString(2);
        clearInterval(intervals);
      } else {
        container.innerText = startNumber.toLocaleString(2);
        startNumber += 10412;
      }
    }, 1);
    firstVisit = false;
  } else {
    let cents = Math.random();
    let previousAmount = parseInt(container.innerText.replaceAll(",", ""));
    let newAmount = (amount) => {
      return amount.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    };
    container.innerText = newAmount(previousAmount + cents);
    clearInterval(intervals);
  }
}
setInterval(() => {
  //Prize API is not working so I jsut manually input a hardcoded number
  fakeApi("url", (data) => {
    countNumber(data);
  });
}, 3000);

function fakeApi(url, cb) {
  return cb(Math.random() * 10_000_000);
}

document.querySelector(".btn").addEventListener("click", (e) => {
  let rollContainer = document.querySelector(".number-roll");
  let counter = 0;
  let interval = setInterval(() => {
    if (counter == 40) clearInterval(interval);
    rollContainer.innerText = Math.ceil(Math.random() * 1000);
    counter++;
  }, 10);
});
