import express from 'express';
import bycrpt from 'bcryptjs';
import User from '../models/UserModel.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

import expressAsyncHandler from 'express-async-handler';
import { baseUrl, generateToken } from '../utils.js';
const UserRoute = express.Router();

UserRoute.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bycrpt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: 'Ivalid email or password' });
  })
);

UserRoute.post(
  '/signup',
  expressAsyncHandler(async (req, res) => {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: bycrpt.hashSync(req.body.password),
    });
    const user = await newUser.save();
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    });
  })
);

UserRoute.get('/', async(req, res)=>{
  const usersList = await User.find({})
  res.send(usersList)
})

UserRoute.delete('/deleteUser/:id', async(req, res)=>{
  const id = req.params.id
  try{
await User.findByIdAndDelete({_id:id})
res.status(200).json("User has been deleted")
  } catch(err){
    console.log(err)
  }
})
UserRoute.get('/updateUser/:id', async(req,res)=>{
  const id = req.params.id
  const updatingUser = await User.findById({_id:id})
  res.json(updatingUser)
})

// let userEmai;
// UserRoute.get('/getallusers', async(req, res)=>{
//   const email = req.body.email
//   const usersList = await User.find()
//   res.send(usersList)
// })


// UserRoute.post(
//   '/forget-password',
//   expressAsyncHandler(async (req, res) => {
//     const user = await User.findOne({ email: req.body.email });
//     if (user) {
//       const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
//         expiresIn: '3h',
//       });
//       user.resetToken = token;
//       await user.save();

//       console.log(`${baseUrl}/reset-password/${token}`);

//       mailgun()
//         .message()
//         .send(
//           {
//             from: 'SBC <me@mg.sbc.com>',
//             to: `${user.name} <${user.email}>`,
//             subject: 'Reset Password',
//             html: `<p>Please Click the following link to reset your passwod:</p> 
//     <a>href="${baseUrl()}/reset-password/${token}"Reset Password</a>
//     `,
//           },
//           (error, body) => {
//             console.log(error);
//             console.log(body);
//           }
//         );
//       res.send({
//         message:
//           'We sent reset password link to your email, please check your email.',
//       });
//     } else {
//       res.status(404).send({ message: 'User not found' });
//     }
//   })
// );
// UserRoute.post(
//   '/reset-password',
//   expressAsyncHandler(async (req, res) => {
//     jwt.verify(req.body.token, process.env.JWT_SECRET, async (err, decode) => {
//       if (err) {
//         re.status(401).send({ message: 'Invalid Token' });
//       } else {
//         const user = await User.findOne({ resetToken: req.body.token });
//         if (user) {
//           if (req.body.password) {
//             user.password = bycrpt.hashSync(req.body.passwod, 8);
//             await user.save();
//             res.send({
//               message: 'Passwod reseted successfully',
//             });
//           }
//         } else {
//           res.status(401).send({ message: 'User not found' });
//         }
//       }
//     });
//   })
// );
export default UserRoute;
