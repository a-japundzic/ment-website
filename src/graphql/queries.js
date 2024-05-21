/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const echo = /* GraphQL */ `
  query Echo($msg: String) {
    echo(msg: $msg)
  }
`;
export const getMenteeProfile = /* GraphQL */ `
  query GetMenteeProfile($id: ID!) {
    getMenteeProfile(id: $id) {
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
export const listMenteeProfiles = /* GraphQL */ `
  query ListMenteeProfiles(
    $filter: ModelMenteeProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMenteeProfiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getMentorProfile = /* GraphQL */ `
  query GetMentorProfile($id: ID!) {
    getMentorProfile(id: $id) {
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
export const listMentorProfiles = /* GraphQL */ `
  query ListMentorProfiles(
    $filter: ModelMentorProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMentorProfiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        identityId
        calendly
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const menteeListMentorProfiles = /* GraphQL */ `
  query ListMentorProfiles(
    $filter: ModelMentorProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMentorProfiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
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
        identityId
        experience
        calendly
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getMenteePreferences = /* GraphQL */ `
  query GetMenteePreferences($id: ID!) {
    getMenteePreferences(id: $id) {
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
export const listMenteePreferences = /* GraphQL */ `
  query ListMenteePreferences(
    $filter: ModelMenteePreferencesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMenteePreferences(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getMentorPreferences = /* GraphQL */ `
  query GetMentorPreferences($id: ID!) {
    getMentorPreferences(id: $id) {
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
export const listMentorPreferences = /* GraphQL */ `
  query ListMentorPreferences(
    $filter: ModelMentorPreferencesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMentorPreferences(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
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
      nextToken
      __typename
    }
  }
`;
export const filterListMentorPreferences = /* GraphQL */ `
  query ListMentorPreferences(
    $filter: ModelMentorPreferencesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMentorPreferences(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
