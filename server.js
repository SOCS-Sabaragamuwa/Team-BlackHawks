const express = require('express');//express framework
const app = express();

const accountSid = 'AC9131f0546dbc08887682573572d9b185';//sid for TWILIO
const authToken = '77507c38ddb969919777ceef139107b1';//auth token for TWILIO
const client = require('twilio')(accountSid, authToken);
var randomstring=require("randomstring");

var passwordValidator = require('password-validator');//password validating tools
 // Create a schema
 var schema = new passwordValidator();



var bodyParser = require('body-parser');
var payloadChecker = require('payload-validator');
var router = express.Router();
var expectedPayload1 = {//payloaad variables
    "nic": ""
};
var expectedPayload2 = {
    "mobile": ""
};
var expectedPayload3 = {
    "password": ""
};
var expectedPayload4 = {
    "vehicle_number": ""
};


var numbervalidator= require('password-validator');
var schemafrontonlynumbers = new numbervalidator();//for the selection of password validation
var schemafrontonlyletters = new numbervalidator();
var schemaback = new numbervalidator();

app.use(bodyParser.json());


app.get('/api', function (req, res) {
    res.status(200).json({
        message: 'OK'
    });
})

app.get('/api/vehicles', function (req, res) {
    res.status(200).json({
        message: 'OK'
    });
})
app.get('/api/officers', function (req, res) {
    res.status(200).json({
        message: 'OK'
    });
})

app.post('/api/officers', function (req, res) {
    res.status(400).json({
        message: 'OK'
    });
    
})

app.post('/api/avatars', function (req, res) {
    res.status(200).json({
        message: 'OK'
    });
})
app.post('/api/shops', function (req, res) {
    res.status(201).json({
        message: 'OK'
    });
})
app.post('/api/complaints', function (req, res) {
    res.status(201).json({
        message: 'OK'
    });
})


app.post('/api/garbagelogs', function (req, res) {
    res.status(201).json({
        message: 'OK'
    });
})

app.post('/api/routes', function (req, res) {
    res.status(201).json({
        message: 'OK'
    });
})


app.post('/api/OAuth', function (req, res) {
    res.status(201).json({
        message: 'OK'
    });
})

app.post('/api/timetables', function (req, res) {
    res.status(201).json({
        message: 'OK'
    });
})


app.get('/api/routes', function (req, res) {
    res.status(200).json({
        message: 'OK'
    });
})
app.get('/api/users/me', function (req, res) {
    res.status(200).json({
        message: 'OK'
    });
})

app.post('/api/vehicles', function (req, res) {
    
    app.use(bodyParser.json());

    var str=JSON.stringify(expectedPayload4);

    var sub=str.split('-');
    //subdivide str in two parts
    var results = payloadChecker.validator(req.body, expectedPayload4, ["vehicle_number"], false);
    schemafrontonlynumbers//schemas to validate to the passwords
    .is().min(2)                                    
    .is().max(3) 
    .is().digits()
    .has().not().letters();
    schemafrontonlyletters
    .is().min(2)                                    
    .is().max(3) 
    .is().letters()
    .has().not().lowercase()
    .has().not().digits();
    schemaback
    .is().min(4)                                    
    .is().max(4)
    .has().not().letters()
    

    if(schemaback.validate(sub[1])==false){
        if(schemafrontonlyletters.validate(sub[0])==true){
            // number is valid number 
            res.status(200).json({
                message: 'OK'
            });
        }
        else if(schemafrontonlynumbers.validate(sub[0])==true){
            // number is a valid number
            res.status(200).json({
                message: 'OK'
            });
        }
        else{
            //number is invalid
            res.status(400).json({
                message: 'OK'
            });
        }
    }
    else{
         //number is invalid 
         res.status(400).json({
            message: 'OK'
        });
    
    }
  
  
})


app.get('/api/complaints', function (req, res) {
    res.status(200).json({  //get request OK status
        message: 'OK'
    });
})


app.get('/api/timetables', function (req, res) {
    res.status(200).json({
        message: 'OK'
    });
})


app.get('/api/users',function(req,res){
    res.status(200).json({
        message: 'OK'
    });
});

app.post('/api/users', function (req, res) {
    app.use(bodyParser.json());
   

    if (req.body) {

        var result = payloadChecker.validator(req.body, expectedPayload1, ["nic"], false); //validate nic
        if (result.success) {
                    var result2 = payloadChecker.validator(req.body, expectedPayload2, ["mobile"], false); //validate mobile
                    if (result2.success) {
                        
                        var result3 = payloadChecker.validator(req.body, expectedPayload3, ["password"], false);  //validate password
                        if (result3.success) //if a password is given
                        {
                            
                            
                            // Add properties to it
                            schema
                            .is().min(6)                                    // Minimum length 8
                            .is().max(8)                                  // Maximum length 100
                            .has().uppercase()                              // Must have uppercase letters
                            .has().lowercase()                              // Must have lowercase letters                          // Should not have spaces
                            .has().symbols(['~','!','@','#','$','%','^','&','*','(',')','_','-','+','=','|','{','}','[',']','.','?','`']); // Blacklist these values
                            //password='vdAsg1#3';
                            
                            //console.log(password);
                            if (schema.validate(expectedPayload3)==true) { 
                                res.status(400).json({
                                    // "message": "Nic no is not set",
                                    // "developerMessage": " User creation failed because the nic no is not set"
                             });
                             

                             }
                            else  
                            {  //BAD request password invalid
                                res.status(400).json({
                                    "message": "Password complexity requirement not met",
                                    "developerMessage": "User creation failed because password complexity requirement not met"
                             });

                            }
                        }
                        else
                        {
                            password=randomstring.generate(8); //generate random passsword of 8 characters
                            console.log("Password is : "+ password);
                            var bodyMessage="Your password is : "+password; 
                            client.messages
                            .create({
                                body: bodyMessage,
                                from: '+14695073735 ', //senders number
                                to: '+94767910431'  //recievers number
                            })
                            .then(message => console.log(message.sid));

                            res.status(400).json({
                                "message": "test", 
                                "developerMessage": " User creation failed because the mobile no is not set" 
                        });

                        }
                        

                    } else {
                        res.status(400).json({  
                            "message": "Mobile no is not set",
                            "developerMessage": " User creation failed because the mobile no is not set"
                    });
                    }
        } else {
            var result2 = payloadChecker.validator(req.body, expectedPayload2, ["mobile"], false); //mobile number validation
                    if (result2.success) {
                        res.status(400).json({ 
                            "message": "Nic no is not set",
                            "developerMessage": " User creation failed because the nic no is not set"
                     });
                    } else {
                        res.status(400).json({ 
                            "message": "Mobile no is not set",
                            "developerMessage": " User creation failed because the mobile no is not set",
                            "message": "Nic no is not set",
                            "developerMessage": " User creation failed because the nic no is not set"
                    });
                    
                    }
            
        }
        
    } else {
        res.status(400).json({
            "message": "Mobile no is not set",
            "developerMessage": " User creation failed because the mobile no is not set",
            "message": "Nic no is not set",
       "developerMessage": " User creation failed because the nic no is not set"
        });
    }

})

app.listen(9090, () => {   //listen to port 9090
    console.log("server is runnig.")
})