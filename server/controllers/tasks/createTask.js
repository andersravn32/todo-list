const database = require("../../utilities/database");

const TODO = {
  title: null,
  due: null,
  done: false,
};

module.exports = async (req, res) => {
  if (!req.body.title || !req.body.title.length) {
    return res.json({
        error: "Missing title"
    })
  }

  // Create new todo object based on static object
  const todo = {
    ...TODO,
    title: req.body.title,
    due: req.body.due || new Date() / 1000,
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
