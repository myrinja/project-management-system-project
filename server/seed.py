from flask import Flask
from app import db, Post, Category, User
from faker import Faker
import random
import string
from flask_bcrypt import Bcrypt 

app = Flask(__name__)

# Initialize the Faker library
fake = Faker()

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///blog.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Configure the app with your database
db.init_app(app)

# Initialize Bcrypt
bcrypt = Bcrypt(app)

# Generate random categories and image URLs
categories = [
    "Food blogs",
    "Travel blogs",
    "Health and fitness blogs",
    "Lifestyle blogs",
    "Fashion and beauty blogs",
    "DIY craft blogs",
    "Parenting blogs",
    "Business blogs",
    "Personal finance blogs",
    "Sports blogs"
]

image_urls = [
    "https://images.pexels.com/photos/1433052/pexels-photo-1433052.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/3586966/pexels-photo-3586966.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/33545/sunrise-phu-quoc-island-ocean.jpg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/1226302/pexels-photo-1226302.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/1707215/pexels-photo-1707215.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/937980/pexels-photo-937980.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/719396/pexels-photo-719396.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/2048434/pexels-photo-2048434.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/1496373/pexels-photo-1496373.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/52500/horse-herd-fog-nature-52500.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/33041/antelope-canyon-lower-canyon-arizona.jpg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/1139556/pexels-photo-1139556.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/235621/pexels-photo-235621.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://media.istockphoto.com/id/1450272068/photo/wind-sun-and-water-energy.webp?b=1&s=612x612&w=0&k=20&c=kqzh30craD6AVukqNYdkovgcP4gxV3QN6lgs07b1YUg=",
    "https://cdn.pixabay.com/photo/2023/10/20/17/19/pumpkin-8329917_640.jpg"
]

# Create a function to generate random email addresses
def generate_random_email():
    username = ''.join(random.choice(string.ascii_letters) for _ in range(8))
    domain = random.choice(['example.com', 'test.com', 'yourdomain.com'])
    return f"{username}@{domain}"

# Create a function to generate random passwords
def generate_random_password():
    # Generate a random string of characters (you can customize the length and content)
    return ''.join(random.choice(string.ascii_letters + string.digits) for _ in range(8))

# Create a new user with random data
def create_random_user():
    username = fake.name()
    email = generate_random_email()
    password = generate_random_password()
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    user = User(username=username, email=email, password=hashed_password)
    db.session.add(user)

# Create a new blog post with random data
def create_random_blog_post():
    title = fake.sentence()
    content = fake.text()
    author = random.choice(User.query.all())
    category = random.choice(categories)
    image_url = random.choice(image_urls)
    post = Post(title=title, content=content, user_id=author.id, image_url=image_url)
    db.session.add(post)

# Generate random data for users and blog posts
def generate_random_data(num_users, num_blog_posts):
    for _ in range(num_users):
        create_random_user()

    for _ in range(num_blog_posts):
        create_random_blog_post()

    db.session.commit()

if __name__ == '__main__':
    with app.app_context():
        # Generate 40 random users and 50 random blog posts
        generate_random_data(40, 50)
