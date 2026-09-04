import apiClient from './apiClient';

export const getLeagueEvents = ({ game }) =>
  apiClient.get(`/events/leagues/${encodeURIComponent(game)}`).then(res => res.data);

export const getLanEvents = ({ game }) =>
    apiClient.get(`/events/lans/${encodeURIComponent(game)}`).then(res => res.data);

export const getWagerEvents = ({ game }) =>
    apiClient.get(`/events/wagers/${encodeURIComponent(game)}`).then(res => res.data);

export const getXpEvents = ({ game }) =>
    apiClient.get(`/events/head-to-head/${encodeURIComponent(game)}`).then(res => res.data);

export const getEvent = ({ event_type, game, event_name }) => 
    apiClient.get(`/events/${encodeURIComponent(event_type)}/${encodeURIComponent(game)}/${encodeURIComponent(event_name)}`).then(res => res.data);

export const getLeagueChildren = ({ game, parent }) =>
    apiClient.get(`/events/leagues/${encodeURIComponent(game)}/${encodeURIComponent(parent)}/children`).then(res => res.data);