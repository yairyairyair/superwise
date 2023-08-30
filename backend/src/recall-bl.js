const fs = require('fs');
const dataForge = require('data-forge');

const data = []


const csvString = fs.readFileSync('./recall_data.csv').toString();
const dataFrame = dataForge.fromCSV(csvString).setIndex('date').dropSeries(['','index']).parseDates('date').parseFloats('recall');

const getRecalls = (from_ts,to_ts)=>{
    // if(from_ts && to_ts){
    //     return dataFrame.between()
    // }
    // TODO: add from and to support
    return dataFrame.toArray();
}

module.exports = {
    getRecalls
}