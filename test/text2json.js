const fs = require('fs')
const xlsxj = require("xlsx-to-json")

xlsxj({
    input: "./Game 4 Good - Questions Input - English.xlsx", 
    output: "demgames-debate-en.json"
    }, (err, result) => {
        if (err) throw err
        console.log(result)
    }
)