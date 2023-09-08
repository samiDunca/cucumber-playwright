import { startAndEndDate } from "../types/reservation.type";

export class GenerateRandomStrings {
  static generateRandomName() {
    let randomName: string = '';
    let letters: string = "abcdefghijklmnopqrstuvwxyz";

    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * letters.length);
      randomName += letters[randomIndex];
    }

    return randomName;
  }

  static generateRandomBays() {
    const baysNamesList: string[] = ['A', "B", "C", "D"]
    const baysName = baysNamesList[Math.floor(Math.random() * baysNamesList.length)]

    return baysName;
  }
}


export function extractRandomValueFromArray(array: any) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

export function extractHoursWithIndexAndValueConstraint(firstArray: string[], secondArray: string[]): startAndEndDate | any {
  const validHoursFromFirstArray = firstArray.filter(hour => hour !== '10:30p');
  const randomHourFromFirst = extractRandomValueFromArray(validHoursFromFirstArray);
  const minIndexForSecond = firstArray.indexOf(randomHourFromFirst) + 1;
  
  if (minIndexForSecond >= secondArray.length) {
    return null; // No valid hours available
  }

  const randomIndexForSecond = Math.floor(Math.random() * (secondArray.length - minIndexForSecond)) + minIndexForSecond;
  const randomHourFromSecond = secondArray[randomIndexForSecond];
  
  return {
    hourFromFirstArray: randomHourFromFirst,
    hourFromSecondArray: randomHourFromSecond
  };
}
