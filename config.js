
const env = process.env;

export const nodeEnv = env.NODE_ENV || 'development';

export const logStars = function(message) {
  console.info('**********');
  console.info(message);
  console.info('**********');
};

export default {
  mongoDb: 'mongodb://localhost:27017/test', 
  //you might need to change this by removing the /test thing IFF the api/adventures/index.js can't find anything at this address
  seedDb: true,  
  port: env.PORT || 8080,
  host: env.HOST || 'localhost',
  get serverUrl(){
    return 'http://${this.host}:${this.port}';
  }
};