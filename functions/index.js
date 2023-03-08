const functions = require("firebase-functions");

const admin = require('firebase-admin');
const { getFirestore } = require("firebase-admin/firestore");
admin.initializeApp();

/**
 * This function creates a user as well as adds the user's information to the firestore database
 * Params of req:
 *  firsname: The first name of the student, as a string
 *  lastname: ...
 *  schedule: The schedule of the student. Should be submitted as a string with length 14*7=98 (from 8am to 10pm, seven days a week)
 *            containing ONLY 1's and 0's.
 *     email: The email of the user. Must be a valid email to create the user.
 *  password: The password. Must be at least six characters long.
 * 
 * TODO: there is an option for photoURL, which we could try to implement in the future
 */
//The url for this is: http://127.0.0.1:5001/study-sync-23/us-central1/addStudent?firstname=terry&lastname=tao&schedule=1010101001000100101001010010101001&emailaddress=terrytao@ucla.edu&password=123124
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

  /// The functions below are not working yet; committing because of merge branches
  exports.getAllStudents = functions.https.onRequest(async (req, res) => {
    const snapshot = await firebaseApiOrigin.firestore().collection("students").get();
    return snapshot.docs.map(doc => doc.data());
  });

  const colRef = collection(db, 'students');
  const db = getFirestore();
  exports.getDocs(colRef)
    .then(snapshot => {
      // console.log(snapshot.docs)
      let books = []
      snapshot.docs.forEach(doc => {
        books.push({ ...doc.data(), id: doc.id })
      })
      console.log(books)
    })
    .catch(err => {
      console.log(err.message)
    })
/**
 * get a document by collection - ID
 * 
 * firebase emulators:start
 */
