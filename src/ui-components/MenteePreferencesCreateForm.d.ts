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
export declare type MenteePreferencesCreateFormInputValues = {
    owner?: string;
    mentorshipSkills?: string[];
    mentorshipType?: string[];
    mentorshipFrequency?: string[];
    mentorshipGoal?: string[];
    comments?: string;
    menteeId?: string;
};
export declare type MenteePreferencesCreateFormValidationValues = {
    owner?: ValidationFunction<string>;
    mentorshipSkills?: ValidationFunction<string>;
    mentorshipType?: ValidationFunction<string>;
    mentorshipFrequency?: ValidationFunction<string>;
    mentorshipGoal?: ValidationFunction<string>;
    comments?: ValidationFunction<string>;
    menteeId?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MenteePreferencesCreateFormOverridesProps = {
    MenteePreferencesCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
    mentorshipSkills?: PrimitiveOverrideProps<TextFieldProps>;
    mentorshipType?: PrimitiveOverrideProps<TextFieldProps>;
    mentorshipFrequency?: PrimitiveOverrideProps<TextFieldProps>;
    mentorshipGoal?: PrimitiveOverrideProps<TextFieldProps>;
    comments?: PrimitiveOverrideProps<TextFieldProps>;
    menteeId?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type MenteePreferencesCreateFormProps = React.PropsWithChildren<{
    overrides?: MenteePreferencesCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: MenteePreferencesCreateFormInputValues) => MenteePreferencesCreateFormInputValues;
    onSuccess?: (fields: MenteePreferencesCreateFormInputValues) => void;
    onError?: (fields: MenteePreferencesCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MenteePreferencesCreateFormInputValues) => MenteePreferencesCreateFormInputValues;
    onValidate?: MenteePreferencesCreateFormValidationValues;
} & React.CSSProperties>;
export default function MenteePreferencesCreateForm(props: MenteePreferencesCreateFormProps): React.ReactElement;
