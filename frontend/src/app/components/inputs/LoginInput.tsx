import clsx from "clsx";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
    id: string;
    label: string;
    type: string;
    required?: string
    register: UseFormRegister<FieldValues>
    disabled?: boolean;
}

const Input: React.FC<InputProps>  = ({ id, label, type, register, required, disabled }) => {
    return (
        <div>
            <label className="block text-sm font-semibold leading-6 text-teal-600" htmlFor={id}>
                {label}
            </label>
            <div className="mt-1">
                <input 
                    id={id}
                    type={type}
                    autoComplete={id}
                    disabled={disabled}
                    {...register(id, { required })}
                    className={clsx(`
                        bg-slate-100
                        text-slate-600
                        form-input
                        block
                        w-full
                        rounded-md
                        border-0
                        py-1.5
                        px-1.5
                        shadow-sm
                        ring-1
                        ring-inset
                        ring-gray-300
                        placeholder:text-gray-400
                        focus:ring-0
                        focus:ring-teal-400
                        sm:text-sm
                        sm:leading-6`,
                        disabled && 'opacity-50 cursor-default'
                    )}
                />
            </div>
        </div>
    )
}

export default Input