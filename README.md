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

#### Registering an Account

#### Logging In

#### Setting Preferences

#### Updating Account Password

### Finding Plants

The two ways a user can find a plant is through answering our [Plant Matcher Questionnaire](https://greenthumb-therapy.herokuapp.com/questionnaire) or through the [Plant Search](https://greenthumb-therapy.herokuapp.com/search).

#### Answering the Questionnaire

#### Utilizing the Plant Search

### Managing Plants

Once the Questionnaire or Search returns some plants, the user can choose to either favorite a plant or ban a plant.

#### Favoriting Plants

#### Banning Plants

## willCode4Ca$h Team

- [Rebecca Hom](https://github.com/homr0)
- [Nolen Diggs](https://github.com/DiggsNG)
- [Daniel Jacquez](https://github.com/jacquezdaniel)
- [Rhea Quiambao](https://github.com/delquiam)
- [Meenal Subramanian](https://github.com/meenalal)