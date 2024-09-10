'use client'

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
    return (
        <div className="z-50">
            <label className="
                block
                text-sm
                font-medium
                leading-6
                text-gray-900
            ">
                {label}
            </label>
            <div className="mt-2">
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
                        })
                    }}
                    classNames={{
                        control: () => 'text-base'
                    }}
                    required={required}
                    menuPlacement="auto"
                />
            </div>
        </div>
    )
}

export default Select