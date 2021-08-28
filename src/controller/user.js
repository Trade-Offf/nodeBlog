const loginCheck = (username, password) => {
  // 先用假数据
  console.log("用户名:", username, "密码:", password);
  if (username === "zhangsan" && password === "123") {
    return true;
  }
  return false;
};

module.exports = {
  loginCheck,
};
