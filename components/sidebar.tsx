import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { SidebarItem } from "./sidebar-item";
import {
    ClerkLoading,
    ClerkLoaded,
    UserButton
} from "@clerk/nextjs";

import { Loader } from "lucide-react";
import { Button } from "./ui/button";

type Props = {
    className?: string;
};

export const Sidebar = ({ className }: Props) => {
    return (
        <div className={cn(
            "flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col",
            className,
        )}>
            <Link href="/learn">
                <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
                    {/* <Image src="/mascot.svg" height={40} width={40} alt="Mascot" /> */}
                    <h1 className="text-3xl font-extrabold text-green-600 tracking-wide">
                        duolingo
                    </h1>
                </div>
            </Link>
            <div className="flex flex-col gap-y-2 flex-1">
                <SidebarItem
                    label="trang chủ"
                    href="/learn"
                    iconSrc="/learn.svg"
                />
                <SidebarItem
                    label="bảng xếp hạng"
                    href="/leaderboard"
                    iconSrc="/leaderboard.svg"
                />
                <SidebarItem
                    label="nhiệm vụ"
                    href="/quests"
                    iconSrc="/quests.svg"
                />
                <SidebarItem
                    label="cửa hàng"
                    href="/shop"
                    iconSrc="/shop.svg"
                />
            </div>
            
            {/* <div className="flex flex-col gap-y-2 flex-1 justify-end pb-4 items-center">
                <Link href="https://github.com/enyan27" target="_blank" passHref>
                    <Button size="lg" variant="ghost" className="w-full">
                        <Image
                            src="/github.svg"
                            alt="Github"
                            height={28}
                            width={28}
                            className="mr-4 rounded -md"
                        />
                        えにゃん
                    </Button>
                </Link>
                <Link href="https://www.linkedin.com/in/enyan27/" target="_blank" passHref>
                    <Button size="lg" variant="ghost" className="w-full">
                        <Image
                            src="/linkedIn.png"
                            alt="LinkedIn"
                            height={43}
                            width={43}
                            className="mr-4 rounded -md"
                        />
                        enyan27
                    </Button>
                </Link>
                <Link href="https://www.instagram.com/enyan27/" target="_blank" passHref>
                    <Button size="lg" variant="ghost" className="w-full">
                        <Image
                            src="/igLogo.svg"
                            alt="Instagram"
                            height={40}
                            width={40}
                            className="mr-4 rounded -md"
                        />
                        enyan27
                    </Button>
                </Link>
            </div> */}

            {/* <p className="py-4 text-center">
                Made with <span className="text-red-500">&#10084;</span> by えにゃん
            </p> */}

            <div className="p-4">
                <ClerkLoading>
                    <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
                </ClerkLoading>
                <ClerkLoaded>
                    <UserButton afterSignOutUrl="/" />
                </ClerkLoaded>
            </div>
        </div>
    );
};