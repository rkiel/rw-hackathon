
var _store = {
  list: [
    { title: 'Project 1', code: 'project1', direct: true,  total: 0 },
    { title: 'Project 2', code: 'project2', direct: true,  total: 0 },
    { title: 'PTO',       code: 'pto',      direct: false, total: 0 },
    { title: 'Holiday',   code: 'holiday',  direct: false, total: 0 },
    { title: 'Training',  code: 'training', direct: false, total: 0 }
  ]
};

function getList() {
  return _store.list;
}

var ChargeCodeStore = {
  getList: getList
}

module.exports = ChargeCodeStore;
