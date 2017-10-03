const { Document } = require('camo');

module.exports = class ChatMessage extends Document {
  constructor() {
    super();

    this.content = String;
  }
}
