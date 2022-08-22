const mongoose = require('mongoose')
const { Schema } = mongoose;

const NoteSchema = new Schema({
  
  suggestion_id: { type: String, required: true },
  upvotes: { type: Number, required: false, default: 0},
    downvotes: { type: Number, required: false, default: 0},
    down_users: { type: Array, required: false},
    up_users: { type: Array, required: false},
    status: { type: String, required: false }
})

module.exports = mongoose.model('Suggestions', NoteSchema );
