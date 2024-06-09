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
import { getMenteePreferences } from "../graphql/queries";
import { updateMenteePreferences } from "../graphql/mutations";
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
export default function MenteePreferencesUpdateForm(props) {
  const {
    id: idProp,
    menteePreferences: menteePreferencesModelProp,
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
    mentorshipSkills: [],
    mentorshipType: [],
    mentorshipFrequency: [],
    mentorshipGoal: [],
    learningGoals: "",
    menteeId: "",
  };
  const [owner, setOwner] = React.useState(initialValues.owner);
  const [mentorshipSkills, setMentorshipSkills] = React.useState(
    initialValues.mentorshipSkills
  );
  const [mentorshipType, setMentorshipType] = React.useState(
    initialValues.mentorshipType
  );
  const [mentorshipFrequency, setMentorshipFrequency] = React.useState(
    initialValues.mentorshipFrequency
  );
  const [mentorshipGoal, setMentorshipGoal] = React.useState(
    initialValues.mentorshipGoal
  );
  const [learningGoals, setLearningGoals] = React.useState(
    initialValues.learningGoals
  );
  const [menteeId, setMenteeId] = React.useState(initialValues.menteeId);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = menteePreferencesRecord
      ? { ...initialValues, ...menteePreferencesRecord }
      : initialValues;
    setOwner(cleanValues.owner);
    setMentorshipSkills(cleanValues.mentorshipSkills ?? []);
    setCurrentMentorshipSkillsValue("");
    setMentorshipType(cleanValues.mentorshipType ?? []);
    setCurrentMentorshipTypeValue("");
    setMentorshipFrequency(cleanValues.mentorshipFrequency ?? []);
    setCurrentMentorshipFrequencyValue("");
    setMentorshipGoal(cleanValues.mentorshipGoal ?? []);
    setCurrentMentorshipGoalValue("");
    setLearningGoals(cleanValues.learningGoals);
    setMenteeId(cleanValues.menteeId);
    setErrors({});
  };
  const [menteePreferencesRecord, setMenteePreferencesRecord] = React.useState(
    menteePreferencesModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getMenteePreferences.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getMenteePreferences
        : menteePreferencesModelProp;
      setMenteePreferencesRecord(record);
    };
    queryData();
  }, [idProp, menteePreferencesModelProp]);
  React.useEffect(resetStateValues, [menteePreferencesRecord]);
  const [currentMentorshipSkillsValue, setCurrentMentorshipSkillsValue] =
    React.useState("");
  const mentorshipSkillsRef = React.createRef();
  const [currentMentorshipTypeValue, setCurrentMentorshipTypeValue] =
    React.useState("");
  const mentorshipTypeRef = React.createRef();
  const [currentMentorshipFrequencyValue, setCurrentMentorshipFrequencyValue] =
    React.useState("");
  const mentorshipFrequencyRef = React.createRef();
  const [currentMentorshipGoalValue, setCurrentMentorshipGoalValue] =
    React.useState("");
  const mentorshipGoalRef = React.createRef();
  const validations = {
    owner: [],
    mentorshipSkills: [],
    mentorshipType: [],
    mentorshipFrequency: [],
    mentorshipGoal: [],
    learningGoals: [],
    menteeId: [],
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
          mentorshipSkills: mentorshipSkills ?? null,
          mentorshipType: mentorshipType ?? null,
          mentorshipFrequency: mentorshipFrequency ?? null,
          mentorshipGoal: mentorshipGoal ?? null,
          learningGoals: learningGoals ?? null,
          menteeId: menteeId ?? null,
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
            query: updateMenteePreferences.replaceAll("__typename", ""),
            variables: {
              input: {
                id: menteePreferencesRecord.id,
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
      {...getOverrideProps(overrides, "MenteePreferencesUpdateForm")}
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
              mentorshipSkills,
              mentorshipType,
              mentorshipFrequency,
              mentorshipGoal,
              learningGoals,
              menteeId,
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
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              owner,
              mentorshipSkills: values,
              mentorshipType,
              mentorshipFrequency,
              mentorshipGoal,
              learningGoals,
              menteeId,
            };
            const result = onChange(modelFields);
            values = result?.mentorshipSkills ?? values;
          }
          setMentorshipSkills(values);
          setCurrentMentorshipSkillsValue("");
        }}
        currentFieldValue={currentMentorshipSkillsValue}
        label={"Mentorship skills"}
        items={mentorshipSkills}
        hasError={errors?.mentorshipSkills?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "mentorshipSkills",
            currentMentorshipSkillsValue
          )
        }
        errorMessage={errors?.mentorshipSkills?.errorMessage}
        setFieldValue={setCurrentMentorshipSkillsValue}
        inputFieldRef={mentorshipSkillsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Mentorship skills"
          isRequired={false}
          isReadOnly={false}
          value={currentMentorshipSkillsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.mentorshipSkills?.hasError) {
              runValidationTasks("mentorshipSkills", value);
            }
            setCurrentMentorshipSkillsValue(value);
          }}
          onBlur={() =>
            runValidationTasks("mentorshipSkills", currentMentorshipSkillsValue)
          }
          errorMessage={errors.mentorshipSkills?.errorMessage}
          hasError={errors.mentorshipSkills?.hasError}
          ref={mentorshipSkillsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "mentorshipSkills")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              owner,
              mentorshipSkills,
              mentorshipType: values,
              mentorshipFrequency,
              mentorshipGoal,
              learningGoals,
              menteeId,
            };
            const result = onChange(modelFields);
            values = result?.mentorshipType ?? values;
          }
          setMentorshipType(values);
          setCurrentMentorshipTypeValue("");
        }}
        currentFieldValue={currentMentorshipTypeValue}
        label={"Mentorship type"}
        items={mentorshipType}
        hasError={errors?.mentorshipType?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("mentorshipType", currentMentorshipTypeValue)
        }
        errorMessage={errors?.mentorshipType?.errorMessage}
        setFieldValue={setCurrentMentorshipTypeValue}
        inputFieldRef={mentorshipTypeRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Mentorship type"
          isRequired={false}
          isReadOnly={false}
          value={currentMentorshipTypeValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.mentorshipType?.hasError) {
              runValidationTasks("mentorshipType", value);
            }
            setCurrentMentorshipTypeValue(value);
          }}
          onBlur={() =>
            runValidationTasks("mentorshipType", currentMentorshipTypeValue)
          }
          errorMessage={errors.mentorshipType?.errorMessage}
          hasError={errors.mentorshipType?.hasError}
          ref={mentorshipTypeRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "mentorshipType")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              owner,
              mentorshipSkills,
              mentorshipType,
              mentorshipFrequency: values,
              mentorshipGoal,
              learningGoals,
              menteeId,
            };
            const result = onChange(modelFields);
            values = result?.mentorshipFrequency ?? values;
          }
          setMentorshipFrequency(values);
          setCurrentMentorshipFrequencyValue("");
        }}
        currentFieldValue={currentMentorshipFrequencyValue}
        label={"Mentorship frequency"}
        items={mentorshipFrequency}
        hasError={errors?.mentorshipFrequency?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "mentorshipFrequency",
            currentMentorshipFrequencyValue
          )
        }
        errorMessage={errors?.mentorshipFrequency?.errorMessage}
        setFieldValue={setCurrentMentorshipFrequencyValue}
        inputFieldRef={mentorshipFrequencyRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Mentorship frequency"
          isRequired={false}
          isReadOnly={false}
          value={currentMentorshipFrequencyValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.mentorshipFrequency?.hasError) {
              runValidationTasks("mentorshipFrequency", value);
            }
            setCurrentMentorshipFrequencyValue(value);
          }}
          onBlur={() =>
            runValidationTasks(
              "mentorshipFrequency",
              currentMentorshipFrequencyValue
            )
          }
          errorMessage={errors.mentorshipFrequency?.errorMessage}
          hasError={errors.mentorshipFrequency?.hasError}
          ref={mentorshipFrequencyRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "mentorshipFrequency")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              owner,
              mentorshipSkills,
              mentorshipType,
              mentorshipFrequency,
              mentorshipGoal: values,
              learningGoals,
              menteeId,
            };
            const result = onChange(modelFields);
            values = result?.mentorshipGoal ?? values;
          }
          setMentorshipGoal(values);
          setCurrentMentorshipGoalValue("");
        }}
        currentFieldValue={currentMentorshipGoalValue}
        label={"Mentorship goal"}
        items={mentorshipGoal}
        hasError={errors?.mentorshipGoal?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("mentorshipGoal", currentMentorshipGoalValue)
        }
        errorMessage={errors?.mentorshipGoal?.errorMessage}
        setFieldValue={setCurrentMentorshipGoalValue}
        inputFieldRef={mentorshipGoalRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Mentorship goal"
          isRequired={false}
          isReadOnly={false}
          value={currentMentorshipGoalValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.mentorshipGoal?.hasError) {
              runValidationTasks("mentorshipGoal", value);
            }
            setCurrentMentorshipGoalValue(value);
          }}
          onBlur={() =>
            runValidationTasks("mentorshipGoal", currentMentorshipGoalValue)
          }
          errorMessage={errors.mentorshipGoal?.errorMessage}
          hasError={errors.mentorshipGoal?.hasError}
          ref={mentorshipGoalRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "mentorshipGoal")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Learning goals"
        isRequired={false}
        isReadOnly={false}
        value={learningGoals}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              owner,
              mentorshipSkills,
              mentorshipType,
              mentorshipFrequency,
              mentorshipGoal,
              learningGoals: value,
              menteeId,
            };
            const result = onChange(modelFields);
            value = result?.learningGoals ?? value;
          }
          if (errors.learningGoals?.hasError) {
            runValidationTasks("learningGoals", value);
          }
          setLearningGoals(value);
        }}
        onBlur={() => runValidationTasks("learningGoals", learningGoals)}
        errorMessage={errors.learningGoals?.errorMessage}
        hasError={errors.learningGoals?.hasError}
        {...getOverrideProps(overrides, "learningGoals")}
      ></TextField>
      <TextField
        label="Mentee id"
        isRequired={false}
        isReadOnly={false}
        value={menteeId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              owner,
              mentorshipSkills,
              mentorshipType,
              mentorshipFrequency,
              mentorshipGoal,
              learningGoals,
              menteeId: value,
            };
            const result = onChange(modelFields);
            value = result?.menteeId ?? value;
          }
          if (errors.menteeId?.hasError) {
            runValidationTasks("menteeId", value);
          }
          setMenteeId(value);
        }}
        onBlur={() => runValidationTasks("menteeId", menteeId)}
        errorMessage={errors.menteeId?.errorMessage}
        hasError={errors.menteeId?.hasError}
        {...getOverrideProps(overrides, "menteeId")}
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
          isDisabled={!(idProp || menteePreferencesModelProp)}
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
              !(idProp || menteePreferencesModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
