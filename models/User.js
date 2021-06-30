const { Schema , model, Types } = require('mongoose');


const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true

        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]

        },
        thoughts: [ThoughtSchema],
        friends: [UserSchema],
    },
    {
      toJSON: {
        virtuals: true
      },
      id: false
    }
);

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
})

const User = model('User', UserSchema);


module.exports = User;