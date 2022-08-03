
const User = require('../models/user.model');


exports.registerNewUser = async (req, res) => {
    try {
        const isUser = await User.find({ email: req.body.email });
        console.log(isUser);

        if (isUser.length >= 1) {
            return res
                .status(409)
                .json({ message: "E-mail já cadastrado!" });
        }

        const newUser = new User(req.body);
        const user = await newUser.save();
        const token = await newUser.generateAuthToken();
        res.status(201).json({ message: 'Usuário criado com sucesso!', user, token });
    } catch (err) {
        res.status(400).json({ err: err });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await User.findByCredentials(email, password);

        if (!user) {
            return res.status(401).json({ message: 'Erro de login. Verifique os dados inseridos!' })
        }

        const token = await user.generateAuthToken();
        res.status(201).json({ message: 'Login realizaddo com sucesso!', user, token });
    } catch (err) {
        res.status(400).json({ err: err })
    }
};

exports.userProfile = async (req, res) => {
    await res.json(req.userData);
};