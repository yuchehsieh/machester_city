import React, { Component } from 'react';

class MatchesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      matcheslist: []
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return (prevState = {
      matcheslist: nextProps.matches
    });
  }

  render() {
    return <div>list</div>;
  }
}

export default MatchesList;
