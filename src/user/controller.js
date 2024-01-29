const { createUserInDB, searchAllUsers, searchUserById, updateUserInDB } = require('./database');

async function createUser(req, res) {
    try {
        await createUserInDB(req.body);
        res.status(201).json({
            success: "user created successfully",
            user:{
                name: req.body.name,
                email: req.body.email,
            }
        })
    } catch (err) {
        res.status(500).json({
            success: "failure",
            "message": err.message
        })
    }
}
async function updateUser(req, res) {
    try {
        const { id } = req.params
        const keys = Object.keys(req.body);
        const updateTime = new Date().toISOString();

        let { rows } = await updateUserInDB(id, keys, req.body, updateTime);
        res.status(201).json({
            success: "user updated successfully",
            user: rows[0]
        })
    } catch (err) {
        res.status(500).json({
            success: "failure while updating user",
            message: err.message
        })
    }
}
async function getUserById(req, res) {
    try {
        const { id } = req.params;
        let {rows} = await searchUserById(id);
        res.status(201).json({
            data: rows[0]
        })
    } catch (err) {
        res.status(500).json({
            success: "failure",
            "message": err.message
        })
    }
}
async function getAllUsers(req, res) {
    try {
        const { limit, offset } = req.query;
        let { rows} = await searchAllUsers(limit,offset);
        res.status(201).json({
            data: rows,
            total: rows?.length
        })
    } catch (err) {
        res.status(500).json({
            success: "failure",
            "message": err.message
        })
    }
}

module.exports = {
    createUser,
    updateUser,
    getUserById,
    getAllUsers,
}