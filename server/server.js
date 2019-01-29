const data = require('../data/Module/moduleData.json');
const express = require('express');
const app = express();

// const excelToJson = require('excel-as-json').processFile;
// excelToJson('./excel1.xlsx', './row.json', (err, data) => console.log('JSON conversion failure'));
app.get('/api/modules', (req, res) => {
	res.json({ data });
});

app.listen(9000, () => console.log('listening'));
