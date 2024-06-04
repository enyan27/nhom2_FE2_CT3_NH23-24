import { Button } from "@/components/ui/button";
import { NotebookText } from "lucide-react";
import Link from "next/link";
import Image from "next/image"

type Props = {
    title: string;
    description: string;
};

export const UnitBanner = ({
    title,
    description,
}: Props) => {
    return (
        <div className="w-full rounded-xl bg-green-500 p-5 text-white flex items-center justify-between">
            <div className="space-y-2.5">
                <h3 className="text-2xl font-bold">{title}</h3>
                <p className="text-lg">
                    {description}
                </p>
            </div>
            <Link href="/lesson">
                <Button
                    size="lg"
                    variant="secondary"
                    className="hidden xl:flex border-2 border-b-4 active:border-b-2"
                >
                    <NotebookText className="mr-2" />
                    Continue
                </Button>
            </Link>

            <Image
                src="/gym.gif"
                height={200}
                width={200}
                alt="logo"
                className="hidden lg:block absolute left-[0px] top-[250px]"
            />

            <Image
                src="/gym.gif"
                height={160}
                width={160}
                alt="logo"
                className="block lg:hidden absolute left-[-20px] top-[270px]"
            />

            <Image
                src="/patin.gif"
                height={200}
                width={200}
                alt="logo"
                className="hidden lg:block absolute right-[50px] top-[450px] z-[-1]"
            />

            <Image
                src="/patin.gif"
                height={160}
                width={160}
                alt="logo"
                className="block lg:hidden absolute right-[0px] top-[470px] z-[-1]"
            />
        </div>
    );
};