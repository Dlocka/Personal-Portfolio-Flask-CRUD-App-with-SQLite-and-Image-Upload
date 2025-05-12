from portfolio import app, db
from portfolio.models import *

from flask_sqlalchemy import SQLAlchemy
from flask import render_template

from datetime import datetime

@app.route('/')
def index():
    return render_template('index.html');