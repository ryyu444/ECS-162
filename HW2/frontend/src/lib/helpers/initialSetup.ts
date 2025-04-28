import getAPIKey from './getAPIKey';
import getArticles from './getArticles';

export default async function initialSetup() {
  // make call to backend to get API key
  const API_KEY = await getAPIKey();

  // query the NYT Article Search API for UC Davis articles
  const data = await getArticles(API_KEY);

  // extract numArticles of articles from data or less if not enough articles
  const numArticles = 12;
  const articles = data.slice(0, Math.min(numArticles, data.length));

  // create & set the article elements
  const articleElements = articles.map((article: HTMLElement) => {
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

function createArticleElement(article: any) {
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