import { gql } from 'graphql-tag';

export const value = {
  getLeagues: gql`
    {
      getLeague {
        lea_id
        lea_name
        lea_country
        lea_creation
      }
    }
  `,
  getLeague: gql`
    query getLeague($id: Int!) {
      getLeague(id: $id) {
        lea_id
        lea_name
        lea_country
        lea_creaion
        teams {
          tea_id
          tea_name
          tea_country
          tea_fundation
        }
      }
    }
  `,
  createLeague: gql`
    mutation createLeague($league: leagueInput!) {
      setLeague(league: $league) {
        lea_id
        lea_name
        lea_country
        lea_creation
      }
    }
  `,
  updateLeague: gql`
    mutation updateLeague($lea_id: Int!, $league: leagueUpdate!) {
      updateLeague(lea_id: $lea_id, league: $league) {
        lea_id
        lea_name
        lea_country
        lea_creation
      }
    }
  `,
  deleteLeague: gql`
    mutation deleteLeague($lea_id: Int!) {
      deleteLeague(lea_id: $lea_id) {
        lea_id
        lea_name
        lea_country
        lea_creation
      }
    }
  `,
};
