const rollrx = /([0-9]*)d([0-9]{1,3})/gm; // rolls
const addrx = /\+\s*([0-9]+)/g; // modifiers

const rollinp = document.getElementById("rollinput");
rollinp.addEventListener("change", updateRoll);

function updateRoll() {
  const inp = document.getElementById("rollinput").value;

  let total = 0;
  let dice = [];
  let mods = [];

  // test for valid roll
  if (!rollrx.test(inp)) {
    if (inp != "")
      document.getElementById("errormsg").innerHTML = "Invalid roll!";
    document.getElementById("results").innerHTML = "";
    document.getElementsByTagName("button")[0].classList.add("hidden");
    return false;
  } else {
    document.getElementById("errormsg").innerHTML = "";
    rollrx.lastIndex = 0;
  }

  // roll dice
  const rolls = inp.matchAll(rollrx);
  for (const m of rolls) {
    // roll once if not specified (eg 'd6')
    m[1] = m[1] === "" ? 1 : m[1];

    for (let i = 0; i < m[1]; i++) {
      const roll = Math.ceil(Math.random() * m[2]);
      dice.push(roll);
      total += roll;
    }
  }

  const subtotal = total;

  // add modifiers
  const numbers = inp.matchAll(addrx);

  for (const n of numbers) {
    mods.push(n[1]);
    total += parseInt(n[1]);
  }

  let result = "You rolled ";
  if (dice.length > 1) {
    result += dice.join(" + ") + " = ";
  }

  result += subtotal;

  if (mods.length > 0) {
    for (const m of mods) {
      result += " + " + m;
    }
    result += " = " + total;
  }

  document.getElementById("results").innerHTML = result;

  document.getElementsByTagName("button")[0].classList.remove("hidden");

  return false;
}
