const router = require("express").Router(); 
const { 
  check1, 
  check2, 
  check3, 
  show, 
  add 
} = require("../controller/attcontrol"); 
 
router.post("/check1", check1); 
router.post("/check2", check2); 
router.post("/check3", check3); 
router.get("/show", show); 
router.post("/add", add); 
 
module.exports = router;