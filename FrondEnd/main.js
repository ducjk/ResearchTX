const fs = require("fs");

const GetData = () => {
  const dataFile = fs.readFileSync("./data.json");

  let jsonData;

  if (dataFile) {
    jsonData = JSON.parse(dataFile);
  }

  let data = jsonData.data;

  let numbers = [];
  let numbersNeedPlay = [];
  let preventNumber = -1;
  let presentNumber = -1;

  for (let i = 0; i < 100; i++) {
    numbers[i] = '00'
  }
  const numberIsCorrect = []

  let checkIsCorrect = false

  data.forEach((element) => {
    if (presentNumber == -1) {
      presentNumber = element.number
    } else {
      if (numbersNeedPlay.length > 0){
        checkIsCorrect = numbersNeedPlay.find((num) => {
          return num == element.number
        })
  
        if (checkIsCorrect){
          numberIsCorrect.push(element)
        }
      }

      numbersNeedPlay = [];

      numbers[+presentNumber] = element.number
      preventNumber = presentNumber;
      presentNumber = element.number;

      for (let i = 0; i < numbers.length; i++) {
        if (presentNumber == numbers[i] && i != preventNumber) {
          numbersNeedPlay.push(i);
        }
      }
    }
  })

  return numberIsCorrect

};

module.exports = GetData
