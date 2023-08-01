"use client";

import { AiFillShop as Logo } from "react-icons/ai";
import { FiMenu as Menu } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { BsFillPersonFill as Profile } from "react-icons/bs";
import { BiSolidLogIn as SignIn, BiLogOut as SignOut, BiSolidAddToQueue as SignUp } from "react-icons/bi";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AuthDialog } from "./auth-dialog";

const Nav: React.FC = () => {
    return (
        <nav className="flex justify-between border-b items-center h-16 bg-white text-black relative">
            <div className="flex gap-2 items-center px-4">
                <div className="flex gap-4 pr-2">
                    <Menu className="h-6 w-6 text-zinc-800" />
                    <Logo className="h-6 w-6 text-zinc-800" />
                </div>
                <Input className="flex-grow rounded" placeholder="Search..." />
                <AuthDialog />
                {/* <Auth /> */}
            </div>
        </nav>
    );
};

export default Nav;
