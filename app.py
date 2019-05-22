import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template, request, redirect
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

#################################################
# Database Setup
#################################################

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///organ_transplant.db"
db = SQLAlchemy(app)
#db.reflect()
# reflect an existing database into a new model
Base = automap_base()

# reflect the tables
Base.prepare(db.engine, reflect=True)

# Create our session (link) from Python to the DB
#session = Session(engine)

# Save references to the table from database
transplant_data = Base.classes.organ_data

if __name__ == "__main__":
    app.run()
