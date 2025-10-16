import { type FC } from "react";
import { Button } from "./ui";
import { KeyIcon } from "@heroicons/react/16/solid";




const LoginActionButtonSection: FC<{
    disableActionBtn?: boolean;
    onContinue: () => void;
}> = ({
    onContinue
}) => {
        return (<>

            <Button
            className={`  $   ? "bg-black text-white hover:opacity-90"
                                    : "bg-gray-200 text-gray-400 cursor-not-allowed"`}
                onClick={onContinue}
            >
                Continue
            </Button>
            <div className="relative mb-6 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative bg-white px-4 text-sm text-gray-500">OR</div>
            </div>
            <Button
                className="bg-gray-200 hover:bg-gray-300"
            >
                <div className="flex items-center justify-center gap-2 text-black">
                    <KeyIcon className='size-6' />
                    Sign in with passkey
                </div>
            </Button>

        </>);
    }
export default LoginActionButtonSection;