import { useState, ChangeEvent } from 'react';

export function useForm<T>(initialValues: T) {
	const [values, setValues] = useState<T>(initialValues);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setValues((prevValues) => ({
			...prevValues,
			[name]: value,
		}));
	};

	return { values, handleChange, setValues };
}
