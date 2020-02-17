const cronJob = require('node-cron');
const fetchData = require('./tasks/tasks');

function getdata(){
    cronJob.schedule('* * * * *',()=>{
        console.log('running every minute')
        fetchData();
    });
}


module.exports = getdata;
