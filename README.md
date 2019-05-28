# Interactive Dashboard Group Project 2
## Participants:
1. Carolina Muizzi
2. Lissette Miranda
3. Yissel Fernandez

## Objective:
	- To create a user friendly, interactive dashboard for students to learn about organ donation statistics and facts. 

## Data Munging Technique:
	- Dataset extracted from HRSA: https://data.hrsa.gov/data/download?data=organ#organ
	- Deleted columns with irrelevant data and renamed columns (Jupyter Notebooks)
	- Imported CSV into SQLite
	- Created an API using db data to render graphs and map
		○ API endpoint /chartdata -> POST request
		This API endpoint is responsible for accessing the db and sending the data to the front-end as JSON

## Coding Approach:
	- Set Server
		○ App.py
			§ Flask
			
	- Template: Used bootstrap dashboard template to render our data
		○ https://www.creative-tim.com/product/light-bootstrap-dashboard
		
	- Static:
		○ Demo.js
			§ Plots design with Chart.js library:
				□ Pie Chart
				□ Bar Chart
                □ Google map