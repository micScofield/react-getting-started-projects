import React, { Fragment, useState, useCallback } from 'react';
import Button from '../common/button/Button';

import { debounce } from '../common/utils/debounce';
import { throttle, badThrottle } from '../common/utils/throttle';
import MatchResults from './MatchResults';

const API_URL = 'https://jsonplaceholder.typicode.com/comments';
/*
[{
    "postId": 1,
    "id": 1,
    "name": "id labore ex et quam laborum",
    "email": "Eliseo@gardner.biz",
    "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
  }]
*/

const SearchBarDashboard = () => {
  const [matches, setMatches] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showMatches, setShowMatches] = useState(false);

  const [useThrottling, setUseThrottling] = useState(false);

  async function fetchResults(queryParams) {
    /**
     * @param queryParam {object}
     * {
     *  param1: searchTerm,
     *  param2: searchTerm2,
     * }
     */

    const query = createSearchQuery(queryParams);

    const URL = `${API_URL}${query}`;
    console.log('Calling', URL);

    const resp = await fetch(URL);
    const data = await resp.json();
    console.log(data);
    if (data) {
      setMatches(data);
      setShowMatches(true);
    }
  }

  function createSearchQuery(obj) {
    const entries = Object.entries(obj);
    if (entries.length === 0) return '';

    let str = '?';
    for (let [key, value] of entries) {
      str += `${key}=${value}`;
    }
    return str;
  }

  // Wrap inside a useCallback so that we don't always get a new copy of the debounced function which will nullify the functionality essentially.
  let debouncedFetchResults = useCallback(debounce(fetchResults, 500), []);
  let throttledFetchResults = useCallback(throttle(fetchResults, 500), []);

  let optimisedFetchResults = debouncedFetchResults;
  if (useThrottling) {
    optimisedFetchResults = throttledFetchResults;
  }

  const searchBoxChangeHandler = async (e, id) => {
    setSearchTerm(e.target.value);

    let queryParams = {};
    queryParams[id] = e.target.value;

    optimisedFetchResults(queryParams);
  };

  return (
    <Fragment>
      <div className='text-center mt-50'>
        <Button text='Debouncing' onClick={() => setUseThrottling(false)} />
        <Button text='Throttling' onClick={() => setUseThrottling(true)} />

        <h2 style={{ color: 'black' }}>
          {useThrottling ? 'Throttling' : 'Debouncing'} with React
        </h2>

        <div>
          <input
            type='text'
            id='search'
            value={searchTerm}
            style={{
              border: '2px solid rgba(27, 169, 76, 0.5)',
              width: '70%',
              padding: '0.25rem',
            }}
            placeholder='Search for posts with ID (1 to 100)'
            data-id='postId'
            onChange={(e) => searchBoxChangeHandler(e, 'postId')}
          />
        </div>

        {showMatches && matches && matches.length !== 0 && (
          <MatchResults matches={matches} clickHandler={() => {}} />
        )}
      </div>
    </Fragment>
  );
};

export default SearchBarDashboard;
