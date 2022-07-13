var intToRoman = function(num) {
  var romans = {
      1000:'M',
      900:'CM',
      500:'D',
      400:'CD',
      100:'C',
      90:'XC',
      50:'L',
      40:'XL',
      10:'X',
      9:'IX',
      5:'V',
      4:'IV',
      1:'I',
  }
  
var string = ''
console.log(Object.keys(romans))
  while(num != 0) {
      for(var i of Object.keys(romans).reverse()){
          if(num >= i) {
              num -= i;
              string += romans[i];
              break;
          }
      }
  }
 return string;
};

console.log(intToRoman(342));