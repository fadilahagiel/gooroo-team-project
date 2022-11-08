const ChatController = require("../controllers/chatController");
const router = require("express").Router();

router.get("/", ChatController.findAllContacts);
router.get("/chat", ChatController.chatLogs);
router.get("/:contactId", ChatController.addContact);

module.exports = router;
