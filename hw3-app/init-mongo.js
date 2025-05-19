db = db.getSiblingDB('mydatabase'); // Switch to the 'mydatabase' database

// Check if the users collection exists, and if not, insert the static user
db.createCollection('users');
db.users.find().count() === 0 &&
  db.users.insertOne({
    email: 'alice@example.com',
    hash: '$2a$10$CwTycUXWue0Thq9StjUM0uJ8DPLKXt1FYlwYpQW2G3cAwjKoh2WZK', // hashed password
    username: 'alice',
    userID: '123',
  });

/* 
    Comment structure:
    {
        articleID: '123',
        username: 'alice',
        text: 'This is a comment',
    }
*/
// create the collection for comments
// and insert some static comments if the collection is empty
db.createCollection('comments');
db.comments.find().count() === 0 &&
  db.comments.insertMany([
    {
      articleID: '0',
      username: 'alice',
      text: 'This is a comment',
    },
    {
      articleID: '1',
      username: 'bob',
      text: 'This is another comment',
    },
    {
      articleID: '2',
      username: 'charlie',
      text: 'This is a third comment',
    },
    {
      articleID: '3',
      username: 'dave',
      text: 'This is a fourth comment',
    },
    {
      articleID: '4',
      username: 'eve',
      text: 'This is a fifth comment',
    },
    {
      articleID: '5',
      username: 'frank',
      text: 'This is a sixth comment',
    },
    {
      articleID: '6',
      username: 'grace',
      text: 'This is a seventh comment',
    },
    {
      articleID: '7',
      username: 'heidi',
      text: 'This is an eighth comment',
    },
    {
      articleID: '8',
      username: 'ivan',
      text: 'This is a ninth comment',
    },
    {
      articleID: '9',
      username: 'judy',
      text: 'This is a tenth comment',
    },
  ]);
