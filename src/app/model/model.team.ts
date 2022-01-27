import { gql } from 'graphql-tag';

export const value = {
  getTeams: gql`
    {
      getTeam {
        tea_id
        tea_name
        tea_country
        tea_fundation
      }
    }
  `,
  getTeam: gql`
    query getTeam($id: Int!) {
      getTeam(id: $id) {
        tea_id
        tea_name
        tea_country
        tea_fundation
        teams {
          tea_id
          tea_name
          tea_country
          tea_fundation
        }
      }
    }
  `,
  createTeam: gql`
    mutation createTeam($team: teamInput!) {
      setTeam(team: $team) {
        tea_id
        tea_name
        tea_country
        tea_fundation
      }
    }
  `,
  updateTeam: gql`
    mutation updateTeam($tea_id: Int!, $team: teamUpdate!) {
      updateTeam(tea_id: $tea_id, team: $team) {
        tea_id
        tea_name
        tea_country
        tea_fundation
      }
    }
  `,
  deleteTeam: gql`
    mutation deleteTeam($tea_id: Int!) {
      deleteTeam(tea_id: $tea_id) {
        tea_id
        tea_name
        tea_country
        tea_fundation
      }
    }
  `,
};
