const database = require("../utilities/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  // Get email and password from request body
  const { email, password } = req.body;

  // If credentials are missing from request, return an error
  if (!email || !password) {
    return res.json({
      error: "Missing credentials",
    });
  }

  try {
    // Get database connection
    const db = database.get();

    // Find user in database
    const user = await db.collection("users").findOne({ email: email });

    // If no user was found, return error
    if (!user) {
      return res.json({
        error: "Wrong email/password",
      });
    }

    // Compare passwords using bcrypt
    if (!(await bcrypt.compare(password, user.password))) {
      return res.json({
        error: "Wrong email/password",
      });
    }

    // Delete hashed user password from user object after validation
    delete user.password;
    delete user._id;

    // Create accessToken
    const accessToken = jwt.sign(
      {
        type: "access",
        ...user,
      },
      process.env.JWT_AUTH,
      {
        expiresIn: process.env.JWT_AUTH_EXPIRES,
      }
    );

    // Create refreshToken
    const refreshToken = jwt.sign(
      {
        type: "refresh",
        uuid: user.uuid,
        email: user.email,
      },
      process.env.JWT_REFRESH,
      {
        expiresIn: process.env.JWT_REFRESH_EXPIRES,
      }
    );

    // Insert refresh token into database
    const refreshInsert = await db.collection("tokens").replaceOne(
      { type: "refresh", user: user.uuid },
      {
        type: "refresh",
        user: user.uuid,
        token: refreshToken,
      },
      {
        upsert: true,
      }
    );

    if (!refreshInsert.acknowledged) {
      return res.json({
        error: "Failed to signin",
      });
    }

    // Return user data, accessToken and refreshToken to requesting user
    res.json({
      accessToken,
      refreshToken,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      error: error,
    });
  }
};
