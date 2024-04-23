/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMenteeProfile = /* GraphQL */ `
  query GetMenteeProfile($id: ID!) {
    getMenteeProfile(id: $id) {
      id
      firstName
      lastName
      gender
      age
      ethnicity
      languages
      location
      values
      personalityType
      instagram
      facebook
      linkedin
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const listMenteeProfiles = /* GraphQL */ `
  query ListMenteeProfiles(
    $filter: ModelMenteeProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMenteeProfiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstName
        lastName
        gender
        age
        ethnicity
        languages
        location
        values
        personalityType
        instagram
        facebook
        linkedin
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
