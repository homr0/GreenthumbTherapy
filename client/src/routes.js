import Base from './components/Base.jsx';
import LoginPage from '../src/containers/LoginPage';
import SignUpPage from '../src/containers/SignUpPage.jsx';


const routes = {
  // base component (wrapper for the whole application).
  component: Base,
  childRoutes: [

    {
      path: '/',
      component: User
    },

    {
      path: '/login',
      component: LoginPage
    },

    {
      path: '/signup',
      component: SignUpPage
    }

  ]
};

export default routes;