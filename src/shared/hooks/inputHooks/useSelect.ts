import { ChangeEvent, useEffect, useState } from 'react';

type tOptions = { id?: any };
export interface iUseSelectProps<T extends tOptions> {
	value?: string;
	options?: Array<T>;
	onChangeCallback?: (e: ChangeEvent<HTMLSelectElement>, v?: T) => void;
	isRequired?: boolean;
	placeholder?: string;
	targetKeys?: { value: string; label: string };
	emptyErrText?: string;
}

export const useSelect = <T extends tOptions>(props?: iUseSelectProps<T>) => {
	const defaultRequired = false;

	const [value, setValue] = useState(props?.value || '');
	const [selected, setSelected] = useState<T>();
	const [isValid, setIsValid] = useState(
		props?.isRequired !== undefined ? !props.isRequired : !defaultRequired
	);
	const [isDirty, setIsDirty] = useState(!!props?.value);
	const [isRequired, setIsRequired] = useState(
		props?.isRequired !== undefined ? props.isRequired : defaultRequired
	);
	const [canSelectEmpty, setCanSelectEmpty] = useState(
		props?.isRequired !== undefined ? !props.isRequired : !defaultRequired
	);

	const [options, setOptions] = useState<Array<T> | undefined>(props?.options);
	const [errors, setErrors] = useState<string[]>([]);

	const emptyErr = props?.emptyErrText ? props?.emptyErrText : "This field can't be empty";

	useEffect(() => {
		if (!!value) {
			const selectedValue = options?.find(
				(item) => getNestedProp(item, props?.targetKeys?.value || 'value') === value
			);
			setSelected(selectedValue);
		}
	}, [options]); // eslint-disable-line

	// const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
	// 	e.preventDefault();

	// 	const selectedValue = options?.find(
	// 		(item) => getNestedProp(item, props?.targetKeys?.value || 'value') === e.target.value
	// 	);

	// 	setValue(e.target.value);
	// 	setSelected(selectedValue);
	// 	checkValidity(e.target.value);
	// 	!isDirty && setIsDirty(true);
	// 	props?.onChangeCallback?.(e, selectedValue);
	// };
	const onChange = (el: any) => {
		const selectedValue = options?.find(
			(item) => getNestedProp(item, props?.targetKeys?.value || 'value') === el.value
		);
		setValue(el.value);
		setSelected(selectedValue);
		checkValidity(el.value);
		!isDirty && setIsDirty(true);
		props?.onChangeCallback?.(el, selectedValue);
	};

	const updateValue = (v: string) => {
		setValue(v);
		setIsDirty(true);
		setIsValid(!!v);
	};

	const checkValidity = (val?: string) => {
		const newVal = val === undefined ? value : val;
		const customErrors = errors.filter((err) => err !== emptyErr);
		const newErrors: string[] = [];

		if (!isRequired && !newVal?.length) {
			setErrors(customErrors);
			setIsValid(true);
			return true;
		}

		if (isRequired && !newVal?.length) newErrors.push(emptyErr);

		setErrors(newErrors);
		setIsValid(!newErrors?.length);
		return !newErrors?.length;
	};

	const clearAll = () => {
		setValue('');
		setSelected(undefined);
	};

	return {
		value,
		setValue: updateValue,

		isValid,
		setIsValid,

		isDirty,
		setIsDirty,

		isRequired,
		setIsRequired,

		canSelectEmpty,
		setCanSelectEmpty,

		options,
		setOptions,

		checkValidity,

		errors,
		setErrors,

		selected,
		setSelected,

		onChange,
		clearAll,

		inputProps: {
			value,
			onChange,
			options: options
				? prepareOptionsForSelect(options, props?.targetKeys || defaultTargetKeys)
				: [{ id: 1, ...defaultTargetKeys }],
			canSelectEmpty: !isRequired
		}
	};
};

const defaultTargetKeys = { value: 'value', label: 'label' };

function prepareOptionsForSelect<T extends tOptions>(
	data: Array<T>,
	targetKeys: iUseSelectProps<T>['targetKeys']
) {
	const inputOptions: Array<{ id: number; value: string; label: string }> = [];
	data.forEach((item, i) =>
		inputOptions.push({
			id: item?.id || i,
			value: getNestedProp(item, targetKeys?.value as string),
			label: getNestedProp(item, targetKeys?.label as string)
		})
	);
	return inputOptions;
}

function getNestedProp<T>(data: T, path: string) {
	if (typeof data === 'string') return data;

	const pathArr = path.split('.') as Array<keyof T>;
	let curKey: any;

	for (let i = 0; i < pathArr.length; i++) {
		const curLevelObj = i === 0 ? data : curKey;

		if (typeof curLevelObj === 'object' && curLevelObj.hasOwnProperty(pathArr[i]))
			curKey = curLevelObj[pathArr[i]];
		else return null;
	}
	return curKey?.toString();
}

/* How to use

const HowToUseSelect = () => {
  const sOpt = [
    {
      id: 1,
      val: "one",
      deep: {
        one: "deep one"
      }
    },
    {
      id: 2,
      val: "two",
      deep: {
        one: "deep two"
      }
    },
    {
      id: 3,
      val: "three",
      deep: {
        one: "deep three"
      }
    }
  ];

  const formData = {
    // state: useSelect({options: ["one", "two", "three"]})
    state: useSelect({
      options: sOpt,
      isRequired: true,
      targetKeys: {value: "val", label: "deep.one"},
      placeholder: "Select ..."
    })
    // state: useSelect({options: sOpt, isRequired: true, emptyErrText: "Err select message"})
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("notValid", notValidForm(formData));

    if (notValidForm(formData)) return;

    console.log("selected", formData.state.selected);
    console.log("selected value", formData.state.value);
  };

  return (
    <form onSubmit={onSubmit} style={{padding: "5em"}}>
      <Select
        {...formData.state.inputProps}
        label="State"
        errors={formData.state.errors}
        canSelectEmpty={true}
      />

      <button type="submit" style={{padding: "1em 3em", backgroundColor: "cyan"}}>
        submit
      </button>
    </form>
    // <Select
    //   {...formData.state.inputProps}
    //   label="State"
    //   targetKeys={{value: "deep.one", label: "deep.one"}} //get nested value
    // />
  );
};

*/
