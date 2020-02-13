// Random generation is courtesy of https://github.com/tanglebones

function randomCtor(seed) {
  let current;

  function* generator(n) {
    current = current * 16807 % 2147483647;

    const additionalSteps = (current & 0xF);
    for(let i = 0; i <= additionalSteps; ++i) {
      current = current * 16807 % 2147483647;
    }

    const r = (current - 1) / 2147483646;
    yield Math.floor(r * n); // 0 to n-1
  }

  function init(seed) {
    current = seed % 2147483647;
    if (current <= 0) {
      current += 2147483646;
    }
    const g = generator(1);
    for (let i = 0; i < 128; ++i) { g.next(); }
  }

  init(seed);


  generator.reseed = function (seed) {
    init(seed);
  };

  return generator;
}

function shuffleCtor(random) {
  return function shuffle(arr) {
    for (let i = arr.length; i > 0; --i) {
      const p = i - 1;
      const j = random(i).next().value; // 0 to i-1
      if (j === p) {
        continue;
      }
      const t = arr[j];
      arr[j] = arr[p];
      arr[p] = t;
    }
    return arr;
  }
}

function randomBoardCtor(shuffle) {
  return function randomBoard() {
    const s = shuffle("bbbbbbbbggggggggkkkkkkkkrrrrrrrrwwwwwwwwzzz".split(''));
    for (const i of [42, 38, 31, 25, 18, 12, 5, 1]) {
      s.splice(i, 0, '/');
    }
    return s.join('');
  }
}

function stringToSeed(s) {
  return s.split('').map(x => x.charCodeAt(0)).reduce((a, b) => (a * 16807 + b) % 2147483647, 1234567890);
}

function determineSeed(seedString) {
  let seed = Math.trunc(Math.random() * 2147483647);

  if (seedString) {
    if ("" + +seedString === seedString) {
      seed = +seedString;
      console.log(`Using numeric seed: ${seed}`);
    } else {
      seed = stringToSeed(seedString);
      console.log(`Using seed: ${seed} (from: "${seedString}")`);
    }
  } else {
    console.log(`Using random seed: ${seed}`);
  }
  return seed;
}

// hard-coded seed for inital implementation
// TODO: get a seed from Vue
let seed = determineSeed('langk');

const random = randomCtor(seed);
const shuffle = shuffleCtor(random);
const boardGenerator = randomBoardCtor(shuffle);
