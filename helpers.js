const validEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const validPassword = (pass) => {
    // write some logic to test the password
    // if the password is okay, return true
    // else return a re
    var passRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    return pass.match(passRegex);
};

const newFunc = (req, res, next) => {
    console.log(`${JSON.stringify(req.body)} hi`);
    next();
};

module.exports = { validEmail, validPassword, newFunc };
