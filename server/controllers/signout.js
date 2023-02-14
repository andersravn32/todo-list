const database = require("../utilities/database");

module.exports = async (req, res) => {
  // Get jwt from request body
  if (!req.body.token) {
    return res.json({
      error: "Missing jwt",
    });
  }

  try {
    // Get database connection
    const db = database.get();

    // Delete user providede refresh token
    const tokenDelete = await db
      .collection("tokens")
      .deleteOne({ token: req.body.token, type: "refresh" });

    // If no token was deleted from database, return error to user
    if (!tokenDelete.acknowledged || !tokenDelete.deletedCount) {
      return res.json({
        error: "Failed to signout",
      });
    }

    return res.json({
        message: "Signed out"
    })
  } catch (error) {
    return res.json({
      error: error
    });
  }
};
