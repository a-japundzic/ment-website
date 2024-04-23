/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMenteeProfile = /* GraphQL */ `
  subscription OnCreateMenteeProfile(
    $filter: ModelSubscriptionMenteeProfileFilterInput
    $owner: String
  ) {
    onCreateMenteeProfile(filter: $filter, owner: $owner) {
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
export const onUpdateMenteeProfile = /* GraphQL */ `
  subscription OnUpdateMenteeProfile(
    $filter: ModelSubscriptionMenteeProfileFilterInput
    $owner: String
  ) {
    onUpdateMenteeProfile(filter: $filter, owner: $owner) {
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
export const onDeleteMenteeProfile = /* GraphQL */ `
  subscription OnDeleteMenteeProfile(
    $filter: ModelSubscriptionMenteeProfileFilterInput
    $owner: String
  ) {
    onDeleteMenteeProfile(filter: $filter, owner: $owner) {
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
