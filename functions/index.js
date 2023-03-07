const functions = require("firebase-functions");

const admin = require('firebase-admin');
admin.initializeApp();



/**
 * This function creates a user as well as adds the user's information to the firestore database
 */
//The url for this is: http://127.0.0.1:5001/study-sync-23/us-central1/addStudent?firstname=John&lastname=Smith&schedule=1010101001000100101001010010101001&emailaddress=who@what.com&password=asdfasdf
exports.addStudent = functions.https.onRequest(async (req, res) => {
    // Grab the text parameter.
    
    try { 
        const firstname = req.query.firstname;
        const lastname = req.query.lastname;
        const schedule = req.query.schedule
        const email = req.query.emailaddress;
        const password = req.query.password;

        const userRecord = await admin.auth().createUser({
          email: email,
          password: password
        });
        const writeResult = await admin.firestore().collection('students').add({firstName: firstname,
        lastName: lastname, schedule:schedule});

        res.json({result: `Student with ID: ${writeResult.id} added.`});
    } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
    }

  });


