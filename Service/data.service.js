const db = require('./db')  //import database
let userDetails = {
  100: { id: 100, username: "sangeetha", password: "sangee", eventDetails: [] },
  101: { id: 101, username: "shwetha", password: "shwe", eventDetails: [] },
  102: { id: 102, username: "sherly", password: "sherly", eventDetails: [] },
  103: { id: 103, username: "userone", password: "userone", eventDetails: [] }
}

let currentUser;
//register
const register = (uname, uid, pswd) => {
  console.log(uid);
  console.log(uname);
  console.log(pswd);
  // let user = userDetails;
  return db.User.findOne({ uid })
    .then(user => {
      if (user) {
        return {
          statusCode: 422,
          status: false,
          message: "User exist..Please login",
          password: user.password
        }
      }
      else {
        const newUser = new db.User({
          uid,
          username: uname,
          password: pswd,
          eventDetails: []
        })
        newUser.save();                     //saving new user to db
        return {
          statusCode: 200,
          status: true,
          message: "Successfully Registered"
        }
      }
    })
}
// if (id in user) {
//   if (pswd == user[id]["password"]){  //checking password

const login = (req, uid, password) => {

  // let user = userDetails;
  // if (id in user) {
  //   if (pswd == user[id]["password"]) {
  return db.User.findOne({ uid, password })
    .then(user => {
      if (user) {
        req.session.currentUser = user.uid;
        console.log(req.session.currentUser);
        return {
          statusCode: 200,
          status: true,
          message: "Login Successful",
          username: user.username
        }
      }
      else {
        return {
          statusCode: 422,
          status: false,
          message: "Invalid Credentials"
        }
      }
    })
}
// this.currentUid=user[id]["id"];       //stroring current user's ID
// console.log(this.currentUid)
// this.saveDetails();                     //calling saveDetails
//   return {
//     statusCode: 200,
//     status: true,
//     message: "Login Successful"
//   }
// }
//   else {
//     return {
//       statusCode: 422,
//       status: false,
//       message: "Incorrect password"
//     }
//   }

// }

// else {
//   return {
//     statusCode: 422,
//     status: false,
//     message: "Invalid Credentials"
//   }
// }


//addEvent
const addEvent = (req, uid, eDate, eName) => {
  // let user = userDetails;

  // if (uID in user) {
  console.log(uid)
  return db.User.findOne({ uid })
    .then(user => {
      if (req.session.currentUser != uid) {
        return {
          statusCode: 422,
          status: false,
          message: "permission denied"
        }
      // if (!user) {
      //   return {
      //     statusCode:422,
      //     status:false,
      //     message:"failed to add event"
      //   }
      // }
      }
      if (user) {
        user.eventDetails.push({
          eDate: eDate,
          eName: eName
        })
        user.save();                  //saving to db
        return {
          statusCode: 200,
          status: true,
          message: " Your Event has added successfully"
        }
      }
    })
  }
      // if (req.session.currentUser != uid) {            //checking currnt user's id = uid
      //   return {
      //     statusCode: 422,
      //     status: false,
      //     message: "Permission denied"
      //   }
      // else{
      //   return {
      //     statusCode:422,
      //     status:false,
      //     message:"failed to add event"
      //   }

 // if(user){
// user.eventDetails.push({
//   eDate:eDate,
//   eName:eName
// })
// user.save();                  //saving to db
// return{
//   statusCode:200,
//   status:true,
//   message:" Your Event has added successfully"
// }
// }
// else{
//   return {
//     statusCode:422,
//     status:false,
//     message:"failed to add event"
//   }
// }
// 
//     console.log(user);

//     user[uID]["eventDetails"].push({
//       eDate: eDate,
//       eName: eName
//     })
//     // this.saveDetails();
//     console.log(user[uID]["eventDetails"])
//     console.log(user[uID]);
//     return {
//       statusCode: 200,
//       status: true,
//       message: "Event added Successfully"
//     }

//   }
//   else {
//     return {
//       statusCode: 422,
//       status: false,
//       message: "Failed to add Event"
//     }
//   }
// }

const viewEvent = (req, uid) => {
  // let user = userDetails;
  console.log(uid);
  console.log(req.session.currentUser);
  return db.User.findOne({ uid })
    .then(user => {
      if(req.session.currentUser != uid){
        return {
          statusCode: 422,
          status: false,
          message: "failed to view event details"
        }
      }
      if (user) {
        return {
          statusCode: 200,
          status: true,
          message: user["eventDetails"]
        }
       }
      //  else {
      //   return {
      //     statusCode: 422,
      //     status: false,
      //     message: "failed to view event details"
      //   }
      // }
    })
}

module.exports = {
  register,
  login,
  addEvent,
  viewEvent
}