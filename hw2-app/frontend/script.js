'use strict';

window.addEventListener('load', setup);

async function setup() {
  // make call to NYT API to get top stories
  const API_KEY_QUERY_URL = 'http://localhost:8000/api/key';
  const API_KEY = await fetch(API_KEY_QUERY_URL).then((res) => res.json()).then((data) => data.apiKey);
  console.log(API_KEY);
  
  const queryURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=%22UC%20Davis%22%20OR%20%22University%20of%20California%2C%20Davis%22&begin_date=20240101&end_date=20250426&api-key=${API_KEY}`;
  const data = await fetch(queryURL).then((res) => res.json()).then((data) => data.response.docs);
  console.log(data);

  // extract numArticles of articles from data
  const numArticles = 12;
  const articles = data.slice(0, Math.min(numArticles, data.length));

  // create & set the article elements
  const articleElements = articles.map((article) => {
    return createArticleElement(article);
  });``
  window.document.querySelector('.articles').innerHTML =
    articleElements.join('');

  // set date
  const date = new Date();
  const day = date.toLocaleString('en-us', { weekday: 'long' });
  const dateString = date.toLocaleDateString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  window.document.querySelector('.navbarDate').innerHTML =
    day + ', ' + dateString;
}

function createArticleElement(article) {
  // create the article element (a tag to redirect to article)
  const articleElement = document.createElement('a');
  articleElement.href = article.web_url;
  articleElement.classList.add('article');

  // set html to article contents: image, title, abstract
  articleElement.innerHTML = `
        <div class="articleImageContainer">
            <img class="articleImage" src="${article.multimedia.default.url}" alt="${
    article.title
  }">
            <p class="articleImageCopyright">${
              article.multimedia.credit
                ? article.multimedia.credit
                : 'The New York Times'
            }</p>
        </div>
        <div class="articleContent">
            <h2 class="articleTitle">${article.headline.main}</h2>
            <p class="articleAbstract">${article.abstract}</p>
        </div>
    `;

  // return the article element as a string
  return articleElement.outerHTML;
}
