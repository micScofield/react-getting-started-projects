import React from 'react';
import Button from './common/button/Button';

const dashboardStyles = () => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  flexWrap: 'wrap'
})

function Dashboard({ history }) {
  return (
    <div style={dashboardStyles()}>
      <Button text='Leaderboard' onClick={() => history.push('/leaderboard')} />
      <Button text='Timer' onClick={() => history.push('/timer')} />
      <Button text='5-Letter Wordle' onClick={() => history.push('/wordle')} />
      <Button text='3-Letter Wordle' onClick={() => history.push('/3-letter-wordle')} />
    </div>
  );
}

export default Dashboard;
