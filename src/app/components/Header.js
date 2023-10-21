import React from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useRouter } from 'next/navigation'

export const Header = ({ search }) => {
    const router = useRouter()

    return (
        <header className="w-full flex justify-between h-20 items-center border-b p-4 border-[#202229]">
        <div className=" w-1/3 p-10   ">
            <img
            width={120}
            src={"https://logodix.com/logo/1062846.png"}
            alt="YouTube Logo"
            />
        </div>
        <div className=" w-1/3 flex justify-center items-center">
            {search ? (
            <input
                type="text"
                onChange={(e) => search(e.target.value)}
                placeholder="Type to search"
                className=" border-0 bg-transparent focus:outline-none text-white"
            />
            ) : null}
        </div>
        <div className=" w-1/3 flex justify-end">
            <AiOutlinePlusCircle
            onClick={() => router.push("/upload")}
            size="30px"
            className="mr-8 fill-whiteIcons dark:fill-white cursor-pointer"
            />
        </div>
        </header>
    );
};
