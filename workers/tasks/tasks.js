const redis = require('redis');
const client = redis.createClient(process.env.REDIS_URL);
const {promisify} = require('util');
const setAsync = promisify(client.set).bind(client);
const axios = require('axios');



async function fetchData(){
    let date = new Date();
    let pageCount = 0;
    let totalPage = 30;
    let data = [];
    let BASE_URL = `https://app.dailynow.co/graphql?query=query+fetchLatest($params:+QueryPostInput)+%7B+latest(params:+$params)+%7B+id,title,url,publishedAt,createdAt,image,ratio,placeholder,views,readTime,publication+%7B+id,+name,+image+%7D,tags+%7D+%7D&variables=%7B%22params%22:%7B%22latest%22:%22${date}%22,%22page%22:${pageCount},%22pageSize%22:30,%22pubs%22:%22%22,%22tags%22:%22development,javascript,google,webdev,tech,startups,apps,mobile,react,react-native,nodejs,design%22,%22sortBy%22:%22popularity%22%7D%7D`
    while(pageCount<totalPage){
        try{
            let res = await axios.get(BASE_URL);
            // console.log(res.data.data.latest);
             data = [...data,...res.data.data.latest];
            let raw = JSON.stringify(data)
            const success = await setAsync('news',raw);
            console.log(success);
            pageCount++;
        }catch(err){
            console.log(err);
        }
        
    }
}


module.exports = fetchData;