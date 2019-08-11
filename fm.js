var createError = require('http-errors');
var express = require('express');
var path = require('path');
var fs = require('fs');
var http = require('http');
var bodyParser = require('body-parser')
var moment = require('moment');
var cors = require('cors')
var exphbs = require('express-handlebars');
var url = require('url')
var db = require("./db/db")
var jwt= require('jsonwebtoken')


const clone = (e) =>{ return JSON.parse(JSON.stringify(e))}

var port = 1080;
var secret = 'bizsecret';

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/')));

// app.set('view engine', 'html');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

var __projdir = path.resolve(__dirname,'./');

var hbs = exphbs.create({
  partialsDir: 'views/',
  layoutsDir: "views/layouts/",
  defaultLayout: 'layout',
  extname: '.hbs'
});

app.engine('hbs', hbs.engine);

app.get('/', function(req, res, next) {
  res.sendFile(__dirname + '/index.html');
});

app.post('/apply/query', function(req, res) {
  var {id} = req.body
  let sql = `CALL PROC_GET_APPLY(?)`;
  db.procedureSQL(sql,id,(err,ret)=>{
      if (err) {
        res.status(500).json({
          code: -1,
          msg: '获取apply失败',
          data: null,
        })
      }else{
        res.status(200).json({
          code: 200,
          msg: '获取apply成功',
          data: ret
        })
      }
  })
})


app.post('/fav/query', function(req, res) {
  var {id} = req.body
  let sql = `CALL PROC_GET_FAV(?)`;
  db.procedureSQL(sql,id,(err,ret)=>{
      if (err) {
        res.status(500).json({
          code: -1,
          msg: '获取fav失败',
          data: null,
        })
      }else{
        res.status(200).json({
          code: 200,
          msg: 'fav',
          data: ret
        })
      }
  })
})
  


app.post('/user/login', function(req, res) {
  var {email, pwd} = req.body
  token = jwt.sign({ email: email, pwd: pwd }, secret);
  
  let where = `where email='${email}' and pwd = '${pwd}'`
  db.select('account',where,'','', (err,ret)=>{
    let account = ret[0]
    if (ret.length > 0) {
      where = `where pid=${account.id}`
      db.select('expr',where,'','', (err,exp)=>{
          // let exp = eret
          
          res.status(200).json({
            code: 200,
            msg: '登录成功',
            data: {token: token, user: account, exp: clone(exp)}
          })
      })
    }else{
      res.status(500).json({
        code: -1,
        msg: '登录失败',
        data: null,
      })
    }
  })
})



app.post('/user/reg', function(req, res, next) {
  let data = req.body
  let expList = []
  let exp = []
  let sql = `CALL PROC_REG_USER(?)`;

  let account = {
    email:data.email,
    pwd:data.pwd,
    name_kj:data.name_kj,
    name_kn:data.name_kn,
    birth:data.birth,
    phone:data['input-number-phone'],
    pers_type:data.pers_type,
    work_area:data['select-multiple-work_area'].join('|'),
    work_time:data['select-multiple-work_time'].join('|'),
    work_mony:data.work_mony,
    work_type:data['select-multiple-work_type'].join('|'),
    usertype: 0
  }

  if (data.count>0) {
    for(let i=1;i<data.count+1;i++) {
      let item = {}
      item[`proj_name`] = data[`proj_name_${i}`]
      item[`date_from`] = data[`date_from_${i},date_to_${i}`][0]
      item[  `date_to`] = data[`date_from_${i},date_to_${i}`][1]
      item[`work_lang`] = data[`select-multiple-work_lang_${i}`].join('|')
      item[`work_role`] = data[`select-multiple-work_role_${i}`].join('|')
      item[`work_proj`] = data[`select-multiple-work_proj_${i}`].join('|')
      item[`work_detl`] = data[`work_detl_${i}`]
      expList.push(item)
    }
  }

  account['exp'] = expList
  db.procedureSQL(sql,JSON.stringify(account),(err,ret)=>{
      if (err) {
        res.status(500).json({ code: -1, msg: 'reg failed', data: null})
      }else{
        if (ret[0].err_code===0) {
          delete account.exp
          account.id = ret[0].id
          let data = {
            token: jwt.sign({ email: account.email, pwd: account.pwd }, secret),
            user:account, 
            exp: expList
          }
          res.status(200).json({ code: 200, msg: 'reg successful', data: data  })
        }else{
          res.status(200).json({ code: 201, msg: 'user exist', data: null })
        }
        
      }
  })
});



app.post('/user/save', function(req, res, next) {
  
  let sql = `CALL PROC_SAVE_USER(?)`;


  let account = clone(req.body.user)
  let expList = clone(req.body.exp)
  account.exp = expList

  db.procedureSQL(sql,JSON.stringify(account),(err,ret)=>{
    if (err) {
      res.status(500).json({ code: -1, msg: 'reg failed', data: null})
    }else{
      if (ret[0].err_code===0) {
        // delete account.exp
        let data = {
          token: jwt.sign({ email: account.email, pwd: account.pwd }, secret),
          user:account, 
          exp: expList
        }
        res.status(200).json({ code: 200, msg: 'reg successful', data: data  })
      }else{
        res.status(200).json({ code: 201, msg: 'user exist', data: null })
      }
    }
  })
})


app.post('/user/regcomp', function(req, res, next) {
  let data = req.body
  let sql = `CALL PROC_REG_COMP(?)`;

  let account = {
    email:data.email,
    pwd:data.pwd,
    name_kj:data.name_kj,
    name_kn:data.name_kn,
    phone:data['input-number-phone'],
    name_comp:data.name_comp,
    name_dept:data.name_dept,
    usertype:1
  }

  db.procedureSQL(sql,JSON.stringify(account),(err,ret)=>{
    if (err) {
      res.status(500).json({ code: -1, msg: 'reg failed', data: null})
    }else{
      if (ret[0].err_code===0) {
        let data = {
          token: jwt.sign({ email: account.email, pwd: account.pwd }, secret),
          user:account, 
        }
        res.status(200).json({ code: 200, msg: 'reg successful', data: data  })
      }else{
        res.status(200).json({ code: 201, msg: 'user exist', data: null })
      }
      
    }
  })
});



app.post('/proj/query', function(req, res, next) {
  // let data = req.body
  db.select('project','','','', (err,ret)=>{
    res.status(200).json({
      code: 200,
      msg: '取案例数据成功',
      data: ret
    })
  })
})

app.post('/proj/detail', function(req, res, next) {
  let { id } = req.body
  let where = `where pid=${id}`
  db.select('position',where,'','', (err,ret)=>{
    res.status(200).json({
      code: 200,
      msg: '取案例数据成功',
      data: ret
    })
  })
})


app.post('/proj/add', function(req, res, next) {
  
  let data = req.body
  let posList = []
  let sql = `CALL PROC_ADD_PROJ(?)`;

  let project = {
    pid: data.pid,
    proj_name:data.proj_name,
    proj_detl:data.proj_detl,
    date_from:data['date_from,date_to'][0],
    date_to:  data['date_from,date_to'][1],
    proj_domn:data['select-multiple-proj_domn'].join('|'),
    proj_area:data['select-multiple-proj_area'].join('|'),
    proj_pref:data['select-multiple-proj_pref'].join('|'),
    proj_targ:data.proj_targ,
    proj_styl:data['select-multiple-proj_styl'].join('|')
  }

  if (data.count>0) {
    for(let i=1;i<data.count+1;i++) {
      let item = {}
      item[`proj_mony`] = data[`input-number-proj_mony_${i}`]
      item[`proj_role`] = data[`select-multiple-proj_role_${i}`].join('|')
      item[`proj_resp`] = data[`select-multiple-proj_resp_${i}`].join('|')
      item[`proj_lang`] = data[`select-multiple-proj_lang_${i}`].join('|')
      item[`proj_cont`] = data[`proj_cont_${i}`]
      item[`reqr_exp`]  = data[`reqr_exp_${i}`]
      item[`pref_exp`]  = data[`pref_exp_${i}`]
      posList.push(item)
    }
  }

  project['pos'] = posList
  db.procedureSQL(sql,JSON.stringify(project),(err,ret)=>{
    if (err) {
      res.status(500).json({ code: -1, msg: 'reg failed', data: null})
    }else{
      if (ret[0].err_code===0) {
        delete project.pos
        project.id = ret[0].id
        let data = {
          project:project, 
          pos: posList
        }
        res.status(200).json({ code: 200, msg: 'add project succ' })
      }
    }
  })

});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.set('port', port);
var httpServer = http.createServer(app);
httpServer.listen(port);
httpServer.on('error', onError);
httpServer.on('listening', onListening);



function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = httpServer.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
}