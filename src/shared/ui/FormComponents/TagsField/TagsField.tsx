import {FC} from "react";
import Select, {components, GroupBase, Props} from "react-select";
import "./TagsField.scss";

export type iStateOption = Record<string, string>;

type SelectProps<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> = Props<Option, IsMulti, Group> & {
  label?: string;
  id?: string;
};

interface iTagsFieldProps extends SelectProps<any, any> {
  id?: string;
  label?: string;
  placeholder?: string;
  options?: Record<string, string | number>[];
  errors?: string[];
  uniqValues?: boolean;
  value?: Record<string, string | number>[];
  className?: string;
  labelKey?: string[];
  valueKey?: string[];
}

export const TagsField: FC<iTagsFieldProps> = ({
  options = [],
  label = "",
  errors = [],
  placeholder = "",
  uniqValues = true,
  value,
  id = "",
  className = "",
  labelKey = ["name"],
  valueKey = ["id"],
  ...props
}) => {
  function getOption(item: Record<string, string>, keys: string[]) {
    return keys.map(key => item[key]).join(" ");
  }

  return (
    <div className={`TagsField ${className} ${!!errors?.length ? "error" : ""}`}>
      {label && <label className="TagsField-label label">{label}</label>}
      <Select
        {...props}
        value={value}
        id={id}
        isMulti
        options={options}
        className="TagsField-select"
        classNamePrefix="TagsField-select"
        placeholder={placeholder}
        getOptionValue={item => getOption(item, valueKey)}
        getOptionLabel={item => getOption(item, labelKey)}
        components={{
          NoOptionsMessage: props => (
            <components.NoOptionsMessage {...props}>
              <span>No results found.</span>
            </components.NoOptionsMessage>
          )
        }}
      />

      {errors.map((error, index) => (
        <p key={index} className="TagsField-error-message">
          {error}
        </p>
      ))}
    </div>
  );
};
