export default async function getAPIKey(): Promise<string> {
    const API_KEY_QUERY_URL = 'http://localhost:8000/api/key';
    const API_KEY_JSON = await fetch(API_KEY_QUERY_URL).then((res) => res.json());
    const API_KEY = API_KEY_JSON.apiKey;
    console.log(API_KEY);

    return API_KEY;
}