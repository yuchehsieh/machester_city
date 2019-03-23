import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';

import PlayerCard from '../ui/playerCard';
import Stripes from '../../../src/Resources/images/stripes.png';
import { firebasePlayers, firebase } from '../../firebase';
import { firebaseLooper } from '../ui/misc';
import { Promise } from 'core-js';

class TheTeam extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      players: []
    };
  }

  componentDidMount() {
    firebasePlayers
      .once('value')
      .then(snapshot => {
        const players = firebaseLooper(snapshot);

        let promises = [];

        for (let key in players) {
          promises.push(
            new Promise((resolve, reject) => {
              firebase
                .storage()
                .ref(`players/${players[key].image}`)
                .getDownloadURL()
                .then(url => {
                  players[key].url = url;
                  resolve();
                })
                .catch();
            })
          );
        }

        Promise.all(promises)
          .then(() => {
            console.log(players);
            this.setState({
              loading: false,
              players
            });
          })
          .catch(e => {});
      })
      .catch(e => {
        console.log(e);
      });
  }

  showPlayersByCategoty = category =>
    this.state.players
      ? this.state.players.map((player, i) => {
          return player.position === category ? (
            <Fade left delay={i * 20} key={i}>
              <div className="item">
                <PlayerCard
                  number={player.number}
                  name={player.name}
                  lastname={player.lastname}
                  bck={player.url}
                />
              </div>
            </Fade>
          ) : null;
        })
      : null;

  render() {
    return (
      <div
        className="the_team_container"
        style={{ background: `url(${Stripes}) repeat` }}
      >
        {!this.state.loading && (
          <div>
            <div className="team_category_wrapper">
              <div className="title">Keepers</div>
              <div className="team_cards">
                {this.showPlayersByCategoty('Keeper')}
              </div>
            </div>

            <div className="team_category_wrapper">
              <div className="title">Defence</div>
              <div className="team_cards">
                {this.showPlayersByCategoty('Defence')}
              </div>
            </div>

            <div className="team_category_wrapper">
              <div className="title">Midfield</div>
              <div className="team_cards">
                {this.showPlayersByCategoty('Midfield')}
              </div>
            </div>

            <div className="team_category_wrapper">
              <div className="title">Striker</div>
              <div className="team_cards">
                {this.showPlayersByCategoty('Striker')}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default TheTeam;
