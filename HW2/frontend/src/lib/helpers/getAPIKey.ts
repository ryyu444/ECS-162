export default async function getAPIKey(): Promise<string> {
    const API_KEY_QUERY_URL = 'http://localhost:8000/api/key';
    const API_KEY = await fetch(API_KEY_QUERY_URL).then((res) => res.json()).then((data) => data.apiKey);
    console.log(API_KEY);

    return API_KEY;
}