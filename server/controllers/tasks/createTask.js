const database = require("../../utilities/database");

/*

Priority:
0 - Not important
1 - Slightly important
2 - Very important

*/

const TODO = {
  title: null,
  description: null,
  startDate: null,
  due: null,
  done: false,
  priority: null
};

module.exports = async (req, res) => {
  if (!req.body.title || !req.body.title.length) {
    return res.json({
      error: "Missing title",
    });
  }

  // Create new todo object based on static object
  const todo = {
    ...TODO,
    title: req.body.title,
    description: req.body.description || null,
    startDate: req.body.startDate || Math.floor(new Date() / 1000),
    due: req.body.due || Math.floor(new Date() / 1000),
    priority: req.body.priority || 0,
    owner: req.user.uuid,
  };

  try {
    // Get active database connection
    const db = database.get();

    // Insert task data to database
    const taskInsert = await db.collection("tasks").insertOne(todo);

    // Return error if error is present
    if (!(taskInsert.acknowledged && taskInsert.insertedId)) {
      return res.json({
        error: "Failed to create task",
      });
    }

    // Return newly created task object to user
    return res.json({
      ...todo,
      _id: taskInsert.insertedId,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      error: error,
    });
  }
};
