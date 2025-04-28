export default async function getArticles(API_KEY: string) {
    const queryURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=%22UC%20Davis%22%20OR%20%22University%20of%20California%2C%20Davis%22&begin_date=20240101&end_date=20250426&api-key=${API_KEY}`;
    const data = await fetch(queryURL).then((res) => res.json()).then((data) => data.response.docs);
    console.log(data);

    return data;
}