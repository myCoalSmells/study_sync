# Project Title:
StudySync

# Description of StudySync:

StudySync is a social media web application made using ReactJS, node.js, and Firebase that matches students to study groups based on their schedules. Students are matched to others based on common courses they are currently taking and they can maintain and edit their own profiles, which include their email as a form of possible contact, a profile picture, their available times during the week, and the classes they are taking. Users are able to like and dislike other users via a swipe-left/swipe-right card mechanism on the main page and also view those users' profiles. An inbox feature displays new matches for a user in card style.

Other technologies used:
react router v6, mui icons

# Features:

* Create an account
* Login
* Logout
* Profile cards (swipe right to like, swipe left to dislike)
* Matching with other users (classes and available times)
* Inbox notifying user of new matches
* Create profile
* Edit profile - Ability to select a schedule by clicking on an interactive graph
* View other users' profiles

Home Screen:

<img width="1439" alt="image" src="https://user-images.githubusercontent.com/63516607/225502716-f0e80e17-c387-4b32-9d4d-dd6a80a9ecb2.png">
Your Profile:

<img width="1422" alt="image" src="https://user-images.githubusercontent.com/63516607/225502840-27c2900e-6121-435e-8500-a324ae3e8c74.png">
Viewing your matches:

<img width="1440" alt="image" src="https://user-images.githubusercontent.com/63516607/225502966-2ff8844c-c1e9-4ebb-9acb-7e4a5d6de209.png">
Login Screen:

<img width="1415" alt="image" src="https://user-images.githubusercontent.com/63516607/225502350-a6c32783-554a-4cac-bcbb-dd39381c1477.png">


# How to install and run StudySync:
1. Clone the github repository to your local machine.
`git clone https://github.com/myCoalSmells/study_sync`

2. Install Node.js:
If you don't already have Node.js installed on your machine, you can download it from the [Node.js website](https://nodejs.org/). Follow the installation instructions for your operating system.

3. Install all of our dependencies:
`npm install`
 
4. Run the app:
`npm start`
This will launch the app in your preferred browser at `http://localhost:3000/`. You should see the StudySync login page.

If the app doesn't launch successfully, you can try the following:

- Install react-scripts:
`npm i react-scripts`
- Set the NODE_OPTIONS environment variable to use the OpenSSL legacy provider:
`export NODE_OPTIONS=--openssl-legacy-provider`


Then try running the app again using the `npm start` command.

# How to use StudySync:
1. If you are not yet logged into the site, http://localhost:3000/ will take you to the login page where you can log in with your account. If you do not have an account, you can sign up via the signup button located on the bottom of the page. If you have forgotten your password, first enter your email into the "Email" field on the page and then use the Forgot Password link which will send you an email with a link redirecting you to reset your password.
2. If you are logged in, http://localhost:3000/ will take you to the homepage, which has information cards of users (with shared classes and number of shared available times) who have matching classes with you. You can swipe left to dislike a user or swipe right to like a user. Once a user is liked or disliked, their card will no longer appear on your homepage.
3. A button redirecting you to your profile, where you can view your personal details (classes and email) and schedule, is located on the top left of the homepage. If you desire to change the details of your account, you can click the Edit Profile button, which will take you to a page that allows you to change your username, schedule, profile picture, classes, and password. The schedule is graphically displayed as a set of boxes, one for each hour of a week (red = not available, green = available). While editing your profile, you can click on a green box to change it to red, and vice versa.
4. A button redirecting you to your inbox, where you can view your matches, is also located on the top left of the homepage. The inbox page shows your new matches in card format, with the username, profile picture, email, and classes of each match, and you can view the profile of a user that is matched to you by clicking on the View Profile button on their card. This will show you their information, as well as a schedule that shows times that you are both available throughout the week where a yellow box means both available, and red means either one of you are not available.
5. On the homepage, the logout button is on the top right if you wish to log out. You will be redirected to a page indicating that you have logged out and allowing you to log back in if you wish.
6. To return to the homepage with your cards, simply click on the StudySync logo at the top of the page.

# Next Steps
1. Implement some form of checking for when the classes are selected, such as choosing classes from a dropdown list instead of having to enter them manually. It could work like [subject][code]
1a. The way that we would do this is by consulting the UCLA official course catalog and adding all the subjects to one dropdown menu. The course code could then be entered manually by the user. It is difficult to get all the course codes and put them into a dropdown menu since the courses at UCLA keep changing, moreover some courses start with and end with (sometimes multiple) letters, so we cannot just enforce an integer constraint to that part of the form.
2. Currently we only show the number of hours that another user’s schedule overlaps with the logged in user’s schedule on the profile cards. Ideally we would make it so that the user could somehow be able to view the overlap in schedule between them and a potential match before they make the decision to swipe. 
3. Could implement a more efficient schedule display, where only a certain range of times are included, rather than the full 24 hours of time slots.
4. Implement some kind of image hosting so that users don’t have to supply a url for an image hosted elsewhere for their profile picture.
5. Make rendering cards a lot faster by organizing our data in a more efficient manner. This way our app can be more scalable.
matching students by major and separating classes by quarter
6. Implement a chat/messaging feature, as right now the app does not facilitate communication between users apart from revealing to each other their emails.
7. General schedule that spans up to a whole month or entire quarter on top of a schedule over one week, so the user doesn't have to update their information weekly.
8. Have a more efficient swiping method, add like and dislike buttons (for people who don't want to swipe)
9. Notify users if they have new or unread matches (email, or chat messaging system from earlier).
10. Create some kind of authentication system that only allows signup for students who are associated with UCLA, along with email verification.
11. Potentially in the future we could abstract the database to contain collections pertaining to one educational institution each (currently it is only geared towards UCLA students), which would increase the scope of the project as well as reduce computation times for that scope. 
12. Currently, users can sign up with any email address, as long as there is an @ inside it. We want to fix this and make sure that the emails are valid, and not fake emails.

# Notable Difficulties

**Getting Firebase Firestore to work** - due to the plethora of differing tutorials online on how to get firebase linked up with our app, we had different approaches to getting the database functions running. This was by far the most confusing part of the project. I (Fateh) tried to store the firebase functions and custom endpoints in a separate directory outside of the project src directory, but ran into setup errors, mainly that react create-app does not support inclusion of modules outside of the src directory. Moreover due to the different setup methods that we used, we had differences in our package.json files; ultimately we Instead, what we ended up doing was importing the function/variables etc from “firebase/xyz” in our .js files that pertained to a webpage each. 

**Infinite function loop causing excessive DB reads** - while implementing the authentication part of our application, we ran into an error where the database read operations nested in the useEffect function in the file ProfileCards.js would repeatedly get called in an infinite loop. This is because the onAuthStateChanged function was being called every time that the component was being rendered. We noticed this error when we checked the Firebase SDK Firestore usage page and realized that the number of reads performed that day was 300k (which is above the daily free limit of 100k). We fixed this issue by nesting the database functions inside the inAuthStateChanged function; this way they would only be called once (when the web page eventually detects the user login). 

**Swiping and Matching** - The foundation of our app is based on swiping and matching, which required significant consideration in terms of organizing our database and user interface to ensure ease of use. Initially, the swiping function had some glitches, and we had to devote a considerable amount of time to developing consistent swipe rendering functions. As a result, we needed to design our entire database around this functionality. Ultimately, we determined that each student's profile should include a list of classes they are enrolled in, as well as a list of students they have liked, disliked, and matched (if both parties have expressed interest in one another). Ensuring that only relevant student profiles were displayed on the frontend required effort from both our frontend and backend, and due to the complexity of rendering and fetching data, we encountered several challenges and bugs along the way. Eventually, we successfully rendered all of the cards in a semi-efficient manner, but can definitely be improved upon in the future.

**User Schedule** - The schedule in profilepage.js was generated with a function, utilizing the table elements. This was easy enough, since it was reading indexes from the schedule data provided by the database. However, the challenge came in while working on a way to edit the user schedule. Initially, the edit schedule was created with the exact same function to display the schedule. The schedule indexing was messed up, even though the code was copied and pasted over from the profiepage.js. Eventually, I hard coded all 168 buttons and individually passed its index to another function which changed the schedule provided by the database. The checkboxes were later swapped out with large rectangular squares, which changed colors when the user pressed on it (red if not available, and green if available). Another issue with the user schedule, was that everytime the user pressed a button to change their availability in the schedule, this kept calling the 'update profile' button, which changed the data without the user's permission. This led to the realization that other buttons that we put in the <form> element also triggered this behavior, not only the schedule buttons. After moving all the buttons out of the form, the bug was fixed. There are definitely areas for improvement in the schedule that I created. One, in the user profile, the schedule should display only a certain range of times that are relevant to the user, rather than displaying the full 24 hours.

**Git** - at the beginning of our project, we were not very familiar with Git and how to use it. We’d have many merge conflicts, and our branches would become divergent because we were not communicating properly on what we were pulling, pushing etc. This occurred when we updated the package.json and package-lock.json with react dependencies and firebase dependencies. This ended up creating fifty-thousand lines in the diff file, which took quite some time to resolve the merge conflicts. As the project progressed, we got better at using Git and we had less issues with it. Everytime anyone wanted to add a new feature, that person would branch out, then merge the branch back into master once their feature was working fully. We also realized that communication was extremely important, and we communicated more frequently while working on the project.

**Bugs** - After lots of testing many bugs were revealed. The difficulty was finding where each bug resided within our many files, and fixing them in a way that doesn’t break other functionalities. There were many many little bugs and some notable ones were reading from fields in the students that had null values and buttons not functioning properly due to small mistakes in code. Another notable bug was that every action in the edit profile page would automatically call the function that would be called when the 'update profile' button was clicked (auto-update bug).



# Credits
* Michael Liu- @myCoalSmells
* Fateh Sandhu- @fatehss
* Harry Hinman- @harryhinman
* Joshua Kim- @jdkim5136
* Tiffany Tsou- @ttsou1
