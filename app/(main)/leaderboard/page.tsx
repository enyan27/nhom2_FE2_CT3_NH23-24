import { FeedWrapper } from "@/components/feed-wrapper";
import { Promo } from "@/components/promo";
import { Quests } from "@/components/quests";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { UserProgress } from "@/components/user-progress";
import { getTopTenUsers, getUserProgress, getUserSubscription } from "@/db/queries";
import Image from "next/image";
import { redirect } from "next/navigation";

const LeaderboardPage = async () => {
    const userProgressData = getUserProgress();
    const userSubscriptionData = getUserSubscription();
    const leaderboardData = getTopTenUsers();

    const [
        userProgress,
        userSubscription,
        leaderboard,
    ] = await Promise.all([
        userProgressData,
        userSubscriptionData,
        leaderboardData,
    ]);

    if (!userProgress || !userProgress.activeCourse) {
        redirect("/courses");
    };

    const isPro = !!userSubscription?.isActive;

    const getTopImageSrc = (index: number) => {
        switch (index) {
            case 0:
                return "/top_1.svg";
            case 1:
                return "/top_2.svg";
            case 2:
                return "/top_3.svg";
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <StickyWrapper>
                <UserProgress
                    activeCourse={userProgress.activeCourse}
                    hearts={userProgress.hearts}
                    points={userProgress.points}
                    hasActiveSubscription={isPro}
                />
                {!isPro && (
                    <Promo />
                )}

                <Quests points={userProgress.points} />

            </StickyWrapper>
            <FeedWrapper>
                <div className="w-full flex flex-col items-center">
                    <Image
                        src="/leaderboard.svg"
                        alt="Leaderboard"
                        height={90}
                        width={90}
                    />
                    <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
                        Bảng Xếp Hạng
                    </h1>
                    <p className="text-muted-foreground text-center text-lg mb-6">
                        Vượt qua mọi người và trở thành người dẫn đầu!
                    </p>
                    <Separator className="mb-4 h-0.5 rounded-full" />
                    {leaderboard.map((userProgress, index) => {
                        const topImageSrc = getTopImageSrc(index);
                        return (
                            <div
                                key={userProgress.userId}
                                className="flex items-center w-full p-2 px-4 rounded-xl hover:bg-gray-200/50"
                            >
                                {topImageSrc ? (
                                    <Image
                                        src={topImageSrc}
                                        alt={`Top ${index + 1}`}
                                        height={32}
                                        width={32}
                                        className="mr-4"
                                    />
                                ) : (
                                    <p className="font-bold text-lime-700 mr-4 text-xl">{index + 1}</p>
                                )}
                                <Avatar
                                    className="border bg-green-500 h-12 w-12 ml-3 mr-6"
                                >
                                    <AvatarImage
                                        className="object-cover"
                                        src={userProgress.userImageSrc}
                                    />
                                </Avatar>
                                <p className="font-bold text-neutral-800 flex-1">
                                    {userProgress.userName}
                                </p>
                                <p className="text-muted-foreground">
                                    {userProgress.points} XP
                                </p>
                            </div>
                        );
                    })}
                </div>
            </FeedWrapper>
        </div>
    );
}

export default LeaderboardPage;
