import { type FC } from "react";

type UserInput = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string;
    leftIcon?: React.ReactNode;
    children?: React.ReactNode;
}

const Button: FC<UserInput> = ({
    className,
    leftIcon,
    children,
    ...rest
}) => {


    return (<>
        <button
            className={`mb-6 w-full rounded-full bg-black px-6 py-4 text-base font-medium  transition-opacity hover:opacity-90 cursor-pointer text-white ${className}`}
            {...rest}
        >
            { children}
        </button>
        {
            leftIcon
        }
    </>);
}

export default Button;