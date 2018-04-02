import React, { Component } from 'react';
import PaginatedFetch from './PaginatedFetch';
import ScrollableTable from './ScrollableTable';
import './App.css';

const styles = {
  base: {
    fontFamily: 'sans-serif',
    textAlign: 'center'
  },
  results: {
    border: '1px solid black',
    padding: '1rem',
    margin: '1.5rem',
    overflowWrap: 'break'
  }
};

class App extends Component {
  render() {
    return (
      <div style={styles.base}>
        <PaginatedFetch
          axiosConfig={{ params: { page: 1 } }}
          source="https://reqres.in/api/users"
          page={1}
          render={({ data, res, err, isFetching, loadMore, makeRequest, page }) => {
            console.log(data);
            return (
              <div>
                <h2>Push the button to load more data</h2>
                <button onClick={loadMore}>Load next page</button>
                <div>
                  Current page: {page}
                  <br />
                  <ScrollableTable
                    hasNextPage
                    isNextPageLoading={isFetching}
                    list={data}
                    loadNextPage={loadMore}
                  />
                </div>
              </div>
            );
          }}
        />
      </div>
    );
  }
}

export default App;
