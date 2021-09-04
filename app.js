const querystring = require("querystring");
const handleBlogRouter = require("./src/router/blog");
const handleUserRouter = require("./src/router/user");

// session 数据
const SESSION_DATA = {};

// 获取处理POST传参
const getPostData = (req) => {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== "POST") {
      resolve({});
      return;
    }
    if (req.headers["content-type"] !== "application/json") {
      resolve({});
      return;
    }
    let postData = "";
    req.on("data", (chunk) => {
      postData += chunk.toString();
    });
    req.on("end", () => {
      if (!postData) {
        resolve({});
        return;
      }
      resolve(JSON.parse(postData));
    });
  });
  return promise;
};

const serverHandle = (req, res) => {
  // 设置返回的数据格式 JSON
  res.setHeader("Content-type", "application/json");

  const url = req.url;

  // 解析url，获取path
  req.path = url.split("?")[0];
  // 解析url，获取参数
  req.query = querystring.parse(url.split("?")[1]);

  // 解析cookie
  req.cookie = {};
  const cookieStr = req.headers.cookie || "";
  cookieStr.split(";").forEach((item) => {
    if (!item) {
      return;
    }
    const arr = item.split("=");
    const key = arr[0].trim();
    const value = arr[1].trim();
    req.cookie[key] = value;
  });

  // 解析 session
  let needSetCookie = false;
  let userId = req.cookie.userId;

  if (userId) {
    if (!SESSION_DATA[userId]) {
      SESSION_DATA[userId] = {};
    }
  } else {
    needSetCookie = true;
    userId = `${Date.now()}`;
    SESSION_DATA[userId] = {};
  }
  req.session = SESSION_DATA[userId];

  // 处理post data
  getPostData(req).then((postData) => {
    req.body = postData;

    // 处理 blog 路由
    const blogResult = handleBlogRouter(req, res);
    if (blogResult) {
      blogResult.then((blogData) => {
        if (needSetCookie) {
          res.setHeader("Set-Cookie", `userId=${userId}; path=/; httpOnly;`);
        }
        res.end(JSON.stringify(blogData));
      });
      return;
    }

    // 处理 user 路由
    const userResult = handleUserRouter(req, res);
    if (userResult) {
      userResult.then((userData) => {
        if (needSetCookie) {
          res.setHeader("Set-Cookie", `userId=${userId}; path=/; httpOnly;`);
        }
        res.end(JSON.stringify(userData));
      });
      return;
    }

    // 为命中路由，返回 404
    res.writeHead(404, { "Content-type": "text/plain" });
    res.write("404 Not Fount\n");
    res.end();
  });
};

module.exports = serverHandle;

// process.env.NODE_ENV
