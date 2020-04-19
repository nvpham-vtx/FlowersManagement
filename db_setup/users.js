const oracledb = require('oracledb')
const config = {
  user: 'SYS',
  password: 'Nvp123456',
  connectString: 'localhost:1521/orcl',
  privilege: oracledb.SYSDBA
}

function getAllUsers(req, res) {
    oracledb.getConnection(config, function(err, connection) {
        if(err) {
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500, 
                message: "Error connecting to database",
                detailsMsg: err.message
            }));
            return;
        }
        connection.execute('select * from users', {}, {
            outFormat: oracledb.DBObject
        }, function(err, result) {
            if(err) {
                res.set('Content-Type', 'application/json');
                res.status(500).send(JSON.stringify({
                    status: 500, 
                    message: "Error getting users",
                    detailsMsg: err.message
                }));   
            }else {
                res.contentType('application/json').status(200).send(JSON.stringify({
                    status: 200,
                    data: result.rows,
                    message: "Recived all users"
                }));
            } 
            connection.release(
                function(err) {
                    if(err)console.error(err.message);
                    console.log("Get /users: connect release");
                }
            )
        })
    })
}

module.exports = {
    getAllUsers: getAllUsers
}