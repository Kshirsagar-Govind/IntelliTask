let USER_SERVICES = require('../Services/user-account-services');

exports.NEW_USER_REGISTRATION = async (req, res) => {
    try {

        let responce = await USER_SERVICES.NEW_USER_ACCOUNT_SERIVICE(req.body);
        console.log(responce);

        if (responce == 201) {
            return res.json({ code: 201, msg: "USER ACCOUNT CREATRED" });
        }
        else if (responce == 202) {
            return res.json({ code: 202, msg: "USER ACCOUNT ALREADY EXISTS" });
        }
        return res.json({ code: 400, msg: "SERVER ERROR" });

    } catch (err) {
        console.error(err);
        return res.json({ code: 400, msg: "SERVER ERROR" });
    }
}

exports.USER_LOGIN = async (req, res) => {
    try {
        let responce = await USER_SERVICES.USER_LOGIN_SERIVICE(req.body);
        console.log(responce, req.body);
        if (responce.code == 200) {
            return res.json({ code: 200, user_id: responce.user_id, msg: "USER LOGGED IN" });
        }
        else if (responce.code == 404) {
            return res.json({ code: 404, msg: "INVALID CREDS" });
        }
        return res.json({ code: 400, msg: "SERVER ERROR" });

    } catch (err) {
        console.error(err);
        return res.json({ code: 400, msg: "SERVER ERROR" });
    }
}


exports.USER_LOGOUT = async (req, res) => {
    try {
        let responce = await USER_SERVICES.USER_LOGOUT_SERIVICE(req.params.id);
        if (responce.code == 200) {
            return res.json({ code: 200, user_id: responce.user_id, msg: "USER LOGGED OUT" });
        }

        return res.json({ code: 400, msg: "SERVER ERROR" });

    } catch (err) {
        console.error(err);
        return res.json({ code: 400, msg: "SERVER ERROR" });
    }
}

exports.GET_USER_DATA = async (req, res) => {
    try {
        let responce = await USER_SERVICES.USER_DETAILS_SERIVICE(req.params.id);

        if (responce.code == 200) {
            return res.json({ code: 200, user_details: responce.userData });
        }

        else if (responce.code == 404) {
            return res.json({ code: 404, msg: "INVALID CREDS" });
        }

        return res.json({ code: 400, msg: "SERVER ERROR" });

    } catch (err) {
        console.error(err);
        return res.json({ code: 400, msg: "SERVER ERROR" });
    }
}

exports.USER_ACCOUNT_UPDATE = async (req, res) => {
    try {
        let responce = await USER_SERVICES.USER_ACCOUNT_UPDATE_SERIVICE(req.body, req.params.id);
        console.log(responce);
        if (responce == 200) {
            return res.json({ code: 200, msg: "USER ACCOUNT UPDATED" });
        }
        else if (responce == 404) {
            return res.json({ code: 404, msg: "SOMETHING WENT WRONG" });
        }
        return res.json({ code: 400, msg: "SERVER ERROR" });

    } catch (err) {
        console.error(err);
        return res.json({ code: 400, msg: "SERVER ERROR" });
    }
}