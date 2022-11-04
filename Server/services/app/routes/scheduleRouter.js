const ScheduleController = require("../controllers/ScheduleController");
const router = require("express").Router();

router.post("/:ClassId", ScheduleController.addSchedule);
router.delete("/:ScheduleId", ScheduleController.deleteSchedule);
router.put("/:ScheduleId", ScheduleController.updateSchedule);

module.exports = router;
