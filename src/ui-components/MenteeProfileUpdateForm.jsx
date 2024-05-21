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
import { getMenteeProfile } from "../graphql/queries";
import { updateMenteeProfile } from "../graphql/mutations";
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
export default function MenteeProfileUpdateForm(props) {
  const {
    id: idProp,
    menteeProfile: menteeProfileModelProp,
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
    schoolName: "",
    programOfStudy: "",
    educationLevel: "",
    graduationYear: "",
    identityId: "",
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
  const [schoolName, setSchoolName] = React.useState(initialValues.schoolName);
  const [programOfStudy, setProgramOfStudy] = React.useState(
    initialValues.programOfStudy
  );
  const [educationLevel, setEducationLevel] = React.useState(
    initialValues.educationLevel
  );
  const [graduationYear, setGraduationYear] = React.useState(
    initialValues.graduationYear
  );
  const [identityId, setIdentityId] = React.useState(initialValues.identityId);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = menteeProfileRecord
      ? { ...initialValues, ...menteeProfileRecord }
      : initialValues;
    setOwner(cleanValues.owner);
    setFirstName(cleanValues.firstName);
    setLastName(cleanValues.lastName);
    setGender(cleanValues.gender);
    setAge(cleanValues.age);
    setEthnicity(cleanValues.ethnicity ?? []);
    setCurrentEthnicityValue("");
    setLanguages(cleanValues.languages ?? []);
    setCurrentLanguagesValue("");
    setValues(cleanValues.values ?? []);
    setCurrentValuesValue("");
    setInstagram(cleanValues.instagram);
    setFacebook(cleanValues.facebook);
    setLinkedin(cleanValues.linkedin);
    setProfilePicKey(cleanValues.profilePicKey);
    setSchoolName(cleanValues.schoolName);
    setProgramOfStudy(cleanValues.programOfStudy);
    setEducationLevel(cleanValues.educationLevel);
    setGraduationYear(cleanValues.graduationYear);
    setIdentityId(cleanValues.identityId);
    setErrors({});
  };
  const [menteeProfileRecord, setMenteeProfileRecord] = React.useState(
    menteeProfileModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getMenteeProfile.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getMenteeProfile
        : menteeProfileModelProp;
      setMenteeProfileRecord(record);
    };
    queryData();
  }, [idProp, menteeProfileModelProp]);
  React.useEffect(resetStateValues, [menteeProfileRecord]);
  const [currentEthnicityValue, setCurrentEthnicityValue] = React.useState("");
  const ethnicityRef = React.createRef();
  const [currentLanguagesValue, setCurrentLanguagesValue] = React.useState("");
  const languagesRef = React.createRef();
  const [currentValuesValue, setCurrentValuesValue] = React.useState("");
  const valuesRef = React.createRef();
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
    schoolName: [],
    programOfStudy: [],
    educationLevel: [],
    graduationYear: [],
    identityId: [],
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
          owner: owner ?? null,
          firstName: firstName ?? null,
          lastName: lastName ?? null,
          gender: gender ?? null,
          age: age ?? null,
          ethnicity: ethnicity ?? null,
          languages: languages ?? null,
          values: values ?? null,
          instagram: instagram ?? null,
          facebook: facebook ?? null,
          linkedin: linkedin ?? null,
          profilePicKey: profilePicKey ?? null,
          schoolName: schoolName ?? null,
          programOfStudy: programOfStudy ?? null,
          educationLevel: educationLevel ?? null,
          graduationYear: graduationYear ?? null,
          identityId: identityId ?? null,
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
            query: updateMenteeProfile.replaceAll("__typename", ""),
            variables: {
              input: {
                id: menteeProfileRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "MenteeProfileUpdateForm")}
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
              schoolName,
              programOfStudy,
              educationLevel,
              graduationYear,
              identityId,
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
              schoolName,
              programOfStudy,
              educationLevel,
              graduationYear,
              identityId,
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
              schoolName,
              programOfStudy,
              educationLevel,
              graduationYear,
              identityId,
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
              schoolName,
              programOfStudy,
              educationLevel,
              graduationYear,
              identityId,
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
              schoolName,
              programOfStudy,
              educationLevel,
              graduationYear,
              identityId,
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
              schoolName,
              programOfStudy,
              educationLevel,
              graduationYear,
              identityId,
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
              schoolName,
              programOfStudy,
              educationLevel,
              graduationYear,
              identityId,
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
              schoolName,
              programOfStudy,
              educationLevel,
              graduationYear,
              identityId,
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
              schoolName,
              programOfStudy,
              educationLevel,
              graduationYear,
              identityId,
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
              schoolName,
              programOfStudy,
              educationLevel,
              graduationYear,
              identityId,
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
              schoolName,
              programOfStudy,
              educationLevel,
              graduationYear,
              identityId,
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
              schoolName,
              programOfStudy,
              educationLevel,
              graduationYear,
              identityId,
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
        label="School name"
        isRequired={false}
        isReadOnly={false}
        value={schoolName}
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
              schoolName: value,
              programOfStudy,
              educationLevel,
              graduationYear,
              identityId,
            };
            const result = onChange(modelFields);
            value = result?.schoolName ?? value;
          }
          if (errors.schoolName?.hasError) {
            runValidationTasks("schoolName", value);
          }
          setSchoolName(value);
        }}
        onBlur={() => runValidationTasks("schoolName", schoolName)}
        errorMessage={errors.schoolName?.errorMessage}
        hasError={errors.schoolName?.hasError}
        {...getOverrideProps(overrides, "schoolName")}
      ></TextField>
      <TextField
        label="Program of study"
        isRequired={false}
        isReadOnly={false}
        value={programOfStudy}
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
              schoolName,
              programOfStudy: value,
              educationLevel,
              graduationYear,
              identityId,
            };
            const result = onChange(modelFields);
            value = result?.programOfStudy ?? value;
          }
          if (errors.programOfStudy?.hasError) {
            runValidationTasks("programOfStudy", value);
          }
          setProgramOfStudy(value);
        }}
        onBlur={() => runValidationTasks("programOfStudy", programOfStudy)}
        errorMessage={errors.programOfStudy?.errorMessage}
        hasError={errors.programOfStudy?.hasError}
        {...getOverrideProps(overrides, "programOfStudy")}
      ></TextField>
      <TextField
        label="Education level"
        isRequired={false}
        isReadOnly={false}
        value={educationLevel}
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
              schoolName,
              programOfStudy,
              educationLevel: value,
              graduationYear,
              identityId,
            };
            const result = onChange(modelFields);
            value = result?.educationLevel ?? value;
          }
          if (errors.educationLevel?.hasError) {
            runValidationTasks("educationLevel", value);
          }
          setEducationLevel(value);
        }}
        onBlur={() => runValidationTasks("educationLevel", educationLevel)}
        errorMessage={errors.educationLevel?.errorMessage}
        hasError={errors.educationLevel?.hasError}
        {...getOverrideProps(overrides, "educationLevel")}
      ></TextField>
      <TextField
        label="Graduation year"
        isRequired={false}
        isReadOnly={false}
        value={graduationYear}
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
              schoolName,
              programOfStudy,
              educationLevel,
              graduationYear: value,
              identityId,
            };
            const result = onChange(modelFields);
            value = result?.graduationYear ?? value;
          }
          if (errors.graduationYear?.hasError) {
            runValidationTasks("graduationYear", value);
          }
          setGraduationYear(value);
        }}
        onBlur={() => runValidationTasks("graduationYear", graduationYear)}
        errorMessage={errors.graduationYear?.errorMessage}
        hasError={errors.graduationYear?.hasError}
        {...getOverrideProps(overrides, "graduationYear")}
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
              schoolName,
              programOfStudy,
              educationLevel,
              graduationYear,
              identityId: value,
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
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || menteeProfileModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || menteeProfileModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
