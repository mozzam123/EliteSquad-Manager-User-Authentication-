function getRandomNumbers() {
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
