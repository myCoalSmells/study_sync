# Project Title:
StudySync

# Description of StudySync:

StudySync is a social media web application made using ReactJS, node.js, and Firebase that matches students to study groups based on their schedules. Students are matched to others based on common courses they are currently taking and they can maintain and edit their own profiles, which include their email as a form of possible contact, a profile picture, their available times during the week, and the classes they are taking. Users are able to like and dislike other users via a swipe-left/swipe-right card mechanism on the main page and also view those users' profiles. An inbox feature displays new matches for a user in card style.

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

Home Screen
![Screenshot from 2023-03-14 12-45-09](https://user-images.githubusercontent.com/104878259/225120088-f462d55e-1b7f-4d71-83d3-6de307f1feb8.png)
Your Profile:
![Screenshot from 2023-03-14 12-49-42](https://user-images.githubusercontent.com/104878259/225120411-507441ef-3da6-4b0d-988b-96d0d8737624.png)
Viewing your matches:
![Screenshot from 2023-03-14 13-04-07](https://user-images.githubusercontent.com/104878259/225123613-f95d487e-4a57-449e-960e-ea95cbc35cf4.png)

# How to install and run StudySync:
1. Clone the github repository to your local machine.
git clone https://github.com/myCoalSmells/study_sync

2. Run npm start

If you do not have node.js installed on your machine, install it first.

npm start
This should allow you to view the app at http://localhost:3000/ in your preferred browser.

If this doesn't work, you can try npm i react-scripts
and/or export NODE_OPTIONS=--openssl-legacy-provider
and then try npm start again.

# How to use StudySync:
1. If you are not yet logged into the site, http://localhost:3000/ will take you to the login page where you can log in with your account. If you do not have an account, you can sign up via the signup button located on the bottom of the page. If you have forgotten your password, first enter your email into the "Email" field on the page and then use the Forgot Password link which will send you an email with a link redirecting you to reset your password.
2. If you are logged in, http://localhost:3000/ will take you to the homepage, which has information cards of users (with shared classes and number of shared available times) who have matching classes with you. You can swipe left to dislike a user or swipe right to like a user. Once a user is liked or disliked, their card will no longer appear on your homepage.
3. A button redirecting you to your profile, where you can view your personal details (classes and email) and schedule, is located on the top left of the homepage. If you desire to change the details of your account, you can click the Edit Profile button, which will take you to a page that allows you to change your username, schedule, profile picture, classes, and password. The schedule is graphically displayed as a set of boxes, one for each hour of a week (red = not available, yellow = available). While editing your profile, you can click on a yellow box to change it to red, and vice versa.
4. A button redirecting you to your inbox, where you can view your matches, is also located on the top left of the homepage. The inbox page shows your new matches in card format, with the username, profile picture, email, and classes of each match, and you can view the profile of a user that is matched to you by clicking on the View Profile button on their card.
5. On the homepage, the logout button is on the top right if you wish to log out. You will be redirected to a page indicating that you have logged out and allowing you to log back in if you wish.

# Credits
* Michael Liu- @myCoalSmells
* Fateh Sandhu- @fatehss
* Harry Hinman- @harryhinman
* Joshua Kim- @jdkim5136
* Tiffany Tsou- @ttsou1