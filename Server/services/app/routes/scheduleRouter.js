const ScheduleController = require("../controllers/ScheduleController");
const { AuthTeacher } = require("../middlewares/authorization");
const router = require("express").Router();

router.post("/:ClassId", AuthTeacher, ScheduleController.addSchedule);
router.delete("/:ScheduleId", ScheduleController.deleteSchedule);
router.put("/:ScheduleId", ScheduleController.updateSchedule);

module.exports = router;
