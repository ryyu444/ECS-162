'use strict';

window.addEventListener('load', setup);

async function setup() {
  // make call to NYT API to get top stories
  const API_KEY = '';
  const queryURL = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${API_KEY}`;
  const res = await fetch(queryURL);
  const data = await res.json();

  // extract numArticles of articles from data
  const numArticles = 12;
  const articles = data.results.slice(0, numArticles);

  // create & set the article elements
  const articleElements = articles.map((article) => {
    return createArticleElement(article);
  });
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
  articleElement.href = article.url;
  articleElement.classList.add('article');

  // set html to article contents: image, title, abstract
  articleElement.innerHTML = `
        <div class="articleImageContainer">
            <img class="articleImage" src="${article.multimedia[1].url}" alt="${
    article.title
  }">
            <p class="articleImageCopyright">${
              article.multimedia[1].copyright
                ? article.multimedia[1].copyright
                : 'The New York Times'
            }</p>
        </div>
        <div class="articleContent">
            <h2 class="articleTitle">${article.title}</h2>
            <p class="articleAbstract">${article.abstract}</p>
        </div>
    `;

  // return the article element as a string
  return articleElement.outerHTML;
}
