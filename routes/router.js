const ChemConMember = require("../models/chemlist");
const router = require("express").Router();
const AttendeeSchema=require("../models/attendeeSchema");
const nodemailer=require("nodemailer"); 
// const bcrypt = require("bcrypt");

  router.post('/check-email', async (req, res) => {
    const  email = req.body.data.email;
    console.log(email)
    try {
        const attendee = await AttendeeSchema.findOne({ Email:email  });
      const user = await ChemConMember.findOne({ Email:email  });
      console.log(user)
      if(attendee){
        res.json({ message: 'Already registered.',status:0 });
      }
      else if (user) {
        const email= user.Email; 
        const name= user.Name; 
        const mobile= user.mobile; 
        const org= user.org; 
        const url= ""; 
        const category= user.Category; 
        const kit= user.Kit; 
        const checkin1= false; 
        const checkin2= false; 
        const checkin3= false; 
        const newUser = await AttendeeSchema.create({ 
            Name: name, 
            Email: email, 
            mobile: mobile, 
            Kit: kit, 
            org: org, 
            Url: url, 
            Category: category, 
            checkin1: checkin1, 
            checkin2: checkin2, 
            checkin3: checkin3, 
        }); 
        res.json({  data:user, message: 'Email found in the database, stored as attendee.',status:1 });
      } else {
        res.json({ message: 'Email not found in the database.',status:2 });
      }
    } catch (error) {
      console.error('Error checking email:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  });
   
  router.post('/add', async (req, res) => {
    try{
        const qr=await AttendeeSchema.updateOne(
            {
                "Email":req.body.data.email,
            },
            {
                "Url":req.body.data.qr,
            }
        );
        console.log(qr);
    }
    catch(error){
        console.log(error);
    }
});



exports.Formf = async (req, res, next) => { 
 
    try { 
        const data= req.body; 
        console.log(data.data); 
        sendOTPViaEmail(data.data.email, data.data.qr); 
        res.status(200).json({message: "Email OTP sent successfully"}); // "success 
        next(); 
    }  
    catch (error) { 
        console.log(error); 
    } 
} 
 
 
// Function to send OTP via email 
function sendOTPViaEmail(emailed, qr) { 
  try{ 
  // Configure a Nodemailer transporter to send emails 
  console.log(emailed); 
    console.log(qr); 
  const transporter = nodemailer.createTransport({ 
    host: 'smtp.gmail.com', 
    port: 465, 
    secure: true, 
    auth: { 
      user: "arnabc857@gmail.com", 
      pass: "dratvdvupxdmlpmb", 
    }, 
  }); 
 
    // Email content and configuration (customize this based on your email service) 
    const mailOptions = { 
      from: "arnabc857@gmail.com", 
      to: emailed, 
      subject: "Your QR Code is ready!", 
      text: `Your QR code is` , 
        html: `<div><p><b>Hello</b></p> 
        <p>Here's the QR code:<br/><a href="${qr}">QR link</a></p> 
        <p>${qr}</p></div>`, 
 
        // AMP4EMAIL 
        amp: `<!doctype html> 
        <html ⚡4email> 
          <head> 
            <meta charset="utf-8"> 
            <style amp4email-boilerplate>body{visibility:hidden}</style> 
            <script async src="https://cdn.ampproject.org/v0.js"></script> 
            <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script> 
          </head> 
          <body> 
            <p><b>Hello</b> to myself <amp-img src="${qr}" width="16" height="16"/></p> 
            <p>No embedded image attachments in AMP, so here's a linked nyan cat instead:<br/> 
              <amp-anim src="${qr}" width="500" height="350"/></p> 
          </body> 
        </html>`, 
 
        // An array of attachments 
         
 
    }; 
   
    // Send the email 
    transporter.sendMail(mailOptions, (error, info) => { 
      if (error) { 
        console.log(error); 
      } else { 
        console.log(`Email sent: ${info.response}`); 
      } 
    }); 
  } 
  catch(err) 
  { 
    // html: `<p><b>Hello</b> to myself <img src="cid:note@example.com"/></p> 
    //     <p>Here's a nyan cat for you as an embedded attachment:<br/><img src="${qr}"/></p>`, 
       
    console.log(err) 
  } 
}

module.exports = router;
