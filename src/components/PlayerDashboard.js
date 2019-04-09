import React from "react";
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom';
import PlayerStatsTable from './PlayerStatsTable';
import PlayerMatchHistory from './PlayerMatchHistory';
import { ChampionsPlayedPieChart, PlayerStatsAreaChart, WinratePieChart} from './PlayerProfileCharts';
import Loading from "./Loading";

export const statToPretty =  {
  totalKills: 'Kills',
  totalDeaths: 'Deaths',
  totalAssists: 'Assists',
  kda: 'KDA',
  kp: 'KP',
  dthPercentage: 'DTH%',
  fbPercentage: 'FB%',
  gd10: 'GD10',
  xpd10: 'XPD10',
  csd10: 'CSD10',
  cspm: 'CSPM',
  csPercent15: 'CS%P15',
  dpm: 'DPM',
  dmgPercentage: 'DMG%',
  earnedGoldPerMinute: 'EGPM',
  goldPercentage: 'GOLD%',
  wpm: 'WPM',
  wcpm: 'WCPM'
};

const PlayerDashboard = ({ players, location }) => {
  return (
    <div className="player-dashboard">
      <Loading component={
        <PlayerProfile players={players} location={location} />
      } quickLoad={true}/>
    </div>
  );
};

const PlayerProfile = ({ players, location }) => {
  const playerName = location.pathname.slice(8);

  return (
    <div>
      <div className="team-banner">
        <div className="team-banner__content" style={{backgroundImage: `url('/assets/teams/logos/${players[playerName].team.replace(/ /g,"_")}.png')`}}>
          <img src={`/assets/players/avi/${playerName}.png`} onError={(e)=>{e.target.onerror = null; e.target.src="/assets/players/avi/default.jpg"}} className="team-banner__profile-picture" />
          <div className="team-banner__player-info">
            <h1>{playerName}</h1>
            <h2>TYLER STEINKAMP</h2>
            <NavLink to={"/team/" + players[playerName].team}>{players[playerName].position} - {players[playerName].team}</NavLink>
          </div>
        </div>
      </div>
      <PlayerStats player={players[playerName]} />
    </div>
  );
};

const COLORS = ['#4C61EE', '#8C43F7', '#4F3AD6', '#3A78D6', '#43BAF7'];

const PlayerStats = ({ player }) => (
  <div>
    <div className="player-dashboard__player-stats">
      <PlayerStatsTable { ...player } />
      <div className="player-stats__charts">
        <hr className="hr-vert" />
        <WinratePieChart />
        <hr className="hr-vert" />
        <ChampionsPlayedPieChart />
        <hr className="hr-vert" />
        <PlayerStatsAreaChart title="Kills Per Match" color={COLORS[0]} />
        <hr className="hr-vert" />
        <PlayerStatsAreaChart title="KDA Per Match" color={COLORS[0]} />
        <hr className="hr-vert"/>
        <PlayerStatsAreaChart title="KP Per Match" color={COLORS[3]} />
        <hr className="hr-vert"/>
        <PlayerStatsAreaChart title="DMG% Per Match" color={COLORS[3]} />
        <hr className="hr-vert"/>
      </div>
    </div>
    <h1 className="player-dashboard__match-history-title">Match History</h1>
    <PlayerMatchHistory />
  </div>
);

const mapStateToProps = (state) => {
  return {
    isFetching: state.players.isFetching,
    players: state.players.data
  };
};

export default connect(mapStateToProps)(PlayerDashboard);