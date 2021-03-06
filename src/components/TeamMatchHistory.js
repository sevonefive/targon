import React from 'react';
import moment from 'moment';
import numeral from 'numeral';

const TeamMatchHistory = ({ team }) => {

  return ( 
    <div>
      { team.matches.map((match, index) =>  { 
        return (
          <div className={ match.game != 1 ? 'team-match-history' : 'team-match-history team-match-history--week-1' } key={index}>
            <div className='team-match-history__column-1'>
              <div className='team-match-history__date-time-container'>
                <p className='player-match-history__date'>{ moment(match.date).format('ddd, MM/DD/YY') }</p>
                <p className='player-match-history__time'>{ numeral(match.gamelength * 100).format('0:00') }</p>
              </div>
            </div>
            <div className='team-match-history__column-2'>
              <div className='team-match-history__team-container'>
                <p>{match.team}</p>
                <span style={{backgroundImage: `url(/assets/teams/icons/${match.team.replace(/ /g,"_")}.png)`}} onError={(e)=>{e.target.onerror = null; e.target.src="/assets/players/avi/default.jpg"}} className="match-history__team-icon"></span>
              </div>
              { match.result == 1 ? 
                <div className='player-match-history__result-container player-match-history__result-container--team player-match-history__result--victory'>
                  <p className='player-match-history__result'>Victory</p> 
                </div>
                : 
                <div className='player-match-history__result-container player-match-history__result-container--team player-match-history__result--loss'>
                  <p className='player-match-history__result'>Defeat</p> 
                </div>
              } 
              <div className='team-match-history__opponent-container'>
                <span style={{backgroundImage: `url(/assets/teams/icons/${match.opponentTeam.replace(/ /g,"_")}.png)`}} onError={(e)=>{e.target.onerror = null; e.target.src="/assets/players/avi/default.jpg"}} className="match-history__team-icon"></span>
                <p>{match.opponentTeam}</p>
              </div>
            </div>
            <div className='team-match-history__column-3'>
              <p className='team-match-history__week'>Game { match.game } Week { match.week }</p>
            </div>
          </div>
        );
        })
      }
    </div>
  );
};

export default TeamMatchHistory;