<script>
  import getAPIKey from '../../helpers/getAPIKey';
  import getArticles from '../../helpers/getArticles';
  import getComments from '../../helpers/getComments';
  import Comments from './comments/Comments.svelte';
  import './Articles.css';

  let fetchArticles = async () => {
    const API_KEY = await getAPIKey();
    const docs = await getArticles(API_KEY).then((d) => d.response.docs);

    // extract numArticles of articles from docs or less if not enough articles
    const numArticles = 12;
    const articles = docs.slice(0, Math.min(numArticles, docs.length));
    return articles;
  };

  let fetchComments = async () => {
    const commentsData = await getComments();
    return commentsData;
  };

  let promises = Promise.all([fetchArticles(), fetchComments()]);
</script>

<main class="articles">
  {#await promises}
    <p>Loading...</p>
  {:then results}
    {#each results[0] as article, id}
      <div class="articleContainer" id={'article-' + id}>
        <a class="article" href={article.web_url} target="_blank">
          <div class="articleImageContainer">
            <img
              class="articleImage"
              src={article.multimedia.default.url}
              alt={article.multimedia.caption}
            />
            <p class="articleImageCopyright">
              {article.multimedia.credit
                ? article.multimedia.credit
                : 'The New York Times'}
            </p>
          </div>
          <div class="articleContent">
            <h2 class="articleTitle">{article.headline.main}</h2>
            <p class="articleAbstract">{article.abstract}</p>
          </div>
        </a>
        <Comments title={article.headline.main} articleID={id} comments={results[1]} />
      </div>
    {/each}
  {:catch error}
    <p>Error loading articles: {error.message}</p>
  {/await}
</main>
