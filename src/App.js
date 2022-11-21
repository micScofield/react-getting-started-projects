import React from 'react';
import 'h8k-components';
import { Route, Switch, useHistory } from 'react-router-dom';
import Timer from './components/Timer/Timer';
import Dashboard from './components/Dashboard';
import LeaderBoard from './components/LeaderBoard/LeaderBoard';
import NavigationBar from './components/common/navigation-bar/NavigationBar';
import { ReactComponent as Logo } from './assets/crown.svg';
import Wordle from './components/Wordle/Wordle';
import ThreeLetterWordle from './components/Wordle/3LetterWordle';

// CSS for search bar app
import SearchBarDashboard from './components/SearchBar/Dashboard';

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
        <Route path='/wordle' component={Wordle} />
        <Route path='/3-letter-wordle' component={ThreeLetterWordle} />
        <Route path='/searchbar' component={SearchBarDashboard} />
        <Route path='/' component={Dashboard} />
      </Switch>
    </div>
  );
}

export default App;
