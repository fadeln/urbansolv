# **README.md (Short Version)**

````markdown
# UrbanSolv GIS API

A lightweight GIS backend built with **Node.js**, **Express**, and **PostgreSQL + PostGIS**.  
This API processes Shapefiles, converts them to GeoJSON, stores them in PostGIS, and serves the data for map libraries such as Leaflet, Mapbox, or OpenLayers.

## Features
- Upload Shapefile (.zip) → auto-convert to GeoJSON
- Store features in PostGIS (JSONB + GEOMETRY)
- Full CRUD endpoints for GIS data
- GeoJSON responses compatible with modern mapping libraries
- Clean modular project structure
- Swagger + Postman API documentation included

## Tech Stack
- Node.js + Express  
- Sequelize ORM  
- PostgreSQL + PostGIS  
- shpjs, multer  
- Leaflet (example frontend)

## Installation
```bash
npm install
````

Create PostgreSQL database:

```sql
CREATE DATABASE urbansolv;
CREATE EXTENSION postgis;
```

Update database config in:

```
src/config/database.js
```

Run the server:

```bash
npm start
```

API runs at:

```
http://localhost:3000
```

## API Endpoints

* `POST /upload` – upload Shapefile
* `GET /features` – get all features (GeoJSON)
* `GET /features/:id` – get feature by ID
* `PUT /features/:id` – update properties
* `PUT /features/:id/geometry` – update geometry
* `DELETE /features/:id` – delete one
* `DELETE /features` – delete all

## API Docs

Swagger UI: 

```
http://localhost:3000/api-docs
```

## Frontend Example (Leaflet)

```javascript
fetch("http://localhost:3000/features")
  .then(res => res.json())
  .then(data => L.geoJSON(data).addTo(map));
```
