import wordList from "$lib/word_list.json";
import { faker } from "@faker-js/faker";

const commonWords = ["the", "of", "is", "and", "in", "with", "a", "to", "for", "on"];

const makeParagraph = async () => {
  const words = faker.helpers.arrayElements(wordList, 500);
  const sentenceCount = faker.number.int({ min: 4, max: 6 }); // Random sentence count (between 4 and 6)
  const paragraph = [];

  for (let i = 0; i < sentenceCount; i++) {
    const sentenceLength = faker.number.int({ min: 5, max: 10 }); // Random sentence length (between 5 and 10 words)
    const sentence = [];

    for (let j = 0; j < sentenceLength; j++) {
      if (Math.random() < 0.2 && j < sentenceLength - 1) {
        const randomCommonIndex = faker.number.int({ min: 0, max: commonWords.length });
        sentence.push(commonWords[randomCommonIndex]);
      } else {
        const randomIndex = faker.number.int({ min: 0, max: words.length });
        sentence.push(words[randomIndex]);
      }
    }

    // Capitalize the first word of the sentence
    sentence[0] = sentence[0].charAt(0).toUpperCase() + sentence[0].slice(1);
    paragraph.push(sentence.join(" ") + ". ");
  }

  return paragraph;
};

export const load = async () => {
  const paragraph = await makeParagraph();

  return { paragraph };
};

export const actions = {
  default: async () => {
    return await makeParagraph();
  },
};
