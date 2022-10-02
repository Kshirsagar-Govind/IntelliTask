let UserModel = require('../Models/[Model]-user-data');

exports.NEW_USER_ACCOUNT_SERIVICE = async (UserData) => {
    try {
        const { email } = UserData;
        console.log(UserData);
        // if entered email is already in use
        let isExists = await UserModel.findOne({ email: email });
        if (isExists) {
            return 202;
        }
        await UserModel.create(UserData);
        return 201;
    } catch (error) {
        console.log(error);
        return 400;

    }

}

exports.USER_LOGIN_SERIVICE = async (UserData) => {
    try {
        const { email, password } = UserData;
        let isExists = await UserModel.findOne({ email: email });

        // console.error(isExists, UserData);
        if (isExists) {
            // if password is correct
            if (isExists.password == password) {
                await UserModel.findOneAndUpdate({ email: email }, {
                    $set: {
                        user_online: true
                    }
                })
                return { code: 200, user_id: isExists.user_id }

            }
            // if password is incorrect
            return { code: 404 };
        } else {
            // if email is invalid/incorrect
            return { code: 404 };
        }
    } catch (error) {
        console.error(error);
        return { code: 404 };

    }

}


exports.USER_DETAILS_SERIVICE = async (id) => {
    try {
        let userData = await UserModel.findOne({ user_id: id });
        if (userData) {
            return { userData, code: 200 };
        }
        return { code: 404 };


    } catch (error) {
        console.error(error);
        return { code: 404 };
    }

}

exports.USER_ACCOUNT_UPDATE_SERIVICE = async (userData, id) => {
    try {

        const { email, name, profile_photo } = userData;
        let updateData = await UserModel.findByIdAndUpdate({ _id: id },
            {
                $set: {
                    email: email,
                    name: name,
                    profile_photo: profile_photo,
                }
            });
        console.log(updateData, id);
        if (updateData) {
            return 200;
        }
        return 400;

    }
    catch (error) {
        console.log(error);
        return 404;

    }
}

exports.USER_LOGOUT_SERIVICE = async (id) => {
    try {

        let loggedOut = await UserModel.findByIdAndUpdate({ _id: id },
            {
                $set: {
                    user_online: false,

                }
            });
        console.log(loggedOut, id);
        if (loggedOut) {
            return 200;
        }
        return 400;

    }
    catch (error) {
        console.log(error);
        return 404;

    }

}
