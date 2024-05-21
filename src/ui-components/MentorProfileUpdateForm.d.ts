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
export declare type MentorProfileUpdateFormInputValues = {
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
    bio?: string;
    experience?: string[];
    calendly?: string;
    identityId?: string;
};
export declare type MentorProfileUpdateFormValidationValues = {
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
    bio?: ValidationFunction<string>;
    experience?: ValidationFunction<string>;
    calendly?: ValidationFunction<string>;
    identityId?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MentorProfileUpdateFormOverridesProps = {
    MentorProfileUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
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
    bio?: PrimitiveOverrideProps<TextFieldProps>;
    experience?: PrimitiveOverrideProps<TextFieldProps>;
    calendly?: PrimitiveOverrideProps<TextFieldProps>;
    identityId?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type MentorProfileUpdateFormProps = React.PropsWithChildren<{
    overrides?: MentorProfileUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    mentorProfile?: any;
    onSubmit?: (fields: MentorProfileUpdateFormInputValues) => MentorProfileUpdateFormInputValues;
    onSuccess?: (fields: MentorProfileUpdateFormInputValues) => void;
    onError?: (fields: MentorProfileUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MentorProfileUpdateFormInputValues) => MentorProfileUpdateFormInputValues;
    onValidate?: MentorProfileUpdateFormValidationValues;
} & React.CSSProperties>;
export default function MentorProfileUpdateForm(props: MentorProfileUpdateFormProps): React.ReactElement;
