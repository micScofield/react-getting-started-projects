import React, { useEffect, useState } from 'react';
import { response } from '../data/response';
import Button from './common/button/Button';

const SORT_ORDER = {
  RANK: 'rank',
  Name: 'name',
  Points: 'points',
  Age: 'age',
};
Object.freeze(SORT_ORDER);

const SORT_FUNCTIONS = {
  RANK: (a, b) => a.rank - b.rank,
  NAME: (a, b) => (a.name > b.name ? 1 : -1),
  POINTS: (a, b) => b.points - a.points,
  AGE: (a, b) => a.age - b.age,
};
Object.freeze(SORT_FUNCTIONS);

function LeaderBoard(props) {
  const { history } = props;
  const [list, setList] = useState([]);

  useEffect(() => {
    const sortOrderFromUrl = history.location.search.split('=')[1];

    console.log('Use effect invoked. Current sort order: ', sortOrderFromUrl);

    const list = response.list;
    setList(list);

    if (sortOrderFromUrl) {
      sort(list, SORT_FUNCTIONS[sortOrderFromUrl.toUpperCase()]);
    }

    return () => {
      console.log('Use effect return invoked');
    };
  }, []);

  function sort(data, sortFunction) {
    const sortedData = [...data].sort(sortFunction);
    setList(sortedData);
  }

  function buttonContainerHandler(e) {
    if (e.target.tagName !== 'BUTTON') {
      if (e.target.tagName !== 'SPAN') {
        console.log('Not a valid selection, returning from button handler...');
        return;
      }
    }

    let targetButton = e.target.getAttribute('data-id');
    if (!targetButton)
      targetButton = e.target.parentElement.getAttribute('data-id');

    if (!targetButton) return;

    switch (targetButton) {
      case SORT_ORDER.RANK: {
        sort(list, SORT_FUNCTIONS.RANK);
        break;
      }
      case SORT_ORDER.Name: {
        sort(list, SORT_FUNCTIONS.NAME);
        break;
      }
      case SORT_ORDER.Points: {
        sort(list, SORT_FUNCTIONS.POINTS);
        break;
      }
      case SORT_ORDER.Age: {
        sort(list, SORT_FUNCTIONS.AGE);
        break;
      }
      default:
        break;
    }
  }

  return (
    <div className='text-center mt-50'>
      <div>
        <div onClick={(e) => buttonContainerHandler(e)}>
          <Button
            text='Rank'
            dataTestId='route-rank'
            dataId='rank'
            onClick={() => {
              history.push('?sort=rank');
            }}
          />
          <Button
            text='Name'
            dataTestId='route-name'
            dataId='name'
            onClick={() => {
              history.push('?sort=name');
            }}
          />
          <Button
            text='Points'
            dataTestId='route-points'
            dataId='points'
            onClick={() => {
              history.push('?sort=points');
            }}
          />
          <Button
            text='Age'
            dataTestId='route-age'
            dataId='age'
            onClick={() => {
              history.push('?sort=age');
            }}
          />
        </div>
      </div>
      <div className='card mx-auto pb-20 mb-30' style={{ width: '50%' }}>
        <table className='mt-50' data-testid='app-table'>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th className='numeric'>Points</th>
              <th className='numeric'>Age</th>
            </tr>
          </thead>
          <tbody data-testid='app-tbody'>
            {list &&
              list.length !== 0 &&
              list.map(({ rank, name, points, age }, index) => {
                return (
                  <tr key={rank}>
                    <td data-testid={`rank-${index}`}>{rank}</td>
                    <td data-testid={`name-${index}`}>{name}</td>
                    <td data-testid={`points-${index}`} className='numeric'>
                      {points}
                    </td>
                    <td data-testid={`age-${index}`} className='numeric'>
                      {age}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LeaderBoard;
