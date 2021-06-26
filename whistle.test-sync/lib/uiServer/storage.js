const cache = {};
let inited;

function handleRules(rules) {
  // 返回为空忽略
  if (!rules) {
    return;
  }
  // 将数据存到远程存储服务（这里以存到内存为例，方便演示界面如何同步远程规则）
  cache.rules = rules;
}

function handleValues(values) {
  // 返回为空忽略
  if (!values) {
    return;
  }
  // 将数据存到远程存储服务（这里以存到内存为例，方便演示界面如何同步远程规则）
  cache.values = values;
}

module.exports = ({ getRules, getValues }) => {
  if (inited) {
    return;
  }
  inited = true;
  // 定时获取 Rules & Values
  const loadData = () => {
    getRules(handleRules);
    getValues(handleValues);
  };
  loadData();
  setInterval(loadData, 5000);
};

module.exports.getRules = () => {
  return cache.rules;
};

module.exports.getValues = () => {
  return cache.values;
};
