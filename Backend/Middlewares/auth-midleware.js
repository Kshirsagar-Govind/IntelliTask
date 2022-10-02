let UserModel = require('../Models/[Model]-user-data');

const AUTHENITCATE_MIDDLEWARE = async (req, res, next) => {
    const { email, name, profile_photo } = req.body;
    const { id } = req.params;
    let checkUserID = await UserModel.findById({ _id: id });
    if (checkUserID && checkUserID.email == email) {
        return next();
    }
    return res.json({ code: 404, msg: "UNAUTH ERROR" });
}

module.exports = { AUTHENITCATE_MIDDLEWARE };