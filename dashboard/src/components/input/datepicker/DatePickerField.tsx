import { Field } from "formik";
import { FunctionComponent } from "react";
import {
    CustomFieldWrapper,
    CustomFieldContainer,
    CustomInfoContainer,
    CustomInfo,
    CustomInnerFieldContainer,
} from "../../../styles/global";
import DatePickerComponent from "./DatePickerComponent";

interface DatePickerFieldProps {
    field: string;
    placeholder: string;
}

const DatePickerField: FunctionComponent<DatePickerFieldProps> = ({
    field,
    placeholder,
}) => {
    return (
        <CustomFieldWrapper>
            <CustomFieldContainer>
                <CustomInfoContainer>
                    <CustomInfo>{placeholder}</CustomInfo>
                </CustomInfoContainer>
                <CustomInnerFieldContainer>
                    <Field name={field} component={DatePickerComponent} />
                </CustomInnerFieldContainer>
            </CustomFieldContainer>
        </CustomFieldWrapper>
    );
};

export default DatePickerField;
