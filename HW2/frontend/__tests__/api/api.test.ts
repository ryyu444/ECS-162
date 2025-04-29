import { describe, expect, it } from '@jest/globals';
import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();

import getAPIKey from '../../src/lib/helpers/getAPIKey';
import getArticles from '../../src/lib/helpers/getArticles';

// URL for querying NYT API
const NYT_QUERY_URL =
  'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=%22UC%20Davis%22%20OR%20%22University%20of%20California%2C%20Davis%22&begin_date=20240101&end_date=20250426&api-key=';

describe('NYT API Key', () => {
  it('should fetch the API key from the server', () => {
    const mockApiKey = 'mocked-api-key';
    const mockResponse = { apiKey: mockApiKey };

    // mock the response from the server
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });

    // calls the function to fetch the API key
    const apiKey = getAPIKey();

    // checks mock for proper calling & response
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith('http://localhost:8000/api/key');
    expect(apiKey).resolves.toEqual(mockApiKey);
  });
});

describe('NYT API Calls', () => {
  // reset mock before each test for no interference
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should fetch articles from the NYT API', () => {
    const mockAPIKey = 'mocked-api-key';
    const mockResponse = [
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

    // mocks response from server for next call
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });

    // executes the function to fetch articles
    const articles = getArticles(mockAPIKey);

    // checks mock to ensure proper calling & response
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(`${NYT_QUERY_URL}${mockAPIKey}`);
    expect(articles).resolves.toEqual(mockResponse);
  });

  it('should throw an error for invalid API key', () => {
    const invalidAPIKey = 'invalid-api-key';
    const errorMessage = 'Invalid API key';

    // mocks rejection from server for next call
    fetchMock.mockRejectOnce(new Error(errorMessage));

    // calls articles function with invalid API key
    const articles = getArticles(invalidAPIKey);

    // checks mock to ensure that the response was invalid
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(`${NYT_QUERY_URL}${invalidAPIKey}`);
    expect(articles).rejects.toThrow(errorMessage);
  });
});
