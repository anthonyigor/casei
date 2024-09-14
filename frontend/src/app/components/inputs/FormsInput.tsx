import { FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
    id: string;
    label: string;
    type: string;
    required?: boolean
    register: UseFormRegister<FieldValues>
    placeholder?: string;
    onChange?: (e: any) => void;
    value?: string;
}

const FormsInput: React.FC<InputProps>  = ({ id, label, type, register, required, placeholder, onChange, value }) => {
    return (
        <div className="mb-5">
            <label className="mb-3 block text-lg font-medium text-black" htmlFor={id}>
                {label}
                {required && <span className="text-red-500">*</span>}
            </label>
            <div className="mt-1">
                <input 
                    id={id}
                    type={type}
                    value={value}
                    autoComplete={id}
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
                       px-6 
                       text-base 
                       font-medium 
                       text-gray-600 
                       outline-none 
                       focus:border-teal-600 
                       focus:shadow-md"
                />
            </div>
        </div>
    )
}

export default FormsInput