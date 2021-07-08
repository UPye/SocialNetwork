const {
  User,
  Thought
} = require('../models');


const thoughtController = {

  // Render all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .populate({
        path: "user",
        select: "-__v",
      })
      .select('-__v')
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // Render thought by id
  getThoughtById({ params }, res) {
    Thought.findById({
        _id: params.thoughtId
      })
      .populate({
        path: "user",
        select: "-__v",
      })
      .select('-__v')
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({
            message: 'No thought found with this id'
          });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
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
            message: 'No user found with this id'
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

    Thought.findOneAndUpdate(
      { _id: params.id }, 
      body, 
      { new: true, 
        runValidators: true })
        .then((dbThoughtData) => {
          if (!dbThoughtData) {
            res.status(404).json(
              { message: "No Thought found with this id!" }
            );
            return;
          }
          res.json(dbThoughtData);
        })
        .catch((err) => res.json(err));
    },

  // Remove thought by id from user
  removeThought({ params }, res) {
      Thought.findOneAndDelete({ _id: params.id })
        .then(thoughtData => {
          if (!thoughtData) {
            return res.status(404).json(
              { message: "No Thought found with this id!" }
            );
          }
            res.json(thoughtData);
          })
          .catch(err => res.json(err));
      },
  // Add a reaction to a thought
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No Thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },
  // Remove a reaction by id
  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: 
        { reactionId: params.reactionId } 
        } 
      },
      { new: true }
    )
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => res.json(err));
  }

};



module.exports = thoughtController;