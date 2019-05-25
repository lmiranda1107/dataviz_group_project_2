import os

#import pandas as pd
#import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template, request, redirect
from flask_sqlalchemy import SQLAlchemy

#################################################
# Flask Setup
#################################################
app = Flask(
    __name__, 
    template_folder='templates/light-bootstrap-dashboard-master',
    static_url_path='/assets',
    static_folder='templates/light-bootstrap-dashboard-master/static'
)

#################################################
# Database Setup
#################################################

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///organ_transplant.db"
# Create DB object to pass Flask app to it - SQLAlchemy object that can be used in Flask
db = SQLAlchemy(app)

#Create database model (emoji exercise 15.3.3)
#Create a class that defines what the table is and what columns are on the table
class Organ_data(db.Model):
    __tablename__ = 'organ_data' ecrce
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

#Create route that renders dashboard.html template
@app.route("/")
def home():
    active_tab = "dashboard"
    return render_template("dashboard.html", active = active_tab)

@app.route("/etl")
def etl():
    active_tab = "etl"
    return render_template("user.html", active = active_tab )


@app.route("/table")
def table():
    active_tab = "table"
    return render_template("table.html", active = active_tab )

@app.route("/map")
def map():
    active_tab = "maps"
    return render_template("maps.html",  active = active_tab)

@app.route("/chartdata", methods=['POST'])
def chartdata():
    print("pepee")


# create route that returns data for plotting
@app.route("/Top_organs_chart")
def top_organs_chart():
   # this will return the top 5 organs based on most transplants done
    results = db.session.query(Organ_data.organ_transplantation_type, func.count(Organ_data.organ_transplantation_type)).group_by(Organ_data.organ_transplantation_type).all()
#   results = db.session.query(Organ_data.organ_transplantation_type, Organ_data.count(Organ_data.type)).group_by(Organ_data.type).limit(5).all()
    
    organ_type = [result[0] for result in results]
    id = [result[1] for result in results]

    trace = {
        "x": organ_type,
        "y": id,
        "type": "bar"
    }

    return jsonify(trace)


if __name__ == "__main__":
    app.run()

#db.reflect()
# reflect an existing database into a new model
#Base = automap_base()

# reflect the tables
#Base.prepare(db.engine, reflect=True)

# Create our session (link) from Python to the DB
#session = Session(engine)

# Save references to the table from database
#transplant_data = Base.classes.organ_data



#if __name__ == "__main__":
 #   app.run()


'''
#Create 1st Chart (Donut)
@app.route("/ct-chart")
def organ_data_donut():
    
    # Query for the top 5 organ data
    count_results = 
    count = db.session.query(Organ_data.ct-chart, Emoji.score).\


if __name__ == "__main__":
    app.run(debug=True)
'''