from flask import Flask, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash


app = Flask(__name__, instance_relative_config=True)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
db = SQLAlchemy(app)

# For Secret Key
app.config.from_pyfile('config.py')
secret = app.config['SECRET_KEY']


# GET /api/items: Returns a list of items in JSON format.
@app.route('/api/items', methods=['GET'])
def get_items():
    items = Item.query.all()
    return jsonify([item.to_dict() for item in items])

# POST /api/items: Accepts a JSON payload to create a new item.
@app.route('/api/items', methods=['POST'])
def create_item():
    data = request.get_json()
    name = data.get('name')
    description = data.get('description')
    price = data.get('price')

    if not name or price <= 0:
        return jsonify({'error': 'Invalid data'}), 400

    new_item = Item(name=name, description=description, price=price)
    db.session.add(new_item)
    db.session.commit()
    return jsonify(new_item.to_dict()), 201

# GET /api/items/<id>: Returns the details of a specific item by ID.
@app.route('/api/items/<int:id>', methods=['GET'])
def get_item(id):
    item = Item.query.get(id)
    if item:
        return jsonify(item.to_dict())
    return jsonify({'error': 'Item not found'}), 404

# PUT /api/items/<id>: Updates an existing item by ID.
@app.route('/api/items/<int:id>', methods=['PUT'])
def update_item(id):
    data = request.get_json()
    item = Item.query.get(id)
    if not item:
        return jsonify({'error': 'Item not found'}), 404
   
    name = data.get('name')
    description = data.get('description')
    price = data.get('price')
    
    if not name or price <= 0:
         return jsonify({'error': 'Invalid data'}), 400

    if name:
        item.name = name
    if description:
        item.description = description
    if price is not None and price > 0:
        item.price = price

    db.session.commit()
    return jsonify(item.to_dict())

# DELETE /api/items/<id>: Deletes an item by ID.
@app.route('/api/items/<int:id>', methods=['DELETE'])
def delete_item(id):
    item = Item.query.get(id)
    if not item:
        return jsonify({'error': 'Item not found'}), 404

    db.session.delete(item)
    db.session.commit()
    return jsonify({'message': 'Item deleted'}), 200


##################################################################
# For Item Table
class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(200), nullable=True)
    price = db.Column(db.Float, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price': self.price
        }
    
# Class for Users Table
class Users(db.Model):
    uid = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    password = db.Column(db.String(100), nullable=False)

    def check_password(self, password):
        return check_password_hash(self.password, password)
    
# Create user for the sake of testing the login page
def create_user():  
    with app.app_context():
        #Check if user exists so that it won't create another user with the username 'user123'
        username = 'user123'
        password = 'pass123'
        existing_user = Users.query.filter_by(username=username).first()
        if existing_user:
            return 

        # Hash the password before saving to db
        hashed_password = generate_password_hash(password)

        # Instance for creating new user
        new_user = Users(username=username, password=hashed_password)

        # Insert the new user 
        db.session.add(new_user)
        db.session.commit()

def create_tables():
    with app.app_context():
        db.create_all()

# calls the method create_tables() and create_user()
create_tables()
create_user()



##################################################################
# Login
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = Users.query.filter_by(username=username).first()
    
    if user and user.check_password(password):
        session['user'] = username
        return jsonify({'message': 'Logged in successfully.', 'user': username}), 200
    else:
        return jsonify({'error': 'Invalid username or password'}), 401

# Logout
@app.route('/api/logout', methods=['POST'])
def logout():
    session.pop('user', None)
    return jsonify({'message': 'Logged out successfully'}), 200



if __name__ == '__main__':
    app.run(debug=True)