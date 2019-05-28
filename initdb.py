from app import db
from app import Organ_data
import json

db.drop_all()
db.create_all()

with open('./db/organ_data.json') as json_file: 
    data = json.load(json_file)
    for _dataItem in data:
        record = Organ_data(
            organ_transplantation_type = _dataItem["organ_transplantation_type"],
            organ_procurement_organization_name = _dataItem["organ_procurement_organization_name"],
            organ_procurement_organization_city = _dataItem["organ_procurement_organization_city"],
            county = _dataItem["county"],
            state = _dataItem["state"],
            state_abbreviation = _dataItem["state_abbreviation"],
            data_warehouse_record_create_date_text = _dataItem["data_warehouse_record_create_date_text"],
            geocoding__primary_x_coordinate = _dataItem["geocoding__primary_x_coordinate"],
            geocoding__primary_y_coordinate = _dataItem["geocoding__primary_y_coordinate"]
        )
        db.session.add(record)
        db.session.commit()

