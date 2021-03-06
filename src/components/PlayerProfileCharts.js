import React from "react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Label, BarChart, Legend, Bar
} from 'recharts';
import moment from 'moment';
import { statToPretty } from './PlayerProfile';
import numeral from 'numeral';

const COLORS = ['#4C61EE', '#8C43F7', '#FA95CA', '#43FAB6', '#3A78D6', '#43BAF7', '#FA52D5', '#FC7C62', '#4F3AD6', '#FAC552', '#D94862', '#8AFFFF'];

export const WinratePieChart = ({ winrate }) => {
  // const winrate = player.graphs.winRatePieChart.winRate;

  const data = [
    { name: "Win%", value: winrate},
    { name: "Lose%", value: 100 - winrate},
  ];

  return (
    <div>
      <h1>Winrate</h1>
      <ResponsiveContainer height="75%" isAnimationActive={false}>
        <PieChart width={600} height={500}>
          <Pie
            data={data}
            innerRadius={70}
            outerRadius={90}
            paddingAngle={5}
            dataKey="value"
            isAnimationActive={false}
          >

            // Win slice
            <Cell 
              key={`win-cell`} 
              fill={'#4c61ee'}
              strokeWidth={0} 
            />

            <Label className='winrate-pie-chart__label' value={`${data[0].value.toFixed(2)}%`} offset={0} position="center" />

            // Lose slice
            <Cell 
              key={`loss-cell`} 
              fill={'#4d5272'}
              strokeWidth={0} 
            />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export const ChampionsPlayedPieChart = ({ player }) => {
  const temp = {};
  player.graphs.championsPlayedPieChart.championsPlayed.forEach((champ) => {
    if(!temp.hasOwnProperty(champ)) {
      temp[champ] = 1;
    } else {
      temp[champ] = temp[champ] + 1;
    }
  });

  console.log('temp', temp);
  let data = [];
  for(let i in temp) {
    if(temp[i] != 0)
      data.push({ 'name': i, 'value': temp[i] });
  }

  return (
    <div>
      <h1>Champions Played</h1>
      <ResponsiveContainer height="75%" isAnimationActive={false}>
        <PieChart width={600} height={600}>
          <Pie
            data={data}
            labelLine={false}
            stroke={'#1c1e2e'}
            outerRadius={90}
            strokeWidth={0}
            dataKey='value'
            isAnimationActive={false}
          >
            {
              data.map((obj, index) => (
                <Cell 
                  key={`win-cell${index}`} 
                  fill={COLORS[index]}
                />
              ))
            } 
          </Pie>
          <Tooltip content={ChampionsPlayedTooltip} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

const ChampionsPlayedTooltip = ({ active, payload, label }) => { 
  if (active) {
    return (
      <div className="champions-played-chart__tooltip">
        <img 
          className='champions-played-chart__icon' 
          src={`http://ddragon.leagueoflegends.com/cdn/9.7.1/img/champion/${payload[0].name[0] + payload[0].name.replace(/[^A-Za-z0-9]/g, '').slice(1).toLowerCase()}.png`}
        >
        </img>
        <p>{payload[0].name}: {payload[0].value}</p>
      </div>);
  }
};

export const PlayerStatsAreaChart = ({ color, player, stat }) => {
  let data = [];

  let total = 0;
  player.graphs.statHistoryGraphs[stat].averages.forEach((obj) => {
    total += obj;
  });
  const avgValue = (total / player.graphs.statHistoryGraphs[stat].averages.length).toFixed(2);

  player.graphs.statHistoryGraphs[stat].date.forEach((obj, index) => {
    data.unshift({ 
      name: moment(player.graphs.statHistoryGraphs[stat].date[index]).format('MM/DD'), 
      value: player.graphs.statHistoryGraphs[stat].stat[index].toFixed(2), 
      avgValue, 
    });
  });

  if(data.length < 3)
    return (
      <div>
        <h1>{statToPretty[stat]} Per Match</h1>
        <p className='player-profile__not-enough-data'>Not enough data :(</p>
      </div>
    );

  return (
    <div>
      <h1>{statToPretty[stat]} Per Match</h1>
      <ResponsiveContainer height="70%" className="player-profile__area-chart" >
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10, right: 60, left: 0, bottom: 0,
          }}
        >
          <XAxis axisLine={false} tickLine={false} dataKey="name" tick={<XAxisLabel />} />
          <YAxis axisLine={false} tickLine={false} padding={{ bottom: 0 }} tick={<YAxisLabel />} />

          <Tooltip content={CustomToolTip} stat={statToPretty[stat]}/>
          <Area isAnimationActive={false} type="monotone" dataKey="value" strokeWidth={0} fill={color} />
          <Area isAnimationActive={false} type="monotone" dataKey="avgValue" strokeWidth={0} fill="rgba(255, 255, 255, .1)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

const XAxisLabel = ({x, y, stroke, payload}) => {
  return(
    <g transform={`translate(${x},${y})`}>
      <text x={15} y={0} dy={12} textAnchor="end" className='pie-chart-yaxis__label'>
        {payload.value}
      </text>
    </g>
  );
};

const YAxisLabel = ({x, y, stroke, payload}) => {
  return(
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={-15} dy={15} textAnchor="end" className='pie-chart-yaxis__label'>
        {payload.value}
      </text>
    </g>
  );
};

const CustomToolTip = ({ active, payload, label, stat }) => {
  if (active) {
    return (
      <div className="player-profile__tooltip">
        <p className='player-profile__tooltip-title'>{label}</p>
        <p>{stat}: {payload[0].value}</p>
        <p>Average for Role: {payload[1].value}</p>
      </div>);
  }
};

export const MonsterTimeBarChart = ({ firstBaronTime, firstDragonTime, firstTowerTime }) => {
  const data = [
    {
      "name": "Dragon",
      "time": firstDragonTime,
      'fill': COLORS[2],
    },
    {
      "name": "Tower",
      "time": firstTowerTime,
      'fill': COLORS[1],
    },
    {
      "name": "Baron",
      "time": firstBaronTime,
      'fill': COLORS[3],
    },
  ];

  return(
    <div>
      <h1>Average First Objective Times</h1>
      <ResponsiveContainer height="80%" width='85%' className="player-profile__area-chart" >
        <BarChart width={500} height={400} data={data}>
          <XAxis axisLine={true} tickLine={false} dataKey="name" tick={<MonsterTimeXAxisLabel />} />
          <YAxis axisLine={true} tickLine={true} tick={<MonsterTimeYAxisLabel />} />
          <Tooltip content={MonsterTimeToolTip} stat={'test'} />
          <Bar dataKey="time" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const MonsterTimeToolTip = ({ active, payload, label, stat }) => {
  if (active) {
    return (
      <div className="player-profile__tooltip">
        <p className='player-profile__tooltip-title'>{label}</p>
        <p>Average: {numeral(payload[0].value * 100).format('0:0').slice(2)}</p>
      </div>);
  }
};

const MonsterTimeYAxisLabel = ({x, y, stroke, payload}) => {
  return(
    <g transform={`translate(${x},${y})`}>
      <text x={-3} y={-12} dy={15} textAnchor="end" className='pie-chart-yaxis__label'>
        {numeral(payload.value * 100).format('0:0').slice(2)}
      </text>
    </g>
  );
};

const MonsterTimeXAxisLabel = ({x, y, stroke, payload}) => {
  return(
    <g transform={`translate(${x},${y})`}>
      <text x={20} y={0} dy={12} textAnchor="end" className='pie-chart-yaxis__label'>
        {payload.value}
      </text>
    </g>
  );
};