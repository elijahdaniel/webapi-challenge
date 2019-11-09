const express = require('express')
const Project = require('../helpers/projectModel')
const router = express.Router()

// create new project
router.post('/', validateProfile, (req, res) => {
  Project.insert(req.body)
    .then(proj => res.status(201).json(proj))
    .catch(err => res.status(500).json({ message: 'error adding new project' }))
})

// post new action to id
router.post('/:id', validateById, (req, res) => {
  Project.getProjectActions(req.params.id, req.body)
    .then(proj => res.status(200).json(proj))
    .catch(err => res.status(500).json({ message: 'test' }))
})

// get all projects
router.get('/', (req, res) => {
  Project.get()
    .then(proj => res.status(200).json({ proj }))
    .catch(err => res.status(500).json({ message: 'no projects found' }))
})

// get project by id
router.get('/:id', validateById, (req, res) => {
  Project.get(req.params.id)
    .then(proj => res.status(200).json(proj))
    .catch(err => res.status(500).json({ message: 'invalid id' }))
})

// get project's actions by id
router.get('/:id/action', validateById, (req, res) => {
  Project.getProjectActions(req.params.id, req.body)
    .then(proj => res.status(201).json(proj))
    .catch(err => res.status(500).json({ message: 'unable to update project' }))
})

// update project by id
router.put('/:id', validateById, (req, res) => {
  Project.insert(req.params.id, req.body)
    .then(proj => res.status(201).json(proj))
    .catch(err => res.status(500).json({ message: 'unable to update project' }))
})

// remove project by id
router.delete('/:id', validateById, (req, res) => {
  Project.remove(req.params.id)
    .then(proj =>
      proj > 0
        ? res.status(200).json({ message: 'project removed' })
        : res.status(404).json({ message: 'project not found' })
    )
    .catch(err => res.status(500).json({ message: 'error removing action' }))
})

// custom middleware
function validateProfile(req, res, next) {
  req.body && Object.entries(req.body).length >= 0
    ? next()
    : res.status(404).json({ message: 'missing profile data' })

  next()
}

function validateById(req, res, next) {
  Project.get(req.params.id)
    .then(data =>
      !data
        ? res.status(400).json({ message: 'invalid id' })
        : (req.project = data)
    )
    .catch(err => console.log(err))

  next()
}

module.exports = router
