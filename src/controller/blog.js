const getList = (author, keyword) => {
  // 先返回假数据（格式正确的）
  return [
    {
      id: 1,
      title: "标题一",
      contentL: "内容A",
      createTime: 1628048767147,
      author: "李佳林",
    },
    {
      id: 2,
      title: "标题二",
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
      id: id,
      title: "标题一",
      contentL: "内容A",
      createTime: 1628048767147,
      author: "李佳林",
    },
  ];
};

const newBlog = (blogData = {}) => {
  // blogData是一个博客对象，包含title、content属性
  console.log("新建博客:", blogData.title);
  return {
    id: 3, //表示新建博客插入到数据表中的id
  };
};

const updateBlog = (id, blogData = {}) => {
  // id是待更新的博客id
  // blogData同上
  console.log("已成功更新博客id:", id, blogData);
  return false;
};

const delBlog = (id) => {
  //id 待删除博客id
  console.log("已删除博客，id为:", id);
  return true;
};
module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog,
};
