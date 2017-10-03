const { Document } = require('camo');

class ChatMessage extends Document {
  constructor() {
    super();

    this.content = String;
  }
}
