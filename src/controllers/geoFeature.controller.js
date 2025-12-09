import shp from "shpjs";
import GeoFeature from "../models/GeoFeature.js";
import sequelize from "../config/database.js";

// Upload shapefile
export const uploadShapefile = async (req, res) => {
  try {
    const geojson = await shp(req.file.buffer);

    for (const feature of geojson.features) {
      await GeoFeature.create({
        properties: feature.properties,
        geom: feature.geometry,
      });
    }

    res.json({
      message: "Semua fitur berhasil tersimpan ke PostGIS",
      count: geojson.features.length,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal upload" });
  }
};

// Get all features
export const getAllFeatures = async (req, res) => {
  try {
    const rows = await GeoFeature.findAll();

    const features = rows.map((row) => ({
      type: "Feature",
      properties: row.properties,
      geometry: row.geom,
    }));

    res.json({
      type: "FeatureCollection",
      features: features,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch GeoJSON data" });
  }
};

// Get one feature
export const getFeatureById = async (req, res) => {
  const id = req.params.id;

  try {
    const feature = await GeoFeature.findByPk(id);

    if (!feature) {
      return res.status(404).json({ message: "Feature not found" });
    }

    res.json({
      type: "Feature",
      properties: feature.properties,
      geometry: feature.geom,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch feature" });
  }
};

// Update properties
export const updateProperties = async (req, res) => {
  const id = req.params.id;
  const { properties } = req.body;

  try {
    await sequelize.query(
      `
      UPDATE "GeoFeatures"
      SET properties = $1, "updatedAt" = NOW()
      WHERE id = $2
      `,
      { bind: [properties, id] }
    );

    res.json({ message: "Properties updated", id });
  } catch (err) {
    res.status(500).json({ error: "Failed to update properties" });
  }
};

// Update geometry
export const updateGeometry = async (req, res) => {
  const id = req.params.id;
  const { geometry } = req.body;

  try {
    await sequelize.query(
      `
      UPDATE "GeoFeatures"
      SET geom = ST_SetSRID(ST_GeomFromGeoJSON($1), 4326),
          "updatedAt" = NOW()
      WHERE id = $2
      `,
      { bind: [JSON.stringify(geometry), id] }
    );

    res.json({ message: "Geometry updated", id });
  } catch (err) {
    res.status(500).json({ error: "Failed to update geometry" });
  }
};

// Delete one
export const deleteById = async (req, res) => {
  const id = req.params.id;

  try {
    const deleted = await GeoFeature.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ message: "Feature not found" });
    }

    res.json({ message: `Feature ${id} deleted` });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete feature" });
  }
};

// Delete all
export const deleteAll = async (req, res) => {
  try {
    await GeoFeature.destroy({
      where: {},
      truncate: true,
      restartIdentity: true,
    });

    res.json({ message: "All GIS features deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete all features" });
  }
};
