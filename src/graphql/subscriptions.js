/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMenteeProfile = /* GraphQL */ `
  subscription OnCreateMenteeProfile(
    $filter: ModelSubscriptionMenteeProfileFilterInput
    $owner: String
  ) {
    onCreateMenteeProfile(filter: $filter, owner: $owner) {
      id
      owner
      firstName
      lastName
      gender
      age
      ethnicity
      languages
      values
      instagram
      facebook
      linkedin
      profilePicKey
      schoolName
      programOfStudy
      educationLevel
      graduationYear
      createdAt
      updatedAt
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
      owner
      firstName
      lastName
      gender
      age
      ethnicity
      languages
      values
      instagram
      facebook
      linkedin
      profilePicKey
      schoolName
      programOfStudy
      educationLevel
      graduationYear
      createdAt
      updatedAt
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
      owner
      firstName
      lastName
      gender
      age
      ethnicity
      languages
      values
      instagram
      facebook
      linkedin
      profilePicKey
      schoolName
      programOfStudy
      educationLevel
      graduationYear
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateMentorProfile = /* GraphQL */ `
  subscription OnCreateMentorProfile(
    $filter: ModelSubscriptionMentorProfileFilterInput
    $owner: String
  ) {
    onCreateMentorProfile(filter: $filter, owner: $owner) {
      id
      owner
      firstName
      lastName
      gender
      age
      ethnicity
      languages
      values
      instagram
      facebook
      linkedin
      profilePicKey
      bio
      experience
      calendly
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateMentorProfile = /* GraphQL */ `
  subscription OnUpdateMentorProfile(
    $filter: ModelSubscriptionMentorProfileFilterInput
    $owner: String
  ) {
    onUpdateMentorProfile(filter: $filter, owner: $owner) {
      id
      owner
      firstName
      lastName
      gender
      age
      ethnicity
      languages
      values
      instagram
      facebook
      linkedin
      profilePicKey
      bio
      experience
      calendly
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteMentorProfile = /* GraphQL */ `
  subscription OnDeleteMentorProfile(
    $filter: ModelSubscriptionMentorProfileFilterInput
    $owner: String
  ) {
    onDeleteMentorProfile(filter: $filter, owner: $owner) {
      id
      owner
      firstName
      lastName
      gender
      age
      ethnicity
      languages
      values
      instagram
      facebook
      linkedin
      profilePicKey
      bio
      experience
      calendly
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateMenteePreferences = /* GraphQL */ `
  subscription OnCreateMenteePreferences(
    $filter: ModelSubscriptionMenteePreferencesFilterInput
    $owner: String
  ) {
    onCreateMenteePreferences(filter: $filter, owner: $owner) {
      id
      owner
      mentorshipSkills
      mentorshipType
      mentorshipFrequency
      mentorshipGoal
      comments
      menteeId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateMenteePreferences = /* GraphQL */ `
  subscription OnUpdateMenteePreferences(
    $filter: ModelSubscriptionMenteePreferencesFilterInput
    $owner: String
  ) {
    onUpdateMenteePreferences(filter: $filter, owner: $owner) {
      id
      owner
      mentorshipSkills
      mentorshipType
      mentorshipFrequency
      mentorshipGoal
      comments
      menteeId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteMenteePreferences = /* GraphQL */ `
  subscription OnDeleteMenteePreferences(
    $filter: ModelSubscriptionMenteePreferencesFilterInput
    $owner: String
  ) {
    onDeleteMenteePreferences(filter: $filter, owner: $owner) {
      id
      owner
      mentorshipSkills
      mentorshipType
      mentorshipFrequency
      mentorshipGoal
      comments
      menteeId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateMentorPreferences = /* GraphQL */ `
  subscription OnCreateMentorPreferences(
    $filter: ModelSubscriptionMentorPreferencesFilterInput
    $owner: String
  ) {
    onCreateMentorPreferences(filter: $filter, owner: $owner) {
      id
      owner
      mentorshipSkills
      mentorshipType
      mentorshipFrequency
      mentorshipGoal
      comments
      mentorId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateMentorPreferences = /* GraphQL */ `
  subscription OnUpdateMentorPreferences(
    $filter: ModelSubscriptionMentorPreferencesFilterInput
    $owner: String
  ) {
    onUpdateMentorPreferences(filter: $filter, owner: $owner) {
      id
      owner
      mentorshipSkills
      mentorshipType
      mentorshipFrequency
      mentorshipGoal
      comments
      mentorId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteMentorPreferences = /* GraphQL */ `
  subscription OnDeleteMentorPreferences(
    $filter: ModelSubscriptionMentorPreferencesFilterInput
    $owner: String
  ) {
    onDeleteMentorPreferences(filter: $filter, owner: $owner) {
      id
      owner
      mentorshipSkills
      mentorshipType
      mentorshipFrequency
      mentorshipGoal
      comments
      mentorId
      createdAt
      updatedAt
      __typename
    }
  }
`;
