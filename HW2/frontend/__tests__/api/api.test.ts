import { describe, expect, it, jest } from '@jest/globals';

const mockGetAPIKey = jest.fn(() => {
  return Promise.resolve('mocked-api-key');
});

const mockFetchArticles = jest.fn((API_KEY: string) => {
  if (API_KEY !== 'mocked-api-key') {
    return Promise.reject(new Error('Invalid API key'));
  }

  return Promise.resolve([
    {
      abstract: 'mocked-abstract',
      byline: {
        original: 'mocked-byline',
      },
      headline: {
        main: 'mocked-headline',
      },
      multimedia: [
        {
          caption: 'mocked-caption',
          credit: 'mocked-credit',
          default: {
            url: 'mocked-url',
          },
        },
      ],
      web_url: 'mocked-web-url',
    },
    {
      abstract: 'mocked-abstract-2',
      byline: {
        original: 'mocked-byline-2',
      },
      headline: {
        main: 'mocked-headline-2',
      },
      multimedia: [
        {
          caption: 'mocked-caption-2',
          credit: 'mocked-credit-2',
          default: {
            url: 'mocked-url-2',
          },
        },
      ],
      web_url: 'mocked-web-url-2',
    },
  ]);
});

// want to mock our calls to fetch the NYT API key
describe('NYT API Key', () => {
  it('should fetch our NYT API Key from the Flask backend', () => {
    const expectedKey = 'mocked-api-key';
    const actualKey = mockGetAPIKey();
    expect(actualKey).resolves.toEqual(expectedKey);
  });
});

// want to mock our calls to fetch data from the NYT API
describe('NYT API', () => {
  it('should fetch articles from the NYT API', () => {
    const expectedArticles = [
      {
        abstract: 'mocked-abstract',
        byline: {
          original: 'mocked-byline',
        },
        headline: {
          main: 'mocked-headline',
        },
        multimedia: [
          {
            caption: 'mocked-caption',
            credit: 'mocked-credit',
            default: {
              url: 'mocked-url',
            },
          },
        ],
        web_url: 'mocked-web-url',
      },
      {
        abstract: 'mocked-abstract-2',
        byline: {
          original: 'mocked-byline-2',
        },
        headline: {
          main: 'mocked-headline-2',
        },
        multimedia: [
          {
            caption: 'mocked-caption-2',
            credit: 'mocked-credit-2',
            default: {
              url: 'mocked-url-2',
            },
          },
        ],
        web_url: 'mocked-web-url-2',
      },
    ];

    const actualArticles = mockFetchArticles('mocked-api-key');
    expect(actualArticles).resolves.toEqual(expectedArticles);
  }),
  it('should throw an error for invalid API key', () => {
    const invalidKey = 'wrong-api-key';
    const expectedError = new Error('Invalid API key');
    const actualError = mockFetchArticles(invalidKey);
    expect(actualError).rejects.toThrow(expectedError);
  });
});
