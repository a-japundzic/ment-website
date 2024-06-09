/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type MenteeProfileCreateFormInputValues = {
    owner?: string;
    firstName?: string;
    lastName?: string;
    gender?: string;
    age?: string;
    ethnicity?: string[];
    languages?: string[];
    values?: string[];
    instagram?: string;
    facebook?: string;
    linkedin?: string;
    profilePicKey?: string;
    schoolName?: string;
    programOfStudy?: string;
    educationLevel?: string;
    graduationYear?: string;
    learningGoals?: string;
    identityId?: string;
    meetingList?: string[];
};
export declare type MenteeProfileCreateFormValidationValues = {
    owner?: ValidationFunction<string>;
    firstName?: ValidationFunction<string>;
    lastName?: ValidationFunction<string>;
    gender?: ValidationFunction<string>;
    age?: ValidationFunction<string>;
    ethnicity?: ValidationFunction<string>;
    languages?: ValidationFunction<string>;
    values?: ValidationFunction<string>;
    instagram?: ValidationFunction<string>;
    facebook?: ValidationFunction<string>;
    linkedin?: ValidationFunction<string>;
    profilePicKey?: ValidationFunction<string>;
    schoolName?: ValidationFunction<string>;
    programOfStudy?: ValidationFunction<string>;
    educationLevel?: ValidationFunction<string>;
    graduationYear?: ValidationFunction<string>;
    learningGoals?: ValidationFunction<string>;
    identityId?: ValidationFunction<string>;
    meetingList?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MenteeProfileCreateFormOverridesProps = {
    MenteeProfileCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
    firstName?: PrimitiveOverrideProps<TextFieldProps>;
    lastName?: PrimitiveOverrideProps<TextFieldProps>;
    gender?: PrimitiveOverrideProps<TextFieldProps>;
    age?: PrimitiveOverrideProps<TextFieldProps>;
    ethnicity?: PrimitiveOverrideProps<TextFieldProps>;
    languages?: PrimitiveOverrideProps<TextFieldProps>;
    values?: PrimitiveOverrideProps<TextFieldProps>;
    instagram?: PrimitiveOverrideProps<TextFieldProps>;
    facebook?: PrimitiveOverrideProps<TextFieldProps>;
    linkedin?: PrimitiveOverrideProps<TextFieldProps>;
    profilePicKey?: PrimitiveOverrideProps<TextFieldProps>;
    schoolName?: PrimitiveOverrideProps<TextFieldProps>;
    programOfStudy?: PrimitiveOverrideProps<TextFieldProps>;
    educationLevel?: PrimitiveOverrideProps<TextFieldProps>;
    graduationYear?: PrimitiveOverrideProps<TextFieldProps>;
    learningGoals?: PrimitiveOverrideProps<TextFieldProps>;
    identityId?: PrimitiveOverrideProps<TextFieldProps>;
    meetingList?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type MenteeProfileCreateFormProps = React.PropsWithChildren<{
    overrides?: MenteeProfileCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: MenteeProfileCreateFormInputValues) => MenteeProfileCreateFormInputValues;
    onSuccess?: (fields: MenteeProfileCreateFormInputValues) => void;
    onError?: (fields: MenteeProfileCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MenteeProfileCreateFormInputValues) => MenteeProfileCreateFormInputValues;
    onValidate?: MenteeProfileCreateFormValidationValues;
} & React.CSSProperties>;
export default function MenteeProfileCreateForm(props: MenteeProfileCreateFormProps): React.ReactElement;
