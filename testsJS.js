var romanToInt = function(s) {
  let romanMap = {
      I: 1,
      IV: 4,
      V: 5,
      IX: 9,
      X: 10,
      XL: 40,
      L: 50,
      XC:90,
      C: 100,
      CD: 400,
      D: 500,
      CM: 900,
      M: 1000 
  }
  console.log(s)
  let sum = 0;
  for(let i = 0 ; i < s.length ; i++ ) {
      console.log(s.lenght)
      if (s[i] === 'I' && (s[i+1] === 'V' || s[i+1] === 'X') ||
          s[i] === 'X' && (s[i+1] === 'L' || s[i+1] === 'C') || 
          s[i] === 'C' && (s[i+1] === 'D' || s[i+1] === 'M')) {
           sum += romanMap[s[i] + s[i+1]]
          console.log(s[i] + s[i+1])
           }
      else {
          sum = sum + romanMap[s[i]]
          console.log(s[i])
      }
  }
  return sum
};

console.log(romanToInt("III"));