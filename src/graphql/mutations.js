/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createMenteeProfile = /* GraphQL */ `
  mutation CreateMenteeProfile(
    $input: CreateMenteeProfileInput!
    $condition: ModelMenteeProfileConditionInput
  ) {
    createMenteeProfile(input: $input, condition: $condition) {
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
export const updateMenteeProfile = /* GraphQL */ `
  mutation UpdateMenteeProfile(
    $input: UpdateMenteeProfileInput!
    $condition: ModelMenteeProfileConditionInput
  ) {
    updateMenteeProfile(input: $input, condition: $condition) {
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
export const deleteMenteeProfile = /* GraphQL */ `
  mutation DeleteMenteeProfile(
    $input: DeleteMenteeProfileInput!
    $condition: ModelMenteeProfileConditionInput
  ) {
    deleteMenteeProfile(input: $input, condition: $condition) {
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
