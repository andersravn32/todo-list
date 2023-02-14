const database = require("../../utilities/database");

module.exports = async (req, res) => {
  try {
    // Get active database connection
    const db = database.get();

    // Get every task related to requesting user
    const tasks = await db
      .collection("tasks")
      .find({ owner: req.user.uuid })
      .toArray();

    // Return tasks to user
    return res.json(tasks);
  } catch (error) {
    console.log(error);
    return res.json({
      error: error,
    });
  }
};
