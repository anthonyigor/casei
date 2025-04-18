import { FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
    id: string;
    label: string;
    required?: boolean
    register: UseFormRegister<FieldValues>
    placeholder?: string;
    onChange?: (e: any) => void;
    value?: any;
    maxLenght?: number
}

const TextAreaInput: React.FC<InputProps>  = ({ id, label, register, required, placeholder, onChange, value, maxLenght }) => {
    return (
        <div className="mb-5">
            <label className="mb-3 block text-lg font-medium text-black" htmlFor={id}>
                {label}
                {required && <span className="text-red-500">*</span>}
            </label>
            <div className="mt-1">
                <textarea 
                    id={id}
                    value={value}
                    autoComplete={id}
                    maxLength={maxLenght}
                    placeholder={placeholder}
                    {...register(id, { required })}
                    onChange={onChange}
                    className="
                        w-full
                        rounded-md
                        border 
                        border-[#e0e0e0]
                        bg-white 
                       py-3 
                       px-4 
                       text-base 
                       font-medium
                       h-32
                       text-gray-600 
                       outline-none 
                       focus:border-violet-600 
                       focus:shadow-md"
                />
            </div>
        </div>
    )
}

export default TextAreaInput