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
      if (newProject) {
        console.log(newProject);
        const [id] = ids;

        db("projects")
          .where({ id })
          .first()
          .then(createdProject => {
            res.status(201).json(createdProject);
          });
      } else {
        res.status(404).json({ error: "no new project found" });
      }
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
      if (newAction) {
        console.log(newAction);
        const [id] = ids;

        db("actions")
          .where({ id })
          .first()
          .then(createdAction => {
            res.status(201).json(createdAction);
          });
      } else {
        res.status(404).json({ error: "no action found" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// GET project by id with list of actions in that project
router.get("/projects/:id", (req, res) => {
  id = req.params.id;
  db("projects")
    .where({ id })
    .first()
    .then(project => {
      if (project) {
        db("actions")
          .where({ project_id: id })
          .then(actions => {
            project.actions = actions;
            res.status(200).json(project);
          })
          .catch(error => console.log(error));
      } else {
        res.status(404).json({ error: "unable to find project" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// ********** STRETCH CRUD METHODS ********** //

// ***** READ METHODS ***** //

// GET projects
router.get("/projects", (req, res) => {
  db("projects")
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// GET actions
router.get("/actions", (req, res) => {
  db("actions")
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// ***** UPDATE METHODS ***** //

// UPDATE an existing project
router.put("/projects/:id", (req, res) => {
  projectUpdates = req.body;
  db("projects")
    .where({ id: req.params.id })
    .update(projectUpdates)
    .then(count => {
      if (count > 0) {
        db("projects")
          .where({ id: req.params.id })
          .first()
          .then(updatedProject => {
            res.status(200).json(updatedProject);
          });
      } else {
        res.status(404).json({ message: "project not found" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// UPDATE an existing action
router.put("/actions/:id", (req, res) => {
  actionUpdates = req.body;
  db("actions")
    .where({ id: req.params.id })
    .update(actionUpdates)
    .then(count => {
      if (count > 0) {
        db("actions")
          .where({ id: req.params.id })
          .first()
          .then(updatedAction => {
            res.status(200).json(updatedAction);
          });
      } else {
        res.status(404).json({ message: "action not found" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// ***** DELETE METHODS ***** //

// DELETE an existing project
router.delete("/projects/:id", (req, res) => {
  db("projects")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if (count > 0) {
        res.status(204).json({ message: "project successfully deleted" });
      } else {
        res.status(404).json({ error: "project not found" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// DELETE an existing action
router.delete("/actions/:id", (req, res) => {
  db("actions")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if (count > 0) {
        res.status(204).json({ message: "action successfully deleted" });
      } else {
        res.status(404).json({ error: "action not found" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
