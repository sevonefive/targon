import React from 'react';
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faUsers, faListOl, faCalendar, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { SeasonDropdown } from './TopNavbar';
import { fetchData } from '../actions/fetchData';


library.add(faHome, faUser, faUsers, faListOl, faCalendar, faQuestionCircle);

const MobileSidebar = ({ changeSeason, seasons, season, setNavMenuDisplayed }) => (
  <div>
    <div className="mobile-sidebar__unfocus" onClick={() => (setNavMenuDisplayed(false))}/>
    <div className='mobile-sidebar'>
      <MobileSidebarButtons changeSeason={changeSeason} seasons={seasons} season={season} setNavMenuDisplayed={setNavMenuDisplayed}/>
    </div>
  </div>
);

const MobileSidebarButtons = ({ changeSeason, seasons, season, setNavMenuDisplayed }) => (
  <div className="mobile-sidebar-button__container">
    
    <NavLink 
      className="mobile-sidebar__button" 
      to="/" 
      activeClassName="is-active" 
      exact={true}
      onClick={() => setNavMenuDisplayed(false)}
    >
      <FontAwesomeIcon icon="home" />
      <p>Home</p>
    </NavLink>

    <NavLink 
      className="mobile-sidebar__button" 
      to="/players/" 
      activeClassName="is-active"
      onClick={() => setNavMenuDisplayed(false)}
    >
      <FontAwesomeIcon icon="user" />
      <p>Players</p>
    </NavLink>

    <NavLink 
      className="mobile-sidebar__button" 
      to="/teams/" 
      activeClassName="is-active" 
      exact={true}
      onClick={() => setNavMenuDisplayed(false)}
    >
      <FontAwesomeIcon icon="users" />
      <p>Teams</p>
    </NavLink>

    <NavLink 
      className="mobile-sidebar__button" 
      to="/leaderboards/" 
      activeClassName="is-active"
      onClick={() => setNavMenuDisplayed(false)}
    >
      <FontAwesomeIcon icon="list-ol" />
      <p>Leaderboards</p>
    </NavLink>

    <SeasonDropdown changeSeason={changeSeason} seasons={seasons} season={season} setNavMenuDisplayed={setNavMenuDisplayed} mobile />

    {/* <NavLink 
      className="mobile-sidebar__button" 
      to="/schedule/" 
      activeClassName="is-active" 
      exact={true}
      onClick={() => setNavMenuDisplayed(false)}
    >
      <FontAwesomeIcon icon="calendar" />
      <p>Schedule</p>
    </NavLink> */}

    {/* <NavLink 
      className="mobile-sidebar__button" 
      to="/about/" 
      activeClassName="is-active" 
      exact={true}
      onClick={() => setNavMenuDisplayed(false)}
    >
      <FontAwesomeIcon icon="question-circle" />
      <p>About</p>
    </NavLink> */}
  </div>
)

const mapDispatchToProps = (dispatch) => {
  return {
    changeSeason: (value) => dispatch(fetchData(value))
  }
}

const mapStateToProps = (state) => {
  return {
    seasons: state.seasons,
    season: state.season,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MobileSidebar);