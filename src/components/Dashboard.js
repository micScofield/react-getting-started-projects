import React from 'react';
import Button from './common/button/Button';

function Dashboard({ history }) {
  return (
    <>
      <Button text='Leaderboard' onClick={() => history.push('/leaderboard')} />
      <Button text='Timer' onClick={() => history.push('/timer')} />
    </>
  );
}

export default Dashboard;
