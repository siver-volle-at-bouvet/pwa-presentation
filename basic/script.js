const DICE_CONFIG_KEY = "dice_config_basic"
const throwDiceButton = document.getElementById("throw_dice");
const diceConfigInput = document.getElementById("dice_config");
const clearLogButton = document.getElementById("clear_log");
const diceLogElement = document.getElementById("dice_log");

let previousDice = localStorage.getItem(DICE_CONFIG_KEY);
if(previousDice) {
  diceConfigInput.value = previousDice;
}

clearLogButton.addEventListener("click", () => diceLogElement.innerHTML = "");
throwDiceButton.addEventListener("click", throwDice);
function throwDice(ev){
  const diceConfig = diceConfigInput.value;
  const dExpr = diceConfig.trim();

  let withNumbers = dExpr.replace(/\d*d\d+/g, (dice) => {
    const [n, d] = dice.split("d");
    const values = Array.from({length: parseInt((n.trim()||"1"))}).map(() => Math.ceil(Math.random() * parseInt(d.trim())));
    return "(" + values.join(" + ") + ")";
  });

  let nameElm = document.createElement("dt");
  nameElm.innerText = `${dExpr}: ${withNumbers}`;
  let sumElm = document.createElement("dd");
  try {
    let sum = eval(withNumbers);
    sumElm.innerHTML = `= <b><u>${sum}</u></b>`;
  } catch(err) {
    sumElm.innerHTML = `= <b><u>${err}</u></b>`;
  }

  diceLogElement.prepend(sumElm);
  diceLogElement.prepend(nameElm);
  localStorage.setItem(DICE_CONFIG_KEY, diceConfig);
}