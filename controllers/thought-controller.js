const {
  User,
  Thought
} = require('../models');


const thoughtController = {

  // Render all thoughts
  getAllThoughts(req, res) {
    Thought.find({})

      .select('-__v')
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // Render thought by id
  getThoughtById({
    params
  }, res) {
    Thought.findById({
        _id: params.thoughtId
      })

      .select('-__v')
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          return res.status(404).json({
            message: 'Nothing found with this id'
          });
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },

  // Add a thought to a user
  addThought({
    params,
    body
  }, res) {
    console.log(body);

    Thought.create(body)
      .then(({
        _id
      }) => {
        return User.findOneAndUpdate({
          _id: params.userId
        }, {
          $push: {
            thoughts: _id
          }
        }, {
          new: true
        });
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({
            message: 'Nothing found with this id'
          });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

// Update a thought by id
  updateThought({
    params,
    body
  }, res) {

    Thought.findOneAndUpdate(body)
      .then(({
        _id
      }) => {
        return User.findOneAndUpdate({
          _id: params.userId
        }, {
          new: true
        });
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({
            message: 'Nothing found with this id!'
          });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  // Remove thought by id from user
  removeThought({
    params
  }, res) {
    Thought.findOneAndDelete({
        _id: params.thoughtId
      })
      .then(deleteThought => {
        if (!deleteThought) {
          return res.status(404).json({
            message: 'Nothing found with this id'
          });
        }
        return User.findOneAndUpdate({
          _id: params.userId
        }, {
          $pull: {
            thoughts: params.thoughtId
          }
        }, {
          new: true
        });
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({
            message: 'Nothing found with this id!'
          });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },
  // Add a reaction to a thought
  addReaction({
    params,
    body
  }, res) {
    Thought.findOneAndUpdate({
        _id: params.thoughtId
      }, {
        $push: {
          reactions: body
        }
      }, {
        new: true,
        runValidators: true
      })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({
            message: 'No thoughts with this Id!'
          });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },
  // Remove a reaction by id
  removeReaction({params}, res) {
    Thought.findOneAndUpdate(
      {_id: params.thoughtId}, 
      { $pull: { reactions: { reactionId: params.reactionId } } }, 
      { new: true}
      )
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({
            message: 'No thoughts with this Id!'
          });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  }
};



module.exports = thoughtController;