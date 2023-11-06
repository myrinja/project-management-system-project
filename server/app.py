from flask import Flask,request, jsonify
from flask import Flask, request, jsonify, render_template, redirect, flash
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from datetime import datetime
from flask_cors import CORS 
from flask_bcrypt import Bcrypt


app = Flask(__name__)
bcrypt = Bcrypt(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///blog.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = 'your_secret_key'

db = SQLAlchemy(app)
migrate = Migrate(app, db)

CORS(app) 


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)  
    posts = db.relationship('Post', backref='author', lazy=True)



# Create a new user
@app.route('/registration', methods=['POST'])
def register_user():
    data = request.get_json()

    if 'username' not in data or 'email' not in data or 'password' not in data:
        return jsonify({'error': 'Missing required fields'}), 400

    # Check if the username or email is already taken
    existing_user = User.query.filter_by(username=data['username']).first()
    existing_email = User.query.filter_by(email=data['email']).first()
    
    if existing_user:
        return jsonify({'error': 'Username already exists'}), 409
    if existing_email:
        return jsonify({'error': 'Email already exists'}), 409

    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    new_user = User(username=data['username'], email=data['email'], password=hashed_password)

    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User registered successfully'}), 201

# Create a login route
@app.route('/login', methods=['POST'])
def login_user():
    data = request.get_json()

    if 'email' not in data or 'password' not in data:
        return jsonify({'error': 'Missing email or password'}), 400

    user = User.query.filter_by(email=data['email']).first()

    if user and bcrypt.check_password_hash(user.password, data['password']):
        return jsonify({'message': 'Login successful'}), 200  
    else:
        return jsonify({'error': 'Incorrect email or password'}), 401

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.String(200), nullable=True)
    date_posted = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    categories = db.relationship('Category', secondary='post_category', backref='posts', lazy=True)

class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)

post_category = db.Table('post_category',
    db.Column('post_id', db.Integer, db.ForeignKey('post.id'), primary_key=True),
    db.Column('category_id', db.Integer, db.ForeignKey('category.id'), primary_key=True)
)


# Create a new user
@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    new_user = User(username=data['username'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User created successfully!'})

# Get all users
@app.route('/users', methods=['GET'])
def get_all_users():
    users = User.query.all()
    output = []
    for user in users:
        user_data = {}
        user_data['id'] = user.id
        user_data['username'] = user.username
        user_data['posts'] = [post.title for post in user.posts]
        output.append(user_data)
    return jsonify({'users': output})

# Create a new post
@app.route('/posts', methods=['POST'])
def create_post():
    data = request.get_json()
    new_post = Post(title=data['title'], content=data['content'], user_id=data['user_id'], image_url=data['image_url'])
    db.session.add(new_post)
    db.session.commit()
    return jsonify({'message': 'Post created successfully!'})

##get all posts

@app.route('/posts', methods=['GET'])
def get_all_posts():
    posts = Post.query.all()
    output = []
    for post in posts:
        post_data = {
            'id': post.id,
            'title': post.title,
            'content': post.content,
            'image_url': post.image_url,
            'date_posted': post.date_posted,
            'author': post.author.username,
            'categories': [category.name for category in post.categories]
        }
        output.append(post_data)
    return jsonify({'posts': output})


# Get a single post by ID
@app.route('/posts/<int:post_id>', methods=['GET'])
def get_post(post_id):
    post = Post.query.get_or_404(post_id)
    post_data = {}
    post_data['id'] = post.id
    post_data['title'] = post.title
    post_data['content'] = post.content
    post_data['image_url'] = post.image_url
    post_data['date_posted'] = post.date_posted
    post_data['author'] = post.author.username
    post_data['categories'] = [category.name for category in post.categories]
    return jsonify({'post': post_data})

# Update a post by ID
@app.route('/posts/<int:post_id>', methods=['PUT'])
def update_post(post_id):
    post = Post.query.get_or_404(post_id)
    data = request.get_json()
    post.title = data['title']
    post.content = data['content']
    post.image = data['image_url']
    post.date_posted = datetime.utcnow()
    db.session.commit()
    return jsonify({'message': 'Post updated successfully!'})

# Delete a post by ID
@app.route('/posts/<int:post_id>', methods=['DELETE'])
def delete_post(post_id):
    post = Post.query.get_or_404(post_id)
    db.session.delete(post)
    db.session.commit()
    return jsonify({'message': 'Post deleted successfully!'})

# Create a new category
@app.route('/categories', methods=['POST'])
def create_category():
    data = request.get_json()
    new_category = Category(name=data['name'])
    db.session.add(new_category)
    db.session.commit()
    return jsonify({'message': 'Category created successfully!'})

# Get all categories
@app.route('/categories', methods=['GET'])
def get_all_categories():
    categories = Category.query.all()
    output = []
    for category in categories:
        category_data = {}
        category_data['id'] = category.id
        category_data['name'] = category.name
        category_data['posts'] = [post.title for post in category.posts]
        output.append(category_data)
    return jsonify({'categories': output})

if __name__ == '__main__':
    # Create the database tables
    with app.app_context():
        db.create_all()
        
    app.run(debug=True)
