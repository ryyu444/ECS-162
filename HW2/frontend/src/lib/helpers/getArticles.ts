export default async function getArticles(API_KEY: string) {
    const queryURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q="University of California, Davis"&begin_date=20200101&end_date=20250426&api-key=${API_KEY}`;
    const data = await fetch(queryURL).then((res) => res.json());
    console.log(data);

    return data;
}