'use client'

import { useEffect, useState } from 'react';
import ReactSelect from 'react-select';

interface SelectProps {
    disabled?: boolean
    label: string
    value?: Record<string, any>
    onChange: (value: Record<string, any>) => void
    options?: Record<string, any>[]
    multi?: boolean
    required?: boolean
}

const Select: React.FC<SelectProps> = ({
    disabled,
    label,
    value,
    onChange,
    options,
    multi,
    required
}) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <div className="z-50">
            <label className="
                mb-3 block text-lg font-medium text-black
            ">
                {label}
            </label>
            <div className="mt-2">
                {isClient && (
                    <ReactSelect
                        isDisabled={disabled}
                        value={value}
                        onChange={onChange}
                        isMulti={multi}
                        options={options}
                        menuPortalTarget={document.body}
                        styles={{
                            menuPortal: (base) => ({
                                ...base,
                                zIndex: 9999
                            }),
                            menu: (provided) => ({
                                ...provided,
                                zIndex: 9999
                            }),
                            control: (provided) => ({
                                ...provided,
                                borderRadius: '0.5rem',
                                borderColor: '#e0e0e0',
                                paddingTop: "0.5rem",
                                paddingBottom: "0.5rem"
                            })
                        }}
                        classNames={{
                            control: () => 'text-base'
                        }}
                        required={required}
                        menuPlacement="auto"
                        placeholder="Selecione uma opção..."
                    />
                )}
            </div>
        </div>
    )
}

export default Select