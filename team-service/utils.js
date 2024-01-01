
const getRandomNumbers = () => {
  const min = 1;
  const max = 277;
  const count = 10;

  const randomNumbers = [];

  for (let i = 0; i < count; i++) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    randomNumbers.push(randomNumber);
  }
  return randomNumbers;
}

const getRandomAmounts = () => {
  const min = 10
  const max = 300
  const count = 10

  const randomAmounts = []

  for (let i = 0; i < count; i++) {
    let randomAmount = Math.floor(Math.random() * (max - min + 1)) + min;


    const amtObject = {
      amount: randomAmount
    }
    randomAmounts.push(amtObject)

  }
  return randomAmounts;
}




module.exports = { getRandomNumbers, getRandomAmounts };
