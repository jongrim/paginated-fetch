import React from 'react';
import PropTypes from 'prop-types';

import Fetch from './Fetch';

class Paginator extends React.PureComponent {
  static propTypes = {
    makeRequest: PropTypes.func.isRequired,
    page: PropTypes.number,
    source: PropTypes.string.isRequired
  };

  static defaultProps = {
    page: 0
  };

  state = {
    data: [],
    page: this.props.page
  };

  componentWillReceiveProps(nextProps) {
    const old = this.props.res.data;
    const data = nextProps.res.data;
    if (old !== data) {
      this.setState(prevState => ({ data: [...prevState.data, data.data]}))
    }
  }

  loadMore = () => {
    this.props
      .makeRequest(this.props.source, 'get', {
        params: { page: this.state.page + 1 }
      })
      .then(res => {
        this.setState(prevState => ({ page: prevState.page + 1 }));
      });
  };

  render() {
    return this.props.render({ loadMore: this.loadMore, ...this.props, ...this.state });
  }
}

const PaginatedFetch = ({ axiosConfig, children, dataPath, page, source, render }) => (
  <Fetch
    axiosConfig={axiosConfig}
    source={source}
    render={({ ...props }) => (
      <Paginator axiosConfig={axiosConfig} page={page} render={render} source={source} {...props} />
    )}
  />
);

export default PaginatedFetch;
