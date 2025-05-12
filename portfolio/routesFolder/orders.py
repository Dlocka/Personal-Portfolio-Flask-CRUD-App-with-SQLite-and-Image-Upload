from portfolio import app, db
from portfolio.models import *

from flask_sqlalchemy import SQLAlchemy
from flask import jsonify, render_template

from datetime import datetime

@app.route('/orders')
def orders():
    return jsonify({"orders": ["Order1", "Order2", "Order3"]})
