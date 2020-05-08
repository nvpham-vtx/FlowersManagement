const oracledb = require('oracledb');
const jwt = require('jsonwebtoken');
const config = {
    user: 'SYS',
    password: 'Nvp123456',
    connectString: 'localhost:1521/orcl',
    privilege: oracledb.SYSDBA
}

function authenticateUser(req, res) {
    const {email, password} = req.body;
    oracledb.getConnection(config, function (err, connection) {
        if (err) {
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error connecting to database",
                detailsMsg: err.message
            }));
            return;
        }
        connection.execute(`select email from users where email = '${email}'`, {}, { outFormat: oracledb.OBJECT },
            function (err, result) {
                if (err || result.rows.length < 1) {
                    res.set('Content-Type', 'application/json');
                    var status = err ? 500 : 401;
                    res.status(status).send(JSON.stringify({
                        status: status,
                        message: err ? "Error getting users" : "Unauthorized",
                        detailsMsg: err ? err.message : "Unauthorized"
                    }));
                } else {
                    const payload = {
                        email: email,
                        iss: "flowers managerment",
                        iat: Date.now(),
                        exp: 60
                    };
                    const secret = "viking";
                    const token = jwt.sign(payload, secret, { algorithm: "HS256" });
                    res.setHeader('x-access-token', token);
                    res.contentType('application/json');
                    res.status(200).send(JSON.stringify({
                        status: 200,
                        user: result.rows[0],
                        token: token,
                        message: "Recived an user"
                    }));
                }
                connection.release(
                    function (err) {
                        if (err) console.error(err.message);
                        console.log("Get /users: connect release");
                    }
                )
            })
    })
}

function getAllUsers(req, res) {
    oracledb.getConnection(config, function (err, connection) {
        if (err) {
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error connecting to database",
                detailsMsg: err.message
            }));
            return;
        }
        connection.execute("select id, name, email, phone from users", {}, {
            outFormat: oracledb.OBJECT
        }, function (err, result) {
            if (err) {
                res.set('Content-Type', 'application/json');
                res.status(500).send(JSON.stringify({
                    status: 500,
                    message: "Error getting users",
                    detailsMsg: err.message
                }));
            } else {
                res.contentType('application/json').status(200).send(JSON.stringify({
                    status: 200,
                    data: result.rows,
                    message: "Recived all users"
                }));
            }
            connection.release(
                function (err) {
                    if (err) console.error(err.message);
                    console.log("Get /users: connect release");
                }
            )
        })
    })
}

module.exports = {
    getAllUsers: getAllUsers,
    authenticateUser: authenticateUser
}