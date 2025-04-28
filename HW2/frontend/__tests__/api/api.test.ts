import { describe, expect, it } from '@jest/globals';
import getAPIKey from "../../src/lib/helpers/getAPIKey";
import getArticles from "../../src/lib/helpers/getArticles";

// want to mock our calls to fetch the NYT API key
describe('API Tests', () => {
  it('should add two numbers', () => {
    const a = 5;
    const b = 10;
    const sum = a + b;
    expect(sum).toBe(15);
  });
});
// want to mock our calls to fetch data from the NYT API

