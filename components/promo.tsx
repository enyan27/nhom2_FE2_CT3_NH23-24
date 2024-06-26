import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Promo = () => {
    return (
        <div className="border-2 rounded-xl p-4 space-y-4">
            <div className="space-y-2">
                <div className="flex items-center gap-x-2">
                    <Image
                        src="/unlimited.svg"
                        height={45}
                        width={45}
                        alt="Pro"
                    />
                    <h3 className="font-bold text-lg">Thử ngay Duolingo Pro</h3>

                    <Image
                        src="/supper-bird.svg"
                        height={70}
                        width={70}
                        alt="Super Bird"
                        className="ml-auto -mb-6"
                    />
                </div>
                <p className="text-muted-foreground" style={{ maxWidth: '300px' }}>
                    Không quảng cáo, bài luyện tập cá nhân hóa, và không giới hạn số lần chinh phục Huyền thoại!
                </p>
            </div>
            <Button asChild variant="super" className="w-full" size="lg">
                <Link href="/shop">
                    Nâng cấp ngay
                </Link>
            </Button>
        </div>
    );
};
