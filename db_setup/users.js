const oracledb = require('oracledb');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const config = {
    user: 'SYS',
    password: 'Nvp123456',
    connectString: 'localhost:1521/orcl',
    privilege: oracledb.SYSDBA
}


function authenticateUser(req, res) {
    const { email, password } = req.body;
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
        connection.execute(`select email, password from users where email = '${email}'`, {}, { outFormat: oracledb.OBJECT },
            function (err, result) {
                if (err || result.rows.length < 1) {
                    res.set('Content-Type', 'application/json');
                    var status = err ? 500 : 401;
                    res.status(status).send(JSON.stringify({
                        status: status,
                        message: err ? "Error getting users" : "Unauthorized",
                        detailsMsg: err ? err.message : "Unauthorized"
                    }));
                } if (!bcrypt.compareSync(password, result.rows[0].PASSWORD)) {
                    res.set('Content-Type', 'application/json');
                    res.status(401).send(JSON.stringify({
                        status: 401,
                        message: "Unauthorized password",
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
        connection.execute("select * from users", {}, { outFormat: oracledb.OBJECT },
            function (err, result) {
                if (err) {
                    res.set('Content-Type', 'application/json');
                    res.status(500).send(JSON.stringify({
                        status: 500,
                        message: "Error getting users",
                        detailsMsg: err.message
                    }));
                } else {
                    res.contentType('application/json');
                    res.status(200).send(JSON.stringify({
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

function createUser(req, res) {
    let password = bcrypt.hashSync(req.body.password, 10);
    req.body.password = password;
    const fields = Object.keys(req.body).join(",");
    const values = Object.values(req.body).join("','");
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
        let sqlQuery = `insert into users(${fields})values('${values}')`;
        connection.execute(sqlQuery, {}, {
            autoCommit: true, outFormat: oracledb.OBJECT
        }, function (err, result) {
            if (err) {
                res.set('Content-Type', 'application/json');
                res.status(500).send(JSON.stringify({
                    status: 500,
                    message: "Error create user",
                    detailsMsg: err.message
                }));
            } else {
                res.contentType('application/json');
                res.status(200).send(JSON.stringify({
                    status: 200,
                    data: req.body.email,
                    message: "Created an user"
                }));
            }
            connection.release(
                function (err) {
                    if (err) console.error(err.message);
                    console.log("Post /user: connect release");
                }
            )
        })
    })
}

function getUserById(req, res) {
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
        connection.execute(`select * from users where email = '${req.params.email}'`, {}, { outFormat: oracledb.OBJECT },
            function (err, result) {
                if (err) {
                    res.set('Content-Type', 'application/json');
                    res.status(500).send(JSON.stringify({
                        status: 500,
                        message: "Error getting user",
                        detailsMsg: err.message
                    }));
                } else {
                    res.contentType('application/json');
                    res.status(200).send(JSON.stringify({
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

function updateUserById(req, res) {
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
        const setFieldValue = Object.entries(req.body ).map(([key,value]) => `${key} = '${value}'`).toString();
        connection.execute(`update users set ${setFieldValue} where email = '${req.params.email}'`, {}, {autoCommit: true, outFormat: oracledb.OBJECT },
            function (err, result) {
                if (err) {
                    res.set('Content-Type', 'application/json');
                    res.status(500).send(JSON.stringify({
                        status: 500,
                        message: "Error getting user",
                        detailsMsg: err.message
                    }));
                } else {
                    res.contentType('application/json');
                    res.status(200).send(JSON.stringify({
                        status: 200,
                        data: result.rows,
                        message: "Updated an user"
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

function deleteUserById(req, res) {
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
        connection.execute(`delete from users where email = '${req.params.email}'`, {}, {autoCommit: true, outFormat: oracledb.OBJECT },
            function (err, result) {
                if (err) {
                    res.set('Content-Type', 'application/json');
                    res.status(500).send(JSON.stringify({
                        status: 500,
                        message: "Error getting user",
                        detailsMsg: err.message
                    }));
                } else {
                    res.contentType('application/json');
                    res.status(200).send(JSON.stringify({
                        status: 200,
                        data: result.rows,
                        message: "Deleted an user"
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
    authenticateUser: authenticateUser,
    getAllUsers: getAllUsers,
    getUserById:getUserById,
    createUser: createUser,
    updateUserById: updateUserById,
    deleteUserById: deleteUserById
}