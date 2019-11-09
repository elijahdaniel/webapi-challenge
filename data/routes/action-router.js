const express = require('express')
const Action = require('../helpers/actionModel.js')
const router = express.Router()

// create new action
router.post('/', (req, res) => {
  Action.insert(req.body)
    .then(act => res.status(201).json(action))
    .catch(err => res.status(500).json({ message: 'unable to add new action' }))
})

// get all actions
router.get('/', (req, res) => {
  Action.get()
    .then(act => res.status(200).json({ act }))
    .catch(err => res.status(404).json({ message: 'actions not found' }))
})

// get action by id
router.get('/:id', (req, res) => {
  Action.get(req.params.id)
    .then(act => res.status(200).json(act))
    .catch(res.status(500).json({ message: 'unable to retrieve action by id' }))
})

// update action by id
router.put('/:id', (req, res) => {
  Action.update(req.params.id, req.body)
    .then(act => res.status(201).json(act))
    .catch(err => res.status(500).json({ message: 'unable to update by id' }))
})

// remove action by id
router.delete('/:id', (req, res) => {
  Action.remove(req.params.id)
    .then(act =>
      act > 0
        ? res.status(200).json({ message: 'action removed' })
        : res.status(404).json({ message: 'action not found' })
    )
    .catch(err => res.status(500).json({ message: 'error removing action' }))
})

module.exports = router
