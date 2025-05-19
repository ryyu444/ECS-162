<script lang="ts">
  import { getContext, onDestroy } from 'svelte';
  import { MessageSquare, X, CircleUser } from '@lucide/svelte';
  import './Comments.css';

  let { title, articleID, comments } = $props();
  title = title.substring(0, 25) + '...';
  let session = getContext('session');
  let isLoggedIn = session.isLoggedIn;
  let user = session.user;

  let commentsOpen = $state(false);
  let articleComments = $state(
    comments.filter((comment: any) => Number(comment.articleID) === articleID)
  );

  function toggleComments() {
    commentsOpen = !commentsOpen;
    if (commentsOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }

  onDestroy(() => {
    document.body.classList.remove('no-scroll');
  });

  async function createComment(e: any) {
    e.preventDefault();
    const commentInput = e.target.querySelector('.commentFormInput');
    const commentText = commentInput.value;
    console.log('Comment Text:', commentText);

    let newComment = {
      articleID: articleID,
      username: user.name,
      text: commentText,
    };

    articleComments = [...articleComments, newComment];
    commentInput.value = '';

    // send the new comment to the server
    let POST_URL = 'http://localhost:8000/api/comments';
    let res = await fetch(POST_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(newComment),
    });

    if (res.ok) {
      console.log('Comment posted successfully');
    } else {
      console.error('Error posting comment:', res.statusText);
    }
  }

  async function deleteComment(e: any) {
    // prevent default action
    e.preventDefault();

    // get the comment ID from the button
    const commentID = e.target.closest('.comment').id;
    console.log('Comment ID:', commentID);

    // remove the comment from the local state
    articleComments = articleComments.filter(
      (comment: any) => comment._id !== commentID
    );

    // send the delete request to the server
    let DELETE_URL = 'http://localhost:8000/api/comments/' + commentID;
    console.log('Delete URL:', DELETE_URL);

    let res = await fetch(DELETE_URL, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (res.ok) {
      console.log('Comment deleted successfully');
    } else {
      console.error('Error deleting comment:', res.statusText);
    }
  }
</script>

<div class="commentsContainer">
  <button class="commentsButton" onclick={toggleComments}>
    <MessageSquare size={16} />
    <p>{articleComments.length}</p>
  </button>
  {#if commentsOpen}
    <div class="commentsBackground">
      <div class={'commentsSideBar' + (commentsOpen ? ' open' : '')}>
        <div class="commentsSideBarTitle">
          <h2>{title}</h2>
          <X size={36} onclick={toggleComments} />
        </div>
        <div class="commentsSideBarContent">
          <div class="commentsHeader">
            <h1>Comments {articleComments.length}</h1>
            {#if isLoggedIn}
              <form class="commentForm" onsubmit={createComment}>
                <input
                  class="commentFormInput"
                  placeholder="Share your thoughts."
                  required
                />
                <div class="commentFormButtons">
                  <button
                    class="cancelButton"
                    onclick={() => {
                      document.querySelector('.commentInput').value = '';
                    }}>Cancel</button
                  >
                  <button type="submit" class="submitButton"> Submit </button>
                </div>
              </form>
            {/if}
          </div>
          <div class="commentsList">
            {#each articleComments as comment}
              <div class="comment" id={comment._id}>
                <div class="commentContent">
                  <div class="commentUser">
                    <CircleUser size={24} />
                    <p>{comment.username}</p>
                  </div>
                  <p class="commentText">{comment.text}</p>
                </div>
                <div class="commentActions">
                  <button class="replyButton"> Reply </button>
                  {#if isLoggedIn && user.name === 'moderator'}
                    <button class="deleteButton" onclick={deleteComment}>
                      Delete
                    </button>
                  {/if}
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>
