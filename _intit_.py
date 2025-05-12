from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os
from sqlalchemy.orm import declarative_base

import importlib
import glob

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
app = Flask(__name__, static_folder="static")
app.secret_key='test'

basedir = os.path.abspath(os.path.dirname(__file__))
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + os.path.join(basedir, 'StuSec_Market.db')
print("abc:"+app.config["SQLALCHEMY_DATABASE_URI"]);


app.config['UPLOAD_FOLDER_image'] = os.path.join(basedir,'static','img');
app.config['ALLOWED_EXTENSIONS'] = {'png', 'jpg', 'jpeg', 'gif'}


# initialize the app with the extension
db = SQLAlchemy(app)

Base = declarative_base()
Base.query = db.session.query_property()
engine=create_engine(app.config["SQLALCHEMY_DATABASE_URI"],echo=True);
Base.metadata.create_all(engine);
Session=sessionmaker(bind=engine);



app.config['UPLOAD_FOLDER_IMAGE'] = 'static/img';
app.config['MAX_CONTENT_LENGTH'] = 5 * 1024 * 1024 
app.config['Allowed_IMAGE_FORMAT']={'png', 'jpg', 'jpeg', 'gif'};

routes_directory = 'portfolio/routes/'  # Folder containing route files
route_files = glob.glob(os.path.join(routes_directory, "*.py"))

for route_file in route_files:
    module_name = os.path.basename(route_file).replace('.py', '')
    importlib.import_module(f'portfolio.routes.{module_name}')


# Check if the static/img folder exists, otherwise create it
if not os.path.exists(app.config['UPLOAD_FOLDER_IMAGE']):
    os.makedirs(app.config['UPLOAD_FOLDER_IMAGE'])
import portfolio.routes

