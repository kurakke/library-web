import SearchIcon from "~/assets/svgs/search.svg";
import Image from "next/image";
import React, { useRef } from "react";

export type Props = {
    onSearch: (name: string) => void;
};

export const SearchInput = ({ onSearch }: Props) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        const value = inputRef.current.value;
        if (e.key === "Enter" && value.length >= 1) {
            onSearch(value);
        }
    };
    return (
        <div className="flex items-center">
            <div className="flex items-center w-full px-12 h-40 rounded-lg bg-gray-bright">
                <Image src={SearchIcon} />
                <input
                    ref={inputRef}
                    type="search"
                    name="search"
                    className="ml-12 bg-gray-bright flex-grow"
                    onKeyDown={handleKeyDown}
                    placeholder="データベース設計"
                />
            </div>
        </div>
    );
};
