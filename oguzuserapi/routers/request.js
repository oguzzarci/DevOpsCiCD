const router = require("express").Router();
const User = require("../dbmodels/user");

router.get('/userlist',async(req,res)=> {

  const allUser = await User.find({});

  if(allUser.length>0){

    res.status(200).json({Details:allUser,Status:200})

  }else{
    res.status(400).json({Details:"UserListError or EmptList",Status:400})
  }


});

router.post("/saveuser", async (req, res) => {
    
    const userNameExist = await User.findOne({ username: req.body.username });
  
    if (userNameExist) return res.status(400).json({
      Details:"Username already exists",
      Status:"400"
    });
  
    const user = new User({
      username: req.body.username,
      status:true
    });
  
    try {
      const savedUser = await user.save();
      res.status(200).json({Details: "RegisterSuccessful",status:200})
    } catch (err) {
      res.send({
        Status: "500",
        Details: "RegisterFailed"
      });
    }
  });


router.post("/deleteuser", async (req, res) => {

   const userName =req.body.username;
   const userNameExist = await User.findOne({ username: userName });

    const myQuery = {username:userName}
    if (!userNameExist) return res.status(400).json({
      Details:"UsernameNotFound",
      Status:"400"
    });

    if(userNameExist){
      await User.deleteOne(myQuery,function(err,obj){
        if(err){
          return res.status(400).json({Details:"UserDeleteFailed",Status:400})
        }else{
          return res.status(200).json({Details:"UserDeleteSuccess",Status:200})
        }
      })
    }
    })


router.post("/updateuser",async (req,res)=> {

  const currentUserName = req.body.username;
  const newUserName = req.body.newusername;
  const userNameExist = await User.findOne({ username: currentUserName });

  const filter = {username:currentUserName}
  const newValue = {username:newUserName}

  if (!userNameExist) return res.status(400).json({
    Details:"UsernameNotFound",
    Status:"400"
  });

  await User.findOneAndUpdate(
    filter,
    newValue,
    res,
    await function(err) {
      if (!err) {
       return res.status(200).json({ Details: "UserUpdateSuccess", Status:200 });
      }else{
        return res.status(400).json({Details:"UserUpdateFailed",Status:400})
      }
    }
  );





})

module.exports = router;