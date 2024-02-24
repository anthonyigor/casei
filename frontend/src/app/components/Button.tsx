'use client'

import clsx from "clsx"

interface ButtonProps {
    type?: 'button' | 'submit' | 'reset' | undefined
    children: React.ReactNode
    fullWidth: boolean
    onClick?: () => void
    disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({ type, children, fullWidth, onClick, disabled }) => {
    return (
        <button id="button-form"
            onClick={onClick}
            type={type}
            disabled={disabled}
            className={clsx(`
              bg-red-400
                hover:bg-red-500
                flex
                justify-center
                rounded-md
                px-3
                py-2
                text-sm
                font-semibold
                focus-visible:outline
                focus-visible: outline-2
                focus-visible: outline-offset-2`,
                disabled && 'opacity-50 cursor-default',
                fullWidth && 'w-full'
                )}
        >
            {children}
        </button>
    )
}

export default Button;