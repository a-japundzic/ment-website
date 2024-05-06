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
export declare type MentorPreferencesUpdateFormInputValues = {
    owner?: string;
    mentorshipSkills?: string[];
    mentorshipType?: string[];
    mentorshipFrequency?: string[];
    mentorshipGoal?: string[];
    comments?: string;
    mentorId?: string;
};
export declare type MentorPreferencesUpdateFormValidationValues = {
    owner?: ValidationFunction<string>;
    mentorshipSkills?: ValidationFunction<string>;
    mentorshipType?: ValidationFunction<string>;
    mentorshipFrequency?: ValidationFunction<string>;
    mentorshipGoal?: ValidationFunction<string>;
    comments?: ValidationFunction<string>;
    mentorId?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MentorPreferencesUpdateFormOverridesProps = {
    MentorPreferencesUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
    mentorshipSkills?: PrimitiveOverrideProps<TextFieldProps>;
    mentorshipType?: PrimitiveOverrideProps<TextFieldProps>;
    mentorshipFrequency?: PrimitiveOverrideProps<TextFieldProps>;
    mentorshipGoal?: PrimitiveOverrideProps<TextFieldProps>;
    comments?: PrimitiveOverrideProps<TextFieldProps>;
    mentorId?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type MentorPreferencesUpdateFormProps = React.PropsWithChildren<{
    overrides?: MentorPreferencesUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    mentorPreferences?: any;
    onSubmit?: (fields: MentorPreferencesUpdateFormInputValues) => MentorPreferencesUpdateFormInputValues;
    onSuccess?: (fields: MentorPreferencesUpdateFormInputValues) => void;
    onError?: (fields: MentorPreferencesUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MentorPreferencesUpdateFormInputValues) => MentorPreferencesUpdateFormInputValues;
    onValidate?: MentorPreferencesUpdateFormValidationValues;
} & React.CSSProperties>;
export default function MentorPreferencesUpdateForm(props: MentorPreferencesUpdateFormProps): React.ReactElement;
