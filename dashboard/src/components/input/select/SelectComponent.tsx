import { FunctionComponent } from "react";
import Select from "react-select";
import "./select.css";

interface SelectProps {
    options: any;
    field: any;
    form: any;
}

const SelectComponent: FunctionComponent<SelectProps> = ({
    options,
    field,
    form,
}) => {
    return (
        <Select
            className="select-container"
            classNamePrefix="select"
            options={options}
            name={field.name}
            defaultValue={options[0]}
            value={
                options
                    ? options.find(
                          (option: any) => option.value === field.value
                      )
                    : ""
            }
            onChange={(option: any) =>
                form.setFieldValue(field.name, option.value)
            }
            onBlur={field.onBlur}
        />
    );
};

export default SelectComponent;
