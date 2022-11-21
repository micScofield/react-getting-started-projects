import React from 'react';

const MatchResults = ({ matches, clickHandler }) => {
  return (
    // <div id='match-list' onClick={(e) => clickHandler(e)}>
    //   {matches.map((match) => {
    //     const { id, name, email, body } = match;
    //     return (
    //       <div key={id} className='card card-body mb-1' data-name={name}>
    //         <h5>{name}</h5>
    //         <span className='text-primary'>{body}</span>

    //         <small>Email: {email}</small>
    //       </div>
    //     );
    //   })}
    // </div>
    <div
      id='match-list'
      onClick={(e) => clickHandler(e)}
      className='card mx-auto pb-20 mb-30'
      style={{ width: '70%' }}
    >
      {matches.map((match) => {
        const { id, name, body } = match;
        return (
          <div
            key={id}
            data-name={name}
            className='card card-body mb-1'
            style={{ backgroundColor: '#282828', textAlign: 'left' }}
          >
            <h4 style={{ color: 'white' }}>{name}</h4>
            <div style={{ color: '#2a9fd6' }}>{body}</div>
          </div>
        );
      })}
    </div>
  );
};

export default MatchResults;
