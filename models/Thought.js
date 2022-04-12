const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Schema to create Post model
const thoughtSchema = new Schema(
    {
        thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 180,
        },
        createdAt: {
        type: Date,
        default: Date.now
        },
        username: {
        type: String,
        default: true,
        },
        reactions: [reactionSchema]
    },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Create a virtual property `responses` that gets the amount of response per video
thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  });

// Initialize our Video model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;