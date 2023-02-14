const express = require("express");
const router = express.Router();

// GET: /tasks - Returns all tasks related to requesting user
router.get("/", require("../controllers/tasks/index"));

// POST: /tasks - Creates new task related to requesting user
router.post("/", require("../controllers/tasks/createTask"));

// DELETE: /tasks/:id - Deletes specific task by id, if task is owned by requesting user
router.delete("/:id", require("../controllers/tasks/deleteTask"));

// PUT: /tasks/:id - Updates specific task related to requesting user
router.put("/:id", require("../controllers/tasks/updateTask"));

module.exports = router;
