const router = require("express").Router();
const knex = require("knex");

const knexConfig = require("../knexfile.js");
const db = knex(knexConfig.development);

// ********** MVP CRUD METHODS ********** //

// POST to projects
router.post("/projects", (req, res) => {
  const newProject = req.body;
  db("projects")
    .insert(newProject)
    .then(ids => {
      console.log(newProject);
      const [id] = ids;

      db("projects")
        .where({ id })
        .first()
        .then(createdProject => {
          res.status(201).json(createdProject);
        });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// POST to actions
router.post("/actions", (req, res) => {
  const newAction = req.body;
  db("actions")
    .insert(newAction)
    .then(ids => {
      console.log(newAction);
      const [id] = ids;

      db("actions")
        .where({ id })
        .first()
        .then(createdAction => {
          res.status(201).json(createdAction);
        });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// GET project by id with list of actions in that project

module.exports = router;
