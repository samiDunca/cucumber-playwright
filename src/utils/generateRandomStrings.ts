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
}
