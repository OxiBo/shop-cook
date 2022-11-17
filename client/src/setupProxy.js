// https://www.udemy.com/course/node-with-react-fullstack-web-development/learn/lecture/12072146#content

const proxy = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(proxy(["/api", "/auth/google"], { target: "http://localhost:4040" })); // server localhost port
};

// or
/* 

const proxy = require('http-proxy-middleware');
 
module.exports = function(app) {
    app.use(proxy('/auth/google', { target: 'http://localhost:5000' }));
    app.use(proxy('/api/**', { target: 'http://localhost:5000' }));
};
*/
