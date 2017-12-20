var mysql = require('mysql'); //调用MySQL模块 
function OptPool(){ 
  this.flag=true; //是否连接过 
  this.pool = mysql.createPool({   
    host: '117.78.42.55',    //主机 
    user: 'cas',        //MySQL认证用户名 
    password: 'Inspur1036?',    //MySQL认证用户密码 
    database: 'cas', 
    port: '3306'          //端口号 
  }); 
  
  this.getPool=function(){ 
     return this.pool; 
  } 
}; 
module.exports = OptPool;