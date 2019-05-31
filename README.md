# Greenthumb Therapy

**[Greenthumb Therapy](https://greenthumb-therapy.herokuapp.com/)** is an application designed to provide its users accessible plant information. In today's fast-paced environment, many people do not have the time and knowledge to search for plants that are most compatible with their life. While some of the benefits of having plants include cleaner air and overall aesthetic improvement to a home or office, consumers may have to consider animals and possible allergies.

After a great deal of research, we found several great resources about plants, but not necessarily about how compatible these plants would be to the layperson. We developed Greenthumb Therapy to allow users to search for plant information with the same clarity and functionality across different platforms, whether the application is on a desktop or mobile device.
  
## Web Technology: Features and Functions

- **[Materialize](https://materializecss.com/)** is a CSS framework that was used to develop features such as cards, buttons, and lists to present a powerful, well-structured, visually pleasing components to build our application. Through the use of these features and colors, we can indicate important plant features and requirements. We also used the slider feature to capture a potential user's attention and lead them to a best solution for their environment.

- **[React](https://reactjs.org/)** was used to further enhance our front-end with component logic written in JavaScript to improve overall rendering performance. With creative views, we designed a simple, yet effective, interface to efficiently convey important plant information to our users.

- **[Axios](https://www.npmjs.com/package/axios)** routing was used to integrate out application with back-end logic in the API, such as handling questionnaire results, returning search queries, and updating user information.

- **[Express.js](https://expressjs.com/)** is a web framework that we used to build our server.

- **[Node.js](https://nodejs.org/)** is our development environment we used to build our application.

- **[MongoDB](https://www.mongodb.com/)** and **[Mongoose](https://mongoosejs.com/)** were used to store data about plants and users.

- **[JSON Web Token](https://www.npmjs.com/package/jsonwebtoken)** along with **[Cookie Parser](https://www.npmjs.com/package/cookie-parser)** middleware is how we handled user sessions. Currently user sessions last one (1) hour before they need to log in again.

- **[Bcrypt](https://www.npmjs.com/package/bcrypt)** is a Node package we used to handle hashing passwords before saving them in the database as well as for validating passwords when users log in.

- **[Trefle API](https://trefle.io/)** is the API we used to query results and to pull plant information from.

## How to Use Greenthumb Therapy

### User Account Management

To get the most out of Greenthumb Therapy, we recommend that our users create an account.

### Demo Account

If you would like to check out Greenthumb Therapy's features before creating your own account, then you can use the demo account below:

Email: `jsmith@email.com`
Password: `password`

#### Registering an Account

1. Click **[Register](https://greenthumb-therapy.herokuapp.com/register)** in the menu to go to the Register page.
![Link to register](/public/images/user-register1.PNG)
2. Fill out the form with your *first name*, *last name*, *email*, and *password* you wish to use for your account.
![Filled out registration form](/public/images/user-register2.PNG)
3. Click **Register User** to submit the form.
4. If the email is already in use, you will get an error message.
5. Upon a successful sign up, you will get the message *Welcome to Greenthumb Therapy!* and you can now log in to Greenthumb Therapy with your email and password.

**Caveat**: Please make sure your password is not a simple sequence of letters like *abc*, numbers *123*, or a single word like *password*. Even though your password will be encrypted, it is still recommended that you use a secure password.

#### Logging In

1. Click **[Log in](https://greenthumb-therapy.herokuapp.com/login)** in the menu to go to the Login page.
![Link to log in](/public/images/user-login1.PNG)
2. Fill out the form with your *email* and *password*.
![Filled out log in form](/public/images/user-login2.PNG)
3. Click **Login User** to submit the form.
4. If you were not logged in, you will be redirected back to the Login page.
5. If you were logged in successfully, you will be redirected to your User page.

#### Setting Preferences

1. You can see your current preferences on your **[user](https://greenthumb-therapy.herokuapp.com/user)** page.
![Previous user preferences](/public/images/user-preferences1.PNG)
2. Go to **[Questionnaire](https://greenthumb-therapy.herokuapp.com/questionnaire)** and fill it out.
![Questionnaire filled out](/public/images/user-preferences2.PNG)
3. Make sure that the switch *Save Preferences* to the right of the *Show Me Plants* button is switched on.
4. Click **Show Me Plants**.
5. Your answers for *plant rooms*, *sunlight*, *watering frequency*, *pets* and *allergies* will be updated.
![Current user preferences](/public/images/user-preferences3.PNG)

#### Updating Account Password

1. Click on **[your name](https://greenthumb-therapy.herokuapp.com/user)** in the menu to go to your User page.
2. Go to section to update your password.
3. Type in your *current password* and the *new password* you want to use.
![Filled out update user password area](/public/images/user-password1.PNG)
4. If you typed in your *current password* incorrectly you will get an error message.
5. Once the password is successfully updated, you will get the message *Successfully updated password!*.

### Finding Plants

The two ways a user can find a plant is through answering our [Plant Matcher Questionnaire](https://greenthumb-therapy.herokuapp.com/questionnaire) or through the [Plant Search](https://greenthumb-therapy.herokuapp.com/search).

#### Answering the Questionnaire

1. Go to the **[Plant Matcher Questionnaire](https://greenthumb-therapy.herokuapp.com/questionnaire)**.
2. Fill out the questionnaire.
![Questionnaire filled out](/public/images/user-preferences2.PNG)
3. Click **Show Me Plants**.
4. You will be shown Plant Cards that you may then choose to favorite or ban.
![Plant Card results](/public/images/find-questionnaire1.PNG)

#### Utilizing the Plant Search

1. Go to the **[Plant Search](https://greenthumb-therapy.herokuapp.com/search)**.
2. Fill out the fields in the search area.
![Search filled out](/public/images/find-search1.PNG)
3. Click **Show Me Plants**.
4. You will be shown Plant Cards that you may then choose to favorite or ban.
![Plant Card results](/public/images/find-search2.PNG)

### Managing Plants

Once the Questionnaire or Search returns some plants, the user can choose to either favorite a plant or ban a plant.

![Plant Cards](/public/images/plant1.PNG)

#### Favoriting Plants

1. To save a plant from the Plant Results, click on the green save button with the **floppy disk** symbol.
2. The plant will then be saved to your favorite list if you are logged in.
3. To unfavorite a plant, click on the red remove button with the **trash can** symbol.
4. The plant will be removed from your favorite list if you are logged in.

#### Banning Plants

1. To ban a plant from the Plant Results, click on the orange ban button with the **do not disturb** symbol.
2. The plant will then be saved to your ban list if you are logged in.
3. To unban a plant, click on the blue unban button with the **checkmark** symbol.
4. The plant will be removed from your ban list if you are logged in.

### Other Plant Card Functions

- **Wikipedia** (W icon) link - allows the user to check out more information about the plant on Wikipedia.
- **Google Shopping** (shopping card icon) link - *only appears on plants with common names* and will look on Google Shopping for any results. We cannot guarantee that it will return the result(s) you are looking for.

## willCode4Ca$h Team

- **Systems Architect**: [Rebecca Hom](https://github.com/homr0)
- **Component Horticulturist**: [Nolen Diggs](https://github.com/DiggsNG)
- **Design Landscaper**: [Daniel Jacquez](https://github.com/jacquezdaniel)
- **Trefle Hunter**: [Rhea Quiambao](https://github.com/delquiam)
- **Backend Engineer**: [Meenal Subramanian](https://github.com/meenalal)
