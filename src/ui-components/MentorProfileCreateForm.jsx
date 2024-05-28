/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createMentorProfile } from "../graphql/mutations";
const client = generateClient();
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  runValidationTasks,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    const { hasError } = runValidationTasks();
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button size="small" variation="link" onClick={addItem}>
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function MentorProfileCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    owner: "",
    firstName: "",
    lastName: "",
    gender: "",
    age: "",
    ethnicity: [],
    languages: [],
    values: [],
    instagram: "",
    facebook: "",
    linkedin: "",
    profilePicKey: "",
    bio: "",
    experience: [],
    calendly: "",
    identityId: "",
    meetingList: [],
  };
  const [owner, setOwner] = React.useState(initialValues.owner);
  const [firstName, setFirstName] = React.useState(initialValues.firstName);
  const [lastName, setLastName] = React.useState(initialValues.lastName);
  const [gender, setGender] = React.useState(initialValues.gender);
  const [age, setAge] = React.useState(initialValues.age);
  const [ethnicity, setEthnicity] = React.useState(initialValues.ethnicity);
  const [languages, setLanguages] = React.useState(initialValues.languages);
  const [values, setValues] = React.useState(initialValues.values);
  const [instagram, setInstagram] = React.useState(initialValues.instagram);
  const [facebook, setFacebook] = React.useState(initialValues.facebook);
  const [linkedin, setLinkedin] = React.useState(initialValues.linkedin);
  const [profilePicKey, setProfilePicKey] = React.useState(
    initialValues.profilePicKey
  );
  const [bio, setBio] = React.useState(initialValues.bio);
  const [experience, setExperience] = React.useState(initialValues.experience);
  const [calendly, setCalendly] = React.useState(initialValues.calendly);
  const [identityId, setIdentityId] = React.useState(initialValues.identityId);
  const [meetingList, setMeetingList] = React.useState(
    initialValues.meetingList
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setOwner(initialValues.owner);
    setFirstName(initialValues.firstName);
    setLastName(initialValues.lastName);
    setGender(initialValues.gender);
    setAge(initialValues.age);
    setEthnicity(initialValues.ethnicity);
    setCurrentEthnicityValue("");
    setLanguages(initialValues.languages);
    setCurrentLanguagesValue("");
    setValues(initialValues.values);
    setCurrentValuesValue("");
    setInstagram(initialValues.instagram);
    setFacebook(initialValues.facebook);
    setLinkedin(initialValues.linkedin);
    setProfilePicKey(initialValues.profilePicKey);
    setBio(initialValues.bio);
    setExperience(initialValues.experience);
    setCurrentExperienceValue("");
    setCalendly(initialValues.calendly);
    setIdentityId(initialValues.identityId);
    setMeetingList(initialValues.meetingList);
    setCurrentMeetingListValue("");
    setErrors({});
  };
  const [currentEthnicityValue, setCurrentEthnicityValue] = React.useState("");
  const ethnicityRef = React.createRef();
  const [currentLanguagesValue, setCurrentLanguagesValue] = React.useState("");
  const languagesRef = React.createRef();
  const [currentValuesValue, setCurrentValuesValue] = React.useState("");
  const valuesRef = React.createRef();
  const [currentExperienceValue, setCurrentExperienceValue] =
    React.useState("");
  const experienceRef = React.createRef();
  const [currentMeetingListValue, setCurrentMeetingListValue] =
    React.useState("");
  const meetingListRef = React.createRef();
  const validations = {
    owner: [],
    firstName: [],
    lastName: [],
    gender: [],
    age: [],
    ethnicity: [],
    languages: [],
    values: [],
    instagram: [],
    facebook: [],
    linkedin: [],
    profilePicKey: [],
    bio: [],
    experience: [],
    calendly: [],
    identityId: [],
    meetingList: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          owner,
          firstName,
          lastName,
          gender,
          age,
          ethnicity,
          languages,
          values,
          instagram,
          facebook,
          linkedin,
          profilePicKey,
          bio,
          experience,
          calendly,
          identityId,
          meetingList,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: createMentorProfile.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "MentorProfileCreateForm")}
      {...rest}
    >
      <TextField
        label="Owner"
        isRequired={false}
        isReadOnly={false}
        value={owner}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              owner: value,
              firstName,
              lastName,
              gender,
              age,
              ethnicity,
              languages,
              values,
              instagram,
              facebook,
              linkedin,
              profilePicKey,
              bio,
              experience,
              calendly,
              identityId,
              meetingList,
            };
            const result = onChange(modelFields);
            value = result?.owner ?? value;
          }
          if (errors.owner?.hasError) {
            runValidationTasks("owner", value);
          }
          setOwner(value);
        }}
        onBlur={() => runValidationTasks("owner", owner)}
        errorMessage={errors.owner?.errorMessage}
        hasError={errors.owner?.hasError}
        {...getOverrideProps(overrides, "owner")}
      ></TextField>
      <TextField
        label="First name"
        isRequired={false}
        isReadOnly={false}
        value={firstName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              owner,
              firstName: value,
              lastName,
              gender,
              age,
              ethnicity,
              languages,
              values,
              instagram,
              facebook,
              linkedin,
              profilePicKey,
              bio,
              experience,
              calendly,
              identityId,
              meetingList,
            };
            const result = onChange(modelFields);
            value = result?.firstName ?? value;
          }
          if (errors.firstName?.hasError) {
            runValidationTasks("firstName", value);
          }
          setFirstName(value);
        }}
        onBlur={() => runValidationTasks("firstName", firstName)}
        errorMessage={errors.firstName?.errorMessage}
        hasError={errors.firstName?.hasError}
        {...getOverrideProps(overrides, "firstName")}
      ></TextField>
      <TextField
        label="Last name"
        isRequired={false}
        isReadOnly={false}
        value={lastName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              owner,
              firstName,
              lastName: value,
              gender,
              age,
              ethnicity,
              languages,
              values,
              instagram,
              facebook,
              linkedin,
              profilePicKey,
              bio,
              experience,
              calendly,
              identityId,
              meetingList,
            };
            const result = onChange(modelFields);
            value = result?.lastName ?? value;
          }
          if (errors.lastName?.hasError) {
            runValidationTasks("lastName", value);
          }
          setLastName(value);
        }}
        onBlur={() => runValidationTasks("lastName", lastName)}
        errorMessage={errors.lastName?.errorMessage}
        hasError={errors.lastName?.hasError}
        {...getOverrideProps(overrides, "lastName")}
      ></TextField>
      <TextField
        label="Gender"
        isRequired={false}
        isReadOnly={false}
        value={gender}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              owner,
              firstName,
              lastName,
              gender: value,
              age,
              ethnicity,
              languages,
              values,
              instagram,
              facebook,
              linkedin,
              profilePicKey,
              bio,
              experience,
              calendly,
              identityId,
              meetingList,
            };
            const result = onChange(modelFields);
            value = result?.gender ?? value;
          }
          if (errors.gender?.hasError) {
            runValidationTasks("gender", value);
          }
          setGender(value);
        }}
        onBlur={() => runValidationTasks("gender", gender)}
        errorMessage={errors.gender?.errorMessage}
        hasError={errors.gender?.hasError}
        {...getOverrideProps(overrides, "gender")}
      ></TextField>
      <TextField
        label="Age"
        isRequired={false}
        isReadOnly={false}
        value={age}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              owner,
              firstName,
              lastName,
              gender,
              age: value,
              ethnicity,
              languages,
              values,
              instagram,
              facebook,
              linkedin,
              profilePicKey,
              bio,
              experience,
              calendly,
              identityId,
              meetingList,
            };
            const result = onChange(modelFields);
            value = result?.age ?? value;
          }
          if (errors.age?.hasError) {
            runValidationTasks("age", value);
          }
          setAge(value);
        }}
        onBlur={() => runValidationTasks("age", age)}
        errorMessage={errors.age?.errorMessage}
        hasError={errors.age?.hasError}
        {...getOverrideProps(overrides, "age")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              owner,
              firstName,
              lastName,
              gender,
              age,
              ethnicity: values,
              languages,
              values,
              instagram,
              facebook,
              linkedin,
              profilePicKey,
              bio,
              experience,
              calendly,
              identityId,
              meetingList,
            };
            const result = onChange(modelFields);
            values = result?.ethnicity ?? values;
          }
          setEthnicity(values);
          setCurrentEthnicityValue("");
        }}
        currentFieldValue={currentEthnicityValue}
        label={"Ethnicity"}
        items={ethnicity}
        hasError={errors?.ethnicity?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("ethnicity", currentEthnicityValue)
        }
        errorMessage={errors?.ethnicity?.errorMessage}
        setFieldValue={setCurrentEthnicityValue}
        inputFieldRef={ethnicityRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Ethnicity"
          isRequired={false}
          isReadOnly={false}
          value={currentEthnicityValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.ethnicity?.hasError) {
              runValidationTasks("ethnicity", value);
            }
            setCurrentEthnicityValue(value);
          }}
          onBlur={() => runValidationTasks("ethnicity", currentEthnicityValue)}
          errorMessage={errors.ethnicity?.errorMessage}
          hasError={errors.ethnicity?.hasError}
          ref={ethnicityRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "ethnicity")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              owner,
              firstName,
              lastName,
              gender,
              age,
              ethnicity,
              languages: values,
              values,
              instagram,
              facebook,
              linkedin,
              profilePicKey,
              bio,
              experience,
              calendly,
              identityId,
              meetingList,
            };
            const result = onChange(modelFields);
            values = result?.languages ?? values;
          }
          setLanguages(values);
          setCurrentLanguagesValue("");
        }}
        currentFieldValue={currentLanguagesValue}
        label={"Languages"}
        items={languages}
        hasError={errors?.languages?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("languages", currentLanguagesValue)
        }
        errorMessage={errors?.languages?.errorMessage}
        setFieldValue={setCurrentLanguagesValue}
        inputFieldRef={languagesRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Languages"
          isRequired={false}
          isReadOnly={false}
          value={currentLanguagesValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.languages?.hasError) {
              runValidationTasks("languages", value);
            }
            setCurrentLanguagesValue(value);
          }}
          onBlur={() => runValidationTasks("languages", currentLanguagesValue)}
          errorMessage={errors.languages?.errorMessage}
          hasError={errors.languages?.hasError}
          ref={languagesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "languages")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              owner,
              firstName,
              lastName,
              gender,
              age,
              ethnicity,
              languages,
              values: values,
              instagram,
              facebook,
              linkedin,
              profilePicKey,
              bio,
              experience,
              calendly,
              identityId,
              meetingList,
            };
            const result = onChange(modelFields);
            values = result?.values ?? values;
          }
          setValues(values);
          setCurrentValuesValue("");
        }}
        currentFieldValue={currentValuesValue}
        label={"Values"}
        items={values}
        hasError={errors?.values?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("values", currentValuesValue)
        }
        errorMessage={errors?.values?.errorMessage}
        setFieldValue={setCurrentValuesValue}
        inputFieldRef={valuesRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Values"
          isRequired={false}
          isReadOnly={false}
          value={currentValuesValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.values?.hasError) {
              runValidationTasks("values", value);
            }
            setCurrentValuesValue(value);
          }}
          onBlur={() => runValidationTasks("values", currentValuesValue)}
          errorMessage={errors.values?.errorMessage}
          hasError={errors.values?.hasError}
          ref={valuesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "values")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Instagram"
        isRequired={false}
        isReadOnly={false}
        value={instagram}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              owner,
              firstName,
              lastName,
              gender,
              age,
              ethnicity,
              languages,
              values,
              instagram: value,
              facebook,
              linkedin,
              profilePicKey,
              bio,
              experience,
              calendly,
              identityId,
              meetingList,
            };
            const result = onChange(modelFields);
            value = result?.instagram ?? value;
          }
          if (errors.instagram?.hasError) {
            runValidationTasks("instagram", value);
          }
          setInstagram(value);
        }}
        onBlur={() => runValidationTasks("instagram", instagram)}
        errorMessage={errors.instagram?.errorMessage}
        hasError={errors.instagram?.hasError}
        {...getOverrideProps(overrides, "instagram")}
      ></TextField>
      <TextField
        label="Facebook"
        isRequired={false}
        isReadOnly={false}
        value={facebook}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              owner,
              firstName,
              lastName,
              gender,
              age,
              ethnicity,
              languages,
              values,
              instagram,
              facebook: value,
              linkedin,
              profilePicKey,
              bio,
              experience,
              calendly,
              identityId,
              meetingList,
            };
            const result = onChange(modelFields);
            value = result?.facebook ?? value;
          }
          if (errors.facebook?.hasError) {
            runValidationTasks("facebook", value);
          }
          setFacebook(value);
        }}
        onBlur={() => runValidationTasks("facebook", facebook)}
        errorMessage={errors.facebook?.errorMessage}
        hasError={errors.facebook?.hasError}
        {...getOverrideProps(overrides, "facebook")}
      ></TextField>
      <TextField
        label="Linkedin"
        isRequired={false}
        isReadOnly={false}
        value={linkedin}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              owner,
              firstName,
              lastName,
              gender,
              age,
              ethnicity,
              languages,
              values,
              instagram,
              facebook,
              linkedin: value,
              profilePicKey,
              bio,
              experience,
              calendly,
              identityId,
              meetingList,
            };
            const result = onChange(modelFields);
            value = result?.linkedin ?? value;
          }
          if (errors.linkedin?.hasError) {
            runValidationTasks("linkedin", value);
          }
          setLinkedin(value);
        }}
        onBlur={() => runValidationTasks("linkedin", linkedin)}
        errorMessage={errors.linkedin?.errorMessage}
        hasError={errors.linkedin?.hasError}
        {...getOverrideProps(overrides, "linkedin")}
      ></TextField>
      <TextField
        label="Profile pic key"
        isRequired={false}
        isReadOnly={false}
        value={profilePicKey}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              owner,
              firstName,
              lastName,
              gender,
              age,
              ethnicity,
              languages,
              values,
              instagram,
              facebook,
              linkedin,
              profilePicKey: value,
              bio,
              experience,
              calendly,
              identityId,
              meetingList,
            };
            const result = onChange(modelFields);
            value = result?.profilePicKey ?? value;
          }
          if (errors.profilePicKey?.hasError) {
            runValidationTasks("profilePicKey", value);
          }
          setProfilePicKey(value);
        }}
        onBlur={() => runValidationTasks("profilePicKey", profilePicKey)}
        errorMessage={errors.profilePicKey?.errorMessage}
        hasError={errors.profilePicKey?.hasError}
        {...getOverrideProps(overrides, "profilePicKey")}
      ></TextField>
      <TextField
        label="Bio"
        isRequired={false}
        isReadOnly={false}
        value={bio}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              owner,
              firstName,
              lastName,
              gender,
              age,
              ethnicity,
              languages,
              values,
              instagram,
              facebook,
              linkedin,
              profilePicKey,
              bio: value,
              experience,
              calendly,
              identityId,
              meetingList,
            };
            const result = onChange(modelFields);
            value = result?.bio ?? value;
          }
          if (errors.bio?.hasError) {
            runValidationTasks("bio", value);
          }
          setBio(value);
        }}
        onBlur={() => runValidationTasks("bio", bio)}
        errorMessage={errors.bio?.errorMessage}
        hasError={errors.bio?.hasError}
        {...getOverrideProps(overrides, "bio")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              owner,
              firstName,
              lastName,
              gender,
              age,
              ethnicity,
              languages,
              values,
              instagram,
              facebook,
              linkedin,
              profilePicKey,
              bio,
              experience: values,
              calendly,
              identityId,
              meetingList,
            };
            const result = onChange(modelFields);
            values = result?.experience ?? values;
          }
          setExperience(values);
          setCurrentExperienceValue("");
        }}
        currentFieldValue={currentExperienceValue}
        label={"Experience"}
        items={experience}
        hasError={errors?.experience?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("experience", currentExperienceValue)
        }
        errorMessage={errors?.experience?.errorMessage}
        setFieldValue={setCurrentExperienceValue}
        inputFieldRef={experienceRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Experience"
          isRequired={false}
          isReadOnly={false}
          value={currentExperienceValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.experience?.hasError) {
              runValidationTasks("experience", value);
            }
            setCurrentExperienceValue(value);
          }}
          onBlur={() =>
            runValidationTasks("experience", currentExperienceValue)
          }
          errorMessage={errors.experience?.errorMessage}
          hasError={errors.experience?.hasError}
          ref={experienceRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "experience")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Calendly"
        isRequired={false}
        isReadOnly={false}
        value={calendly}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              owner,
              firstName,
              lastName,
              gender,
              age,
              ethnicity,
              languages,
              values,
              instagram,
              facebook,
              linkedin,
              profilePicKey,
              bio,
              experience,
              calendly: value,
              identityId,
              meetingList,
            };
            const result = onChange(modelFields);
            value = result?.calendly ?? value;
          }
          if (errors.calendly?.hasError) {
            runValidationTasks("calendly", value);
          }
          setCalendly(value);
        }}
        onBlur={() => runValidationTasks("calendly", calendly)}
        errorMessage={errors.calendly?.errorMessage}
        hasError={errors.calendly?.hasError}
        {...getOverrideProps(overrides, "calendly")}
      ></TextField>
      <TextField
        label="Identity id"
        isRequired={false}
        isReadOnly={false}
        value={identityId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              owner,
              firstName,
              lastName,
              gender,
              age,
              ethnicity,
              languages,
              values,
              instagram,
              facebook,
              linkedin,
              profilePicKey,
              bio,
              experience,
              calendly,
              identityId: value,
              meetingList,
            };
            const result = onChange(modelFields);
            value = result?.identityId ?? value;
          }
          if (errors.identityId?.hasError) {
            runValidationTasks("identityId", value);
          }
          setIdentityId(value);
        }}
        onBlur={() => runValidationTasks("identityId", identityId)}
        errorMessage={errors.identityId?.errorMessage}
        hasError={errors.identityId?.hasError}
        {...getOverrideProps(overrides, "identityId")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              owner,
              firstName,
              lastName,
              gender,
              age,
              ethnicity,
              languages,
              values,
              instagram,
              facebook,
              linkedin,
              profilePicKey,
              bio,
              experience,
              calendly,
              identityId,
              meetingList: values,
            };
            const result = onChange(modelFields);
            values = result?.meetingList ?? values;
          }
          setMeetingList(values);
          setCurrentMeetingListValue("");
        }}
        currentFieldValue={currentMeetingListValue}
        label={"Meeting list"}
        items={meetingList}
        hasError={errors?.meetingList?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("meetingList", currentMeetingListValue)
        }
        errorMessage={errors?.meetingList?.errorMessage}
        setFieldValue={setCurrentMeetingListValue}
        inputFieldRef={meetingListRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Meeting list"
          isRequired={false}
          isReadOnly={false}
          value={currentMeetingListValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.meetingList?.hasError) {
              runValidationTasks("meetingList", value);
            }
            setCurrentMeetingListValue(value);
          }}
          onBlur={() =>
            runValidationTasks("meetingList", currentMeetingListValue)
          }
          errorMessage={errors.meetingList?.errorMessage}
          hasError={errors.meetingList?.hasError}
          ref={meetingListRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "meetingList")}
        ></TextField>
      </ArrayField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
