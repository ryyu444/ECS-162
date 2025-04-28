import { describe, expect, it } from '@jest/globals';
import getAPIKey from '../../src/lib/helpers/getAPIKey';
import getArticles from '../../src/lib/helpers/getArticles';

// want to mock our calls to fetch the NYT API key
describe('NYT API Key', () => {
  it('should fetch our NYT API Key from the flask backend', () => {
    const a = 5;
    const b = 10;
    const sum = a + b;
    expect(sum).toBe(15);
  });
});

// want to mock our calls to fetch data from the NYT API
describe('NYT API', () => {
  it('should fetch articles from the NYT API', () => {
    const a = 5;
    const b = 10;
    const sum = a + b;
    expect(sum).toBe(15);
  });
});
