const getList = (author, keyword) => {
  // 先返回假数据（格式正确的）
  return [
    {
      id: 1,
      titile: "标题一",
      contentL: "内容A",
      createTime: 1628048767147,
      author: "李佳林",
    },
    {
      id: 2,
      titile: "标题二",
      contentL: "内容B",
      createTime: 1628048808168,
      author: "张全蛋",
    },
  ];
};

const getDetail = (id) => {
  // 先返回假数据（格式正确的）
  return [
    {
      id: 1,
      titile: "标题一",
      contentL: "内容A",
      createTime: 1628048767147,
      author: "李佳林",
    },
  ];
};

module.exports = {
  getList,
  getDetail
};
