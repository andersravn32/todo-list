const { ObjectId } = require("mongodb");
const database = require("../../utilities/database");

const TODO = {
  title: null,
  description: null,
  startDate: null,
  due: null,
  done: false,
  priority: null
};

module.exports = async (req, res) => {
  if (!req.params.id) {
    return res.json({
      error: "Missing id",
    });
  }

  const todo = {
    ...TODO,
    title: req.body.title,
    description: req.body.description,
    due: req.body.due,
    startDate: req.body.startDate,
    done: req.body.done,
    owner: req.user.uuid,
    priority: req.body.priority
  };

  try {
    // Get database connection
    const db = database.get();

    // Update query
    const updateQuery = await db.collection("tasks").updateOne(
      { _id: new ObjectId(req.params.id), owner: req.user.uuid },
      {
        $set: todo,
      }
    );

    // If nothing was updated or acknowledged, return error
    if (!(updateQuery.acknowledged && updateQuery.matchedCount)) {
      return res.json({
        error: "Failed to update task",
      });
    }

    // Return query result
    return res.json(updateQuery);
  } catch (error) {}
};
