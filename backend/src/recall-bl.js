const fs = require('fs');
const dataForge = require('data-forge');

const csvString = fs.readFileSync('./recall_data.csv').toString();
const dataFrame = dataForge.fromCSV(csvString).dropSeries(['','index']).parseDates('date').parseFloats('recall').setIndex('date');

const getRecalls = (from_ts,to_ts)=>{
    return dataFrame.between(new Date(from_ts),new Date(to_ts)).toArray();
}

module.exports = {
    getRecalls
}