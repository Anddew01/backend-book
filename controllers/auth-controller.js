const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const db = require("../models/db");

exports.register = async (req, res, next) => {
  const { username, password, confirmPassword, email } = req.body;
  try {
    // Validation
    if (!(username && password && confirmPassword)) {
      return res.status(400).json({ error: "Fulfill all inputs" });
    }
    if (confirmPassword !== password) {
      return res.status(400).json({ error: "Confirm password not match" });
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    const data = {
      username,
      password: hashedPassword,
      email,
    };

    const rs = await db.user.create({ data });
    console.log(rs);

    res.json({ msg: 'Register successful' });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    // Validation
    if (!(username.trim() && password.trim())) {
      throw new Error('Username or password must not be blank');
    }

    // Find username in db.user
    const user = await db.user.findFirstOrThrow({ where: { username } });

    // Check password
    const pwOk = await bcrypt.compare(password, user.password);
    if (!pwOk) {
      throw new Error('Invalid login');
    }

    // Issue jwt token
    const payload = { id: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '30d'
    });

    res.json({ token });
  } catch (err) {
    next(err);
  }
};

exports.getme = (req, res, next) => {
  res.json(req.user);
};
