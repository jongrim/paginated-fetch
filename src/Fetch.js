import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class Fetch extends React.PureComponent {
  static propTypes = {
    axiosConfig: PropTypes.object,
    source: PropTypes.string.isRequired
  };

  static defaultProps = {
    axiosConfig: {}
  };

  state = {
    err: {},
    isFetching: true,
    res: {}
  };

  componentDidMount() {
    const { axiosConfig, source } = this.props;
    axios
      .get(source, axiosConfig)
      .then(res => this.setState({ res, isFetching: false }))
      .catch(err => this.setState({ err, isFetching: false }));
  }

  makeRequest = (endpoint, method = 'get', config = {}) => {
    this.setIsFetching(true);
    return axios[method](endpoint, config)
      .then(res => {
        this.setState(prevState => ({
          res,
          isFetching: false
        }));
        return res;
      })
      .catch(err => this.setState({ err, isFetching: false }));
  };

  setIsFetching(isFetching) {
    this.setState({ isFetching });
  }

  render() {
    return this.props.render({
      ...this.state,
      makeRequest: this.makeRequest
    });
  }
}

export default Fetch;
