import React from 'react';
import moment from 'moment';
import numeral from 'numeral';

const PlayerMatchHistory = ({ player }) => {
  return ( 
    <div>
      { player.matches.map((match, index) =>  { 
        let champion = '';
          if(match.champion == 'LeBlanc')
            champion = 'Leblanc';
          else if(match.champion == "Kai'Sa")
            champion = 'Kaisa';
          else
            champion = match.champion[0] + match.champion.replace(/[^A-Za-z0-9]/g, '').slice(1);
        return (
          <div className={ match.game != 1 ? 'player-match-history' : 'player-match-history player-match-history--week-1' } key={index}>
            <div className='player-match-history__column-1'>
              <div className='player-match-history__date-time-container'>
                <p className='player-match-history__date'>{ moment(match.date).format('ddd, MM/DD/YY') }</p>
                <p className='player-match-history__time'>{numeral(match.gamelength * 100).format('0:00')}</p>
              </div>
              <img className='player-match-history__champion-img' src={`http://ddragon.leagueoflegends.com/cdn/9.7.1/img/champion/${champion}.png`} />
                { match.result == 1 ? 
                  <div className='player-match-history__result-container player-match-history__result--victory'>
                    <p className='player-match-history__result'>Victory</p> 
                  </div>
                  : 
                  <div className='player-match-history__result-container player-match-history__result--loss'>
                    <p className='player-match-history__result'>Defeat</p> 
                  </div>
                } 
            </div>


            <div className='player-match-history__column-2'>
              <div className='player-match-history__kda'>
                <p className='player-match-history__kills'>{ numeral(match.k).format('00') }</p> /
                <p className='player-match-history__deaths'>{ numeral(match.d).format('00') }</p> /
                <p className='player-match-history__assists'>{ numeral(match.a).format('00') }</p>
              </div>
              <div className='player-match-history__details'>
                <p>CS: {match.minionkills}</p>
                <p>CSPM: {match.cspm.toFixed(2)}</p>
                <p>DPM: {match.dmgtochampsperminute.toFixed(2)}</p>
              </div>
              <div className='player-match-history__details'>
                <p>GPM: {match.earnedgpm.toFixed(2)}</p>
                <p>DPM: {match.dmgtochampsperminute.toFixed(2)}</p>
                <p>GD10: {match.gdat10.toFixed(2)}</p>
              </div>
              <div className='player-match-history__details'>
                <p>Wards: {match.wards}</p>
                <p>WPM: {match.wpm.toFixed(3)}</p>
                <p>Visions: {match.visionwards}</p>
              </div>
            </div>
            
            <div className='player-match-history__column-3'>
              <p className='player-match-history__opponent'>
                vs {match.opponentTeam}
                <span style={{backgroundImage: `url(/assets/teams/icons/${match.opponentTeam.replace(/ /g,"_")}.png)`}} onError={(e)=>{e.target.onerror = null; e.target.src="/assets/players/avi/default.jpg"}} className="match-history__team-icon"></span>
              </p>
              <p className='player-match-history__week'>Game { match.game } Week { match.week }</p>
              
            </div>
          </div>
        );
        })
      }
    </div>
  );
};

export default PlayerMatchHistory;