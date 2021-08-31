const env = process.env.NODE_ENV;

let MYSQL_CONF;

if (env === "dev") {
  MYSQL_CONF = {
    host: "localhost",
    user: "root",
    password: "123456",
    port: "3306",
    database: "myblog",
  };
}

if (env === "production") {
  // 本质是要写线上的服务器和端口，但目前没有，暂时和本地一致
  MYSQL_CONF = {
    host: "localhost",
    user: "root",
    password: "123456",
    port: "3306",
    database: "myblog",
  };
}

module.exports = {
  MYSQL_CONF,
};
