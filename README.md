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

Home Screen
![Screenshot from 2023-03-14 12-45-09](https://user-images.githubusercontent.com/104878259/225120088-f462d55e-1b7f-4d71-83d3-6de307f1feb8.png)
Your Profile:
![Screenshot from 2023-03-14 12-49-42](https://user-images.githubusercontent.com/104878259/225120411-507441ef-3da6-4b0d-988b-96d0d8737624.png)
Viewing your matches:
![Screenshot from 2023-03-14 13-04-07](https://user-images.githubusercontent.com/104878259/225123613-f95d487e-4a57-449e-960e-ea95cbc35cf4.png)

# How to install and run StudySync:
1. Clone the github repository to your local machine.
` git clone https://github.com/myCoalSmells/study_sync `

2. Run ` npm install ` to install all of our dependencies.
  If you do not have node.js installed on your machine, install it first.
 
3. Run ` npm start `.
  This should allow you to view the app at http://localhost:3000/ in your preferred browser.

  If this doesn't work, you can try ` npm i react-scripts `
  and/or ` export NODE_OPTIONS=--openssl-legacy-provider `
  and then try ` npm start ` again.

# How to use StudySync:
1. If you are not yet logged into the site, http://localhost:3000/ will take you to the login page where you can log in with your account. If you do not have an account, you can sign up via the signup button located on the bottom of the page. If you have forgotten your password, first enter your email into the "Email" field on the page and then use the Forgot Password link which will send you an email with a link redirecting you to reset your password.
2. If you are logged in, http://localhost:3000/ will take you to the homepage, which has information cards of users (with shared classes and number of shared available times) who have matching classes with you. You can swipe left to dislike a user or swipe right to like a user. Once a user is liked or disliked, their card will no longer appear on your homepage.
3. A button redirecting you to your profile, where you can view your personal details (classes and email) and schedule, is located on the top left of the homepage. If you desire to change the details of your account, you can click the Edit Profile button, which will take you to a page that allows you to change your username, schedule, profile picture, classes, and password. The schedule is graphically displayed as a set of boxes, one for each hour of a week (red = not available, green = available). While editing your profile, you can click on a green box to change it to red, and vice versa.
4. A button redirecting you to your inbox, where you can view your matches, is also located on the top left of the homepage. The inbox page shows your new matches in card format, with the username, profile picture, email, and classes of each match, and you can view the profile of a user that is matched to you by clicking on the View Profile button on their card. This will show you their information, as well as a schedule that shows times that you are both available throughout the week where a yellow box means both available, and red means either one of you are not available.
5. On the homepage, the logout button is on the top right if you wish to log out. You will be redirected to a page indicating that you have logged out and allowing you to log back in if you wish.
6. To return to the homepage with your cards, simply click on the StudySync logo at the top of the page.

# Next Steps
1. Implement some form of checking for when the classes are selected, such as choosing classes from a dropdown list instead of having to enter them manually. It could work like [subject][code]
1a. The way that we would do this is by consulting the UCLA official course catalog and adding all the subjects to one dropdown menu. The course code could then be entered manually by the user. It is difficult to get all the course codes and put them into a dropdown menu since the courses at UCLA keep changing, moreover some courses start with and end with (sometimes multiple) letters, so we cannot just enforce an integer constraint to that part of the form
2. Currently we only show the number of hours that another user’s schedule overlaps with the logged in user’s schedule on the profile cards. Ideally we would make it so that the user could somehow be able to view the overlap in schedule between them and a potential match before they make the decision to swipe. 
3. Could implement a more efficient schedule display, where only a certain range of times are included, rather than the full 24 hours of time slots.
4. Implement some kind of image hosting so that users don’t have to supply a url for an image hosted elsewhere for their profile picture.
5. Make rendering cards a lot faster by organizing our data in a more efficient manner. This way our app can be more scalable.
matching students by major and separating classes by quarter
6. Implement a chat/messaging feature, as right now the app does not facilitate communication between users apart from revealing to each other their emails.
7. general schedule that spans up to a whole month or entire quarter on top of a schedule over one week, so the user doesn't have to update their information weekly.
8. have a more efficient swiping method, add like/dislike buttons (for people who don't want to swipe)
9. Notify users if they have new or unread matches (email, or chat messaging system from earlier).
10. Create some kind of authentication system that only allows signup for students who are associated with UCLA, along with email verification.
11. Potentially in the future we could abstract the database to contain collections pertaining to one educational institution each (currently it is only geared towards UCLA students), which would increase the scope of the project as well as reduce computation times for that scope. 
12/ Currently, users can sign up with any email address, as long as there is an @ inside it. We want to fix this and make sure that the emails are valid, and not fake emails.



# Credits
* Michael Liu- @myCoalSmells
* Fateh Sandhu- @fatehss
* Harry Hinman- @harryhinman
* Joshua Kim- @jdkim5136
* Tiffany Tsou- @ttsou1
