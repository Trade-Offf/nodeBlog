const { loginCheck } = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/resModel");

const handleUserRouter = (req, res) => {
  const method = req.method; // GET or POST

  // 登陆接口
  if (method === "POST" && req.path === "/api/user/login") {
    const { username, password } = req.body;
    const result = loginCheck(username, password);
    if (result) {
      return new SuccessModel("登陆成功");
    } else {
      return new ErrorModel("账号或密码错误");
    }
  }
};

module.exports = handleUserRouter;
