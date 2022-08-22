const mongoose = require('mongoose')
const { Schema } = mongoose;

const NoteSchema = new Schema({
  
  guildId: { type: String, required: true },
  prefix: { type: String, required: false},
    suggestionChannel: { type: String, required: false}
})

module.exports = mongoose.model('GuildConfig', NoteSchema );
