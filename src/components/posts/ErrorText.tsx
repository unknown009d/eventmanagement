import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}
export default function ErrorText({ children }: Props) {
    return (
        <div className="w-full text-center opacity-50 mt-5 text-sm flex py-5 items-center">
            <div className="flex-grow border-t border-gray-400"></div>
            <div className="flex-shrink mx-2">
                {children}
            </div>
            <div className="flex-grow border-t border-gray-400"></div>
        </div>
    )
}
