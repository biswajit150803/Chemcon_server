const AttendeeSchema = require("../model/attendeeSchema"); 
 
exports.Check1 = async (req, res, next) => { 
 
    try { 
        const data= req.body; 
        console.log(data.data); 
        const email = data.data.email; 
        const user = await AttendeeSchema.findOne({Email: email}); 
        if(user) 
        { 
            const update = await AttendeeSchema.updateOne( 
                { 
                  Email: email, 
                }, 
                { 
                  checkin1: true, 
                }                 
              ); 
              console.log(update) 
              res.status(200).json({message: "Email OTP sent successfully"}); // "success 
            next(); 
        } 
        else{ 
            res.status(404).json({message: "No such user found"}); 
        } 
    }  
    catch (error) { 
        console.log(error); 
    } 
} 
exports.Check2 = async (req, res, next) => { 
 
    try { 
        const data= req.body; 
        console.log(data.data); 
        const email = data.data.email; 
        const user = await AttendeeSchema.findOne({Email: email}); 
        if(user) 
        { 
            const update = await AttendeeSchema.updateOne( 
                { 
                  Email: email, 
                }, 
                { 
                  checkin2: true, 
                }                 
              ); 
              console.log(update) 
              res.status(200).json({message: "Email OTP sent successfully"}); // "success 
            next(); 
        } 
        else{ 
            res.status(404).json({message: "No such user found"}); 
        } 
    }  
    catch (error) { 
        console.log(error); 
    } 
} 
exports.Check3 = async (req, res, next) => { 
 
    try { 
        const data= req.body; 
        console.log(data.data); 
        const email = data.data.email; 
        const user = await AttendeeSchema.findOne({Email: email}); 
        if(user) 
        { 
            const update = await AttendeeSchema.updateOne( 
                { 
                  Email: email, 
                }, 
                { 
                  checkin3: true, 
                }                 
              ); 
              console.log(update) 
              res.status(200).json({message: "Email OTP sent successfully"}); // "success 
            next(); 
        } 
        else{ 
            res.status(404).json({message: "No such user found"}); 
        } 
    }  
    catch (error) { 
        console.log(error); 
    } 
} 
exports.show = async (req, res, next) => { 
     
        try { 
             
            const user = await AttendeeSchema.find(); 
            res.status(200).json({user});  
        }  
        catch (error) { 
            console.log(error); 
        } 
    } 
 
exports.add = async (req, res, next) => { 
    try{ 
        const data = req.body; 
        console.log(data); 
        const email= data.data.email; 
        const name= data.data.name; 
        const mobile= data.data.mobile; 
        const org= data.data.org; 
        const url= data.data.url; 
        const category= data.data.category; 
        const kit= "On-Spot Registration"; 
        const checkin1= false; 
        const checkin2= false; 
        const checkin3= false; 
        const user = await AttendeeSchema.findOne({Email: data.data.email}); 
        if(user){ 
            res.status(404).json({message: "User already exists with this email"}); 
        } 
        else{ 
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
            console.log(newUser); 
            res.status(200).json({message: "User created successfully"}); 
        } 
    } 
    catch(error){ 
        console.log(error); 
    } 
}