const MessageModel = require('../models/message');
const ConversationModel = require('../models/conversation');
const UserModel = require('../models/user');

class MessageController {
  static async create(req, res) {
    try {
      
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
}