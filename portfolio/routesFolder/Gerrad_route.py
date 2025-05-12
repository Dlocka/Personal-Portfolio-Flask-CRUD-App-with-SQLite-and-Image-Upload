from portfolio import app, db
from portfolio.models import *

from flask_sqlalchemy import SQLAlchemy
from flask import jsonify, render_template

from datetime import datetime

ModuleName='AssessmentModule/' ##must be unique

@app.route(ModuleName+'CreateQuestion')
def orders():
    return render_template('Gerrad.html');