import data from '../data/Module';
const express = require('express');
const app = express();

// const excelToJson = require('excel-as-json').processFile;
// excelToJson('./excel1.xlsx', './row.json', (err, data) => console.log('JSON conversion failure'));

app.get('/', function(req, res) {
	res.send(data);
});
app.listen(8082, () => console.log('listening'));
