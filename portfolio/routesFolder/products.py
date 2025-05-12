from flask import request, jsonify
from portfolio import app, db
from portfolio.models import *

from flask_sqlalchemy import SQLAlchemy
from flask import jsonify, render_template

from datetime import datetime

@app.route('/products')
def products():
    return jsonify({"products": ["Laptop", "Phone", "Tablet"]})