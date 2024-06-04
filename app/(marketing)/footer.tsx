import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
    return (
        <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2 ">
            <div className="max-w-screen-lg mx-auto flex items-center justify-center h-full">
                <Link href="/">
                    <Button size="lg" variant="ghost" className="w-full">
                        <Image
                            src="/en.svg"
                            alt="enlish"
                            height={24}
                            width={24}
                            className="mr-4 rounded -md"
                        />
                        English
                    </Button>
                </Link>

                <Link href="/">
                    <Button size="lg" variant="ghost" className="w-full">
                        <Image
                            src="/jp.svg"
                            alt="japanese"
                            height={24}
                            width={24}
                            className="mr-4 rounded -md"
                        />
                        Japanese
                    </Button>
                </Link>


                {/* <p className="py-4 text-center">
                    Made with <span className="text-red-500">&#10084;</span> by えにゃん
                </p> */}
            </div>
        </footer>
    );
};