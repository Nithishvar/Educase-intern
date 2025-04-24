const db = require('../config/database.js');
const calculateDistance = require('../Utils/distancecalc.js');

exports.addSchool = (req, res) => {
    const { name, address, latitude, longitude } = req.body;

    if (!name || !address || isNaN(latitude) || isNaN(longitude)) {
        return res.status(400).json({ error: "Invalid input data" });
    }

    const sql = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, address, latitude, longitude], (err, result) => {
      if (err) {
        console.error(err);
        return res.redirect('/?success=false');
      }
      res.redirect('/?success=true');
    });
};

exports.listSchools = (req, res) => {
    const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res.render('list', { schools: null, error: null });
  }

  if (isNaN(latitude) || isNaN(longitude)) {
    return res.render('listschool', { schools: null, error: "Invalid coordinates" });
  }

  const userLat = parseFloat(latitude);
  const userLon = parseFloat(longitude);

//   db.query('SELECT * FROM schools', (err, results) => {
//     if (err) throw err;

//     const nearby = results.map(school => {
//       const distance = haversine(userLat, userLon, school.latitude, school.longitude);
//       return { ...school, distance };
//     }).filter(school => school.distance <= 10); // within 10km

//     res.render('list', { schools: nearby, error: null });
//   });
// };

db.query('SELECT * FROM schools', (err, results) => {
    if (err) return res.status(500).send("DB Error");

    const nearby = results
      .map(school => {
        const distance = calculateDistance(
          latitude,
          longitude,
          school.latitude,
          school.longitude
        );
        return { ...school, distance };
      })
      .sort((a, b) => a.distance - b.distance);

    res.render('list', {
      schools: nearby,
      latitude,
      longitude
    });
  });
};