from flask import Flask, redirect, request, session, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from authlib.integrations.flask_client import OAuth
from authlib.common.security import generate_token
from bson import ObjectId
import os

app = Flask(__name__)
CORS(app, supports_credentials=True, origins=["http://localhost:5173"])
app.secret_key = os.urandom(24)

oauth = OAuth(app)
nonce = generate_token()

oauth.register(
    name=os.getenv('OIDC_CLIENT_NAME'),
    client_id=os.getenv('OIDC_CLIENT_ID'),
    client_secret=os.getenv('OIDC_CLIENT_SECRET'),
    #server_metadata_url='http://dex:5556/.well-known/openid-configuration',
    authorization_endpoint="http://localhost:5556/auth",
    token_endpoint="http://dex:5556/token",
    jwks_uri="http://dex:5556/keys",
    userinfo_endpoint="http://dex:5556/userinfo",
    device_authorization_endpoint="http://dex:5556/device/code",
    client_kwargs={'scope': 'openid email profile'}
)

# MongoDB connection
MONGO_DB_URI = os.getenv('MONGO_URI')
client = MongoClient(MONGO_DB_URI)
db = client['mydatabase']
collection = db['comments']

@app.route('/')
def home():
    user = session.get('user')
    if user:
        return f"<h2>Logged in as {user['email']}</h2><a href='/logout'>Logout</a>"
    return '<a href="/login">Login with Dex</a>'

@app.route('/login')
def login():
    session['nonce'] = nonce
    redirect_uri = 'http://localhost:8000/authorize'
    return oauth.flask_app.authorize_redirect(redirect_uri, nonce=nonce)

@app.route('/authorize')
def authorize():
    token = oauth.flask_app.authorize_access_token()
    nonce = session.get('nonce')

    user_info = oauth.flask_app.parse_id_token(token, nonce=nonce)  # or use .get('userinfo').json()
    session['user'] = user_info
    redirect_uri = 'http://localhost:5173/'
    return redirect(redirect_uri)

@app.route('/logout')
def logout():
    session.clear()
    redirect_uri = 'http://localhost:5173/'
    return redirect(redirect_uri)

@app.route('/api/comments', methods=['GET'])
def get_comments():
    comments = list(collection.find())
    for comment in comments:
        comment['_id'] = str(comment['_id'])
    return jsonify(comments)

@app.route('/api/comments', methods=['POST'])
def post_comment():
    comment = request.json
    result = collection.insert_one(comment)
    comment['_id'] = str(result.inserted_id)
    return jsonify(comment), 201

@app.route('/api/comments/<comment_id>', methods=['DELETE'])
def delete_comment(comment_id):
    result = collection.delete_one({'_id': ObjectId(comment_id)})
    if result.deleted_count == 1:
        return jsonify({'message': 'Comment deleted'}), 200
    return jsonify({'error': 'Comment not found'}), 404

@app.route('/api/session')
def get_session():
    user = session.get("user")
    return jsonify({'user': user if user else None})

@app.route('/api/key')
def get_key():
    return jsonify({'apiKey': os.getenv('NYT_API_KEY')})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)
