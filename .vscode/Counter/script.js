const counter = document.getElementById("counter");
const inc = document.getElementById("inc");
const dec = document.getElementById("dec");
const reset = document.getElementById("reset");

// state
let state = {
  number: 0,
};

// actions
function increment() {
  state.number += 1;
}

function decrease() {
  state.number -= 1;
}

function resetToZero() {
  state.number = 0;
}

// render
function render() {
  counter.textContent = state.number;
}

// events
inc.addEventListener("click", () => {
  increment();
  render();
});

dec.addEventListener("click", () => {
  decrease();
  render();
});

reset.addEventListener("click", () => {
  resetToZero();
  render();
});

render();
