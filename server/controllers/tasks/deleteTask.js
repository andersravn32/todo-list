const { ObjectId } = require("mongodb");
const database = require("../../utilities/database");

module.exports = async (req, res) => {
  if (!req.params.id) {
    return res.json({
      error: "Missing id",
    });
  }

  try {
    // Get active database connection
    const db = database.get();

    // Perform deletion of task in database
    const deleteQuery = await db
      .collection("tasks")
      .deleteOne({ _id: new ObjectId(req.params.id), owner: req.user.uuid });

      // Handle potential errors
    if (!(deleteQuery.acknowledged && deleteQuery.deletedCount)){
        return res.json({
            error: "Failed to delete task"
        })
    }

    // Return status to user
    return res.json(deleteQuery)
  } catch (error) {
    console.log(error);
  }
};
