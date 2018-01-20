const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const storage = multer.diskStorage({
    // 设置上传后文件路径，uploads文件夹会自动创建。
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    // 给上传文件重命名，获取添加后缀名
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '_' + file.originalname);
    }
});
let app = express();
app.use(bodyParser.json());

let adminList = {};
let upload = multer({
    storage: storage
});
let publics = '/admin/menu/:name'; // 根据不同的路由提供对应的menu数据
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// 用户登录
app.post('/admin/loginUser', function (req, res) {
    res.writeHead(200, {'Content-type': 'application/json;charset="utf-8"'});
    adminList = JSON.parse(fs.readFileSync('../Mock/data/user.json', {encoding: 'utf-8'}));
    let code = 0;
    let msg = '用户名与密码不匹配';
    let authority = 'visitor';
    adminList.list.forEach((val, key) => {
        if (val.user === req.body.user && val.pwd === req.body.pwd) {
            code = 1;
            msg = '登录成功';
            authority = val.authority;
        }
    });
    let token = jwt.sign(req.body, 'soda', {expiresIn: 60});
    const obj = {
        'code': code,
        'data': {
            'showName': '系统管理员',
            'loginName': req.body.user,
            'token': token,
            'id': 2,
            'authority': authority
        },
        'msg': msg
    };
    res.end(JSON.stringify(obj));
});
// 用户注册
app.post('/admin/logins', function (req, res) {
    res.writeHead(200, {'Content-type': 'application/json;charset="utf-8"'});
    adminList = JSON.parse(fs.readFileSync('../Mock/data/user.json', {encoding: 'utf-8'}));
    adminList.list.push(req.body);
    console.log(req.body);
    let newList = JSON.stringify(adminList);
    fs.writeFile('../Mock/data/user.json', newList);
    const obj = {
        'code': 1,
        'data': {
            'showName': '系统管理员',
            'loginName': 'admin',
            'id': 2
        },
        'msg': 'SUCCESS'
    };
    res.end(JSON.stringify(obj));
});
// 侧栏列表导航
app.get(publics, function (req, res) {
    res.writeHead(200, {'Content-type': 'application/json;charset="utf-8"'});
    let arr = fs.readFileSync('../Mock/data/' + req.params.name + '.json', {encoding: 'utf-8'});
    res.end(arr);
});
// 图片上传
app.post('/file', upload.single('file'), function (req, res) {
    res.end('1');
});
// 城市数据
app.get('/admin/community/location/root', function (req, res) {
    res.writeHead(200, {'Content-type': 'application/json;charset="utf-8"'});
    adminList = JSON.parse(fs.readFileSync('../Mock/data/city.json', {encoding: 'utf-8'}));
    res.end(JSON.stringify(adminList));
});
// 活动注册
app.post('/admin/activity/getByCategory', function (req, res) {
    let active = JSON.parse(fs.readFileSync('./API/active.json'));
    active.list.push(req.body);
    fs.writeFileSync('./API/active.json', JSON.stringify(active));
    res.end('success');
});
// 活动展示
app.post('/admin/activity/activeIntroduce', function (req, res) {
    let active = JSON.parse(fs.readFileSync('./API/active.json'));
    let obj = {
        msg: 'success',
        list: active.list
    };
    res.end(JSON.stringify(obj));
});
// 居民列表
app.post('/admin/resident', function (req, res) {
    const residentList = JSON.parse(fs.readFileSync('./API/resident_list.json')).list;
    let {page, count} = req.body;
    let resLen = residentList.list.length;
    let list = residentList.list.slice((page - 1) * count, page * count);
    res.end(JSON.stringify({
        len: resLen,
        list: list
    }));
});
// 删除居民数据
app.post('/admin/residentDele', function (req, res) {
    jwt.verify(req.body.token, 'soda', (errs, decoded) => {
        if (errs) {
            res.end(JSON.stringify({'msg': 'error'}));
        } else {
            if (req.body.aut === 'master') {
                const residentList = JSON.parse(fs.readFileSync('./API/resident_list.json'));
                let id = req.body.id;
                let page = req.body.page;
                let count = req.body.count;
                residentList.list.list.forEach((item, inx) => {
                    if (item.id === id) {
                        residentList.list.list.splice(inx, 1);
                    }
                });
                fs.writeFile('./API/resident_list.json', JSON.stringify(residentList));
                let resLen = residentList.list.length;
                let newList = residentList.list.list.slice((page - 1) * count, page * count);
                let obj = {
                    msg: 'success',
                    data: newList,
                    code: 1,
                    len: resLen
                };
                res.end(JSON.stringify(obj));
            } else {
                res.end(JSON.stringify({
                    msg: '你没有删除资格'
                }));
            }
        }
    });
});
// 改变备注
app.post('/admin/residentPs', function (req, res) {
    const residentList = JSON.parse(fs.readFileSync('./API/resident_list.json'));
    let id = req.body.id;
    let page = req.body.page;
    let count = req.body.count;
    residentList.list.list.forEach((item, inx) => {
        if (item.id === id) {
            residentList.list.list[inx].ps = req.body.ps;
        }
    });
    fs.writeFile('./API/resident_list.json', JSON.stringify(residentList));
    let newList = residentList.list.list.slice((page - 1) * count, page * count);
    res.end(JSON.stringify(newList));
});
// 参加活动的居民
app.post('/admin/birthday', function (req, res) {
    let list = JSON.parse(fs.readFileSync('./API/birthday.json'));
    let len = list.length;
    res.end(JSON.stringify({
        len: len,
        list
    }));
});
// 报名参加活动 (已做排重功能)
app.post('/admin/wantbir', function (req, res) {
    let list = JSON.parse(fs.readFileSync('./API/birthday.json'));
    let msg = 'success';
    list.forEach((item) => {
        if (item.user === req.body.user) {
            msg = 'already';
        }
    });
    if (msg === 'success') {
        list.push(req.body);
        fs.writeFile('./API/birthday.json', JSON.stringify(list));
    }
    res.end(msg);
});
// 删除参加活动的居民
app.post('/admin/delbir', function (req, res) {
    let list = JSON.parse(fs.readFileSync('./API/birthday.json'));
    list.forEach((item, inx) => {
        if (item.user === req.body.user) {
            list.splice(inx, 1)
        }
    });
    fs.writeFile('./API/birthday.json', JSON.stringify(list));
    res.end('success');
});
// 邀请居民模糊查询
app.post('/admin/search', function (req, res) {
    let params = req.body;
    let residentList = JSON.parse(fs.readFileSync('./API/resident_list.json'));
    let lists = residentList.list;
    let code = 0;
    let result = [];
    lists.list.forEach((item, index) => {
        if (item.tel.indexOf(params.msg) === 0 || item.name.indexOf(params.msg) === 0) {
            code = 1;
            result.push(item);
        }
    });
    if (code) {
        res.end(JSON.stringify({code: 1, msg: 'Success', list: result}));
    } else {
        res.end(JSON.stringify({code: 0, msg: 'Error'}));
    }
});
// 将邀请完的居民添加到活动列表
app.post('/admin/pushbir', function (req, res) {
    let now = new Date();
    let data = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
    let list = JSON.parse(fs.readFileSync('./API/birthday.json'));
    req.body.forEach((item, inx) => {
        let obj = {
            user: item.name,
            phone: item.tel,
            time: data,
            ps: item.ps
        };
        list.unshift(obj);
    });
    fs.writeFile('./API/birthday.json', JSON.stringify(list));
    res.end('邀请成功');
});
app.listen(3000, (data) => {
    console.log('server is listen 3000');
});
