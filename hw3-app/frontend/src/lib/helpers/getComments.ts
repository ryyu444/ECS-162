export default async function getComments() {
  const COMMENTS_QUERY_URL = 'http://localhost:8000/api/comments';
  const response = await fetch(COMMENTS_QUERY_URL, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch comments');
  }
  const data = await response.json();
  console.log(data);

  return data;
}
