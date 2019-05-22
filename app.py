import os

#import pandas as pd
#import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

##################################################
from flask import Flask, jsonify, render_template, request, redirect
from flask_sqlalchemy import SQLAlchemy

#################################################
# Database Setup
#################################################

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///organ_transplant.db"
# Create DB object to pass Flask app to it - SQLAlchemy object that can be used in Flask
db = SQLAlchemy(app)

#Create a class that defines what the table is and what columns are on the table
class Organ_data(db.Model):
    __tablename__ = 'organ_data'
    #Define the Columns
    id = db.Column('id', db.Integer, primary_key=True) #takes in 3 arguments SQLAlchemy requires a primary key - https://www.youtube.com/watch?v=Tu4vRU4lt6k
    organ_transplantation_type = db.Column(db.String(64))
    organ_procurement_organization_name = db.Column(db.String(64))
    organ_procurement_organization_city = db.Column(db.String(64))
    county = db.Column(db.String(64))
    state = db.Column(db.String(64))
    state_abbreviation = db.Column(db.String(64))
    data_warehouse_record_create_date_text = db.Column(db.String(64))
    geocoding__primary_x_coordinate = db.Column(db.Float)
    geocoding_primary_y_coordinate = db.Column(db.Float)
   
    def __repr__(self):
        return '<Organ_data %r>' % (self.name)

#db.reflect()
# reflect an existing database into a new model
#Base = automap_base()

# reflect the tables
#Base.prepare(db.engine, reflect=True)

# Create our session (link) from Python to the DB
#session = Session(engine)

# Save references to the table from database
#transplant_data = Base.classes.organ_data

if __name__ == "__main__":
    app.run()
