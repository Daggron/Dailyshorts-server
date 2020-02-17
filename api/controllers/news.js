const redis = require('redis');
const {promisify} = require('util');
const client = redis.createClient(process.env.REDIS_URL);
const getAsync = promisify(client.get).bind(client);

exports.getdata = async (req,res)=>{
    try{
        const raw = await getAsync('news');
        const data = await JSON.parse(raw);
        res.status(200).json({
            success : true,
            data : data
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            status : false,
            message : "Error fetching data from server"
        })
    }
}