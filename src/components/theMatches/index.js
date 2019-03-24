import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import { firebaseMatches } from '../../firebase';
import { firebaseLooper } from '../ui/misc';

import LeagueTable from './table';
import MatchList from './matchesList';

class TheMatches extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      matches: [],
      filterMatches: [],
      playerFilter: 'All',
      resultFilter: 'All'
    };
  }

  componentDidMount() {
    firebaseMatches
      .once('value')
      .then(snapshot => {
        const matches = firebaseLooper(snapshot);
        this.setState({
          loading: false,
          matches: matches.reverse(),
          filterMatches: matches.reverse()
        });
      })
      .catch(err => console.log(err));
  }

  showPlayed(played) {
    const list = this.state.matches.filter(match => match.final === played);
    this.setState({
      filterMatches: played === 'All' ? this.state.matches : list,
      playerFilter: played,
      result: 'All'
    });
  }

  render() {
    const state = this.state;
    return (
      <div className="the_matches_container">
        <div className="the_matches_wrapper">
          <div className="left">
            <div className="match_filters">
              <div className="match_filters_box">
                <div className="tag">Show Match</div>
                <div className="cont">
                  <div
                    className={`option`}
                    onClick={() => this.showPlayed('All')}
                  >
                    All
                  </div>
                  <div
                    className={`option`}
                    onClick={() => this.showPlayed('Yes')}
                  >
                    Played
                  </div>
                  <div
                    className={`option`}
                    onClick={() => this.showPlayed('No')}
                  >
                    Not played
                  </div>
                </div>
              </div>
            </div>
            <MatchList matches={state.filterMatches} />
          </div>
          <div className="right">
            <LeagueTable />
          </div>
        </div>
      </div>
    );
  }
}

export default TheMatches;
