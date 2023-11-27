const jwt_token_user = require("../utils/jwt/jwt_token_user");
const bcrypt = require("bcrypt");
const transporter = require("../utils/email_notifications/email_connection");
const provider = require("../database/providers");
const { htmlCompiler } = require("../utils/email_notifications/compilation_html");

const registerUser = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        const verifyUser = await provider.verifyUserProvider(email);

        if (verifyUser) {
            return res
                .status(400)
                .json({ mensagem: "O email informado já existe." });
        }

        const encryptedPass = await bcrypt.hash(senha, 10);

        const user = await provider.createUserProvider(nome, email, encryptedPass);

        return res.status(201).json(user);
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno no servidor." });
    }
};

const loginUser = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const user = await provider.verifyUserProvider(email);

        if (!user) {
            return res
                .status(401)
                .json({ mensagem: "Email e/ou senha inválido(s)." });
        }

        const correctPassword = await bcrypt.compare(senha, user.senha);

        if (!correctPassword) {
            return res
                .status(401)
                .json({ mensagem: "Email e/ou senha inválido(s)." });
        }

        const html = await htmlCompiler("src/utils/email_notifications/login.html", {
            destinatario: user.nome,
        });

        transporter.sendMail({
            from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_FROM}>`,
            to: `${user.nome} <${user.email}>`,
            subject: "Tentativa de Login",
            html,
        });

        const token = jwt_token_user.sign({ id: user.id });

        return res.status(200).json({
            usuario: {
                id: user.id,
                nome: user.nome,
                email: user.email,
            },
            token,
        });
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
};

const getUser = async (req, res) => {
    try {
        const user = await provider.getUserById(req.userId);
        return res.status(200).json({
            id: user.id,
            nome: user.nome,
            email: user.email,
        });
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
};

const updateUser = async (req, res) => {
    const { nome, email, senha } = req.body;
    const id = req.userId;

    try {
        const verifyUser = await provider.verifyUserProvider(email);

        if (verifyUser === 0) {
            const encryptedPass = await bcrypt.hash(senha, 10);
            await provider.updateUserProvider(id, nome, email, encryptedPass);
        } else if (verifyUser != 0) {
            if (id === verifyUser.id) {
                const encryptedPass = await bcrypt.hash(senha, 10);
                await provider.updateUserProvider(id, nome, email, encryptedPass);
            } else {
                return res.status(400).json({
                    mensagem:
                        "O e-mail informado já está sendo utilizado por outro usuário.",
                });
            }
        }

        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
};

module.exports = {
    loginUser,
    getUser,
    registerUser,
    updateUser,
};
