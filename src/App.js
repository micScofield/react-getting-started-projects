import React from 'react';
import 'h8k-components';
import { Route, Switch, useHistory } from 'react-router-dom';
import Timer from './components/Timer';
import Dashboard from './components/Dashboard';
import LeaderBoard from './components/LeaderBoard';
import NavigationBar from './components/common/navigation-bar/NavigationBar';
import { ReactComponent as Logo } from './assets/crown.svg';

// box shadow - 0 4px 12px rgba(27, 169, 76, 0.5);

function App() {
  const history = useHistory();
  return (
    <div className='App'>
      <div onClick={() => history.push('/')} style={{ cursor: 'pointer' }}>
        <NavigationBar
          Logo={Logo}
          title='React - Getting Started'
          background='black'
          flexPosition='center'
          textColor='#1ba94c'
        />
      </div>
      <div style={{ marginBottom: '2rem' }}></div>
      <Switch>
        <Route path='/leaderboard' component={LeaderBoard} />
        <Route path='/timer' component={Timer} />
        <Route path='/' component={Dashboard} />
      </Switch>
    </div>
  );
}

export default App;
