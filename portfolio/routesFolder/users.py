from portfolio import app, db
from portfolio.models import *

from flask_sqlalchemy import SQLAlchemy
from flask import render_template
from flask import jsonify
from datetime import datetime

@app.route('/users')
def users():
    return jsonify({"users": ["Alice", "Bob", "Charlie"]})