import { useEffect, FunctionComponent, useCallback } from "react";
import { FormikValues, useFormikContext } from "formik";
import { omit, isEqual } from "lodash";

interface AutoSaveProps {
    delay?: number;
    onSubmit?: (v: FormikValues) => void;
}

const AutoSave: FunctionComponent<AutoSaveProps> = ({
    delay = 300,
    onSubmit,
}) => {
    const { values, errors, initialValues } = useFormikContext<FormikValues>();

    const isSameValueAsInitialValue = async (v: FormikValues) =>
        isEqual(v, initialValues);

    const onFormSubmit = useCallback(async () => {
        const v: FormikValues = omit(values, Object.keys(errors));
        if (onSubmit && !(await isSameValueAsInitialValue(v))) onSubmit(v);
    }, [values, errors, onSubmit]);

    useEffect(() => {
        const timer = setTimeout(() => onFormSubmit(), delay);
        return () => clearTimeout(timer);
    }, [values, errors, delay, onFormSubmit]);

    return null;
};

export default AutoSave;
