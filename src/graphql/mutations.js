/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createMenteeProfile = /* GraphQL */ `
  mutation CreateMenteeProfile(
    $input: CreateMenteeProfileInput!
    $condition: ModelMenteeProfileConditionInput
  ) {
    createMenteeProfile(input: $input, condition: $condition) {
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
export const updateMenteeProfile = /* GraphQL */ `
  mutation UpdateMenteeProfile(
    $input: UpdateMenteeProfileInput!
    $condition: ModelMenteeProfileConditionInput
  ) {
    updateMenteeProfile(input: $input, condition: $condition) {
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
export const updateMenteeMeetingList = /* GraphQL */ `
  mutation UpdateMenteeProfile(
    $input: UpdateMenteeProfileInput!
    $condition: ModelMenteeProfileConditionInput
  ) {
    updateMenteeProfile(input: $input, condition: $condition) {
      id
      meetingList
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
export const createMentorProfile = /* GraphQL */ `
  mutation CreateMentorProfile(
    $input: CreateMentorProfileInput!
    $condition: ModelMentorProfileConditionInput
  ) {
    createMentorProfile(input: $input, condition: $condition) {
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
export const updateMentorProfile = /* GraphQL */ `
  mutation UpdateMentorProfile(
    $input: UpdateMentorProfileInput!
    $condition: ModelMentorProfileConditionInput
  ) {
    updateMentorProfile(input: $input, condition: $condition) {
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
export const updateMentorMeetingList = /* GraphQL */ `
  mutation UpdateMentorProfile(
    $input: UpdateMentorProfileInput!
    $condition: ModelMentorProfileConditionInput
  ) {
    updateMentorProfile(input: $input, condition: $condition) {
      id
      meetingList
    }
  }
`;
export const deleteMentorProfile = /* GraphQL */ `
  mutation DeleteMentorProfile(
    $input: DeleteMentorProfileInput!
    $condition: ModelMentorProfileConditionInput
  ) {
    deleteMentorProfile(input: $input, condition: $condition) {
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
export const createMenteePreferences = /* GraphQL */ `
  mutation CreateMenteePreferences(
    $input: CreateMenteePreferencesInput!
    $condition: ModelMenteePreferencesConditionInput
  ) {
    createMenteePreferences(input: $input, condition: $condition) {
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
export const updateMenteePreferences = /* GraphQL */ `
  mutation UpdateMenteePreferences(
    $input: UpdateMenteePreferencesInput!
    $condition: ModelMenteePreferencesConditionInput
  ) {
    updateMenteePreferences(input: $input, condition: $condition) {
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
export const deleteMenteePreferences = /* GraphQL */ `
  mutation DeleteMenteePreferences(
    $input: DeleteMenteePreferencesInput!
    $condition: ModelMenteePreferencesConditionInput
  ) {
    deleteMenteePreferences(input: $input, condition: $condition) {
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
export const createMentorPreferences = /* GraphQL */ `
  mutation CreateMentorPreferences(
    $input: CreateMentorPreferencesInput!
    $condition: ModelMentorPreferencesConditionInput
  ) {
    createMentorPreferences(input: $input, condition: $condition) {
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
export const updateMentorPreferences = /* GraphQL */ `
  mutation UpdateMentorPreferences(
    $input: UpdateMentorPreferencesInput!
    $condition: ModelMentorPreferencesConditionInput
  ) {
    updateMentorPreferences(input: $input, condition: $condition) {
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
export const deleteMentorPreferences = /* GraphQL */ `
  mutation DeleteMentorPreferences(
    $input: DeleteMentorPreferencesInput!
    $condition: ModelMentorPreferencesConditionInput
  ) {
    deleteMentorPreferences(input: $input, condition: $condition) {
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
