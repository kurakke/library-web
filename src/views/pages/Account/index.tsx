import { DefaultLayout } from "~/ui/layouts/Default";
import { Heading } from "~/ui/components/Heading";
import { Heading2 } from "~/ui/components/Heading2";
import { Book } from "~/ui/components/Book";
import { InferGetServerSidePropsType } from "next";
import SettingIcon from "~/assets/svgs/setting.svg";
import Image from "next/image";
import React, { useEffect, useState, MouseEvent } from "react";
import { getServerSideProps } from "~/views/pages/Account/beforeRender";
import { getLendRecord } from "~/features/user/usecases/getLendRecord";
import { useAuth } from "~/features/auth/hooks/useAuth";
import Link from "next/link";
import { Modal } from "~/ui/components/Modal";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

export const AccountPage = ({}: InferGetServerSidePropsType<
    typeof getServerSideProps
>) => {
    const [user, setUser] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const { userId, signOut } = useAuth();
    const router = useRouter();

    useEffect(() => {
        (async () => {
            const data = await getLendRecord(userId);
            setUser(data);
        })();
    }, [userId]);

    const rental = user?.lendRecords.filter((lendRecord) => {
        return lendRecord.returnedDate === null;
    });

    const returned = user?.lendRecords.filter((lendRecord) => {
        return lendRecord.returnedDate !== null;
    });

    const handleLogout = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const res = await signOut();

        if (res.success) {
            toast("ログアウトしました");
            router.push("/");
        } else {
            toast("ログアウトに失敗しました");
        }
    };

    return (
        <DefaultLayout disableCtrls>
            <div className="px-30 font-black">
                <Heading>アカウント情報</Heading>
                <div className="flex mt-32 pb-12 border-gray-light border-b">
                    <div className="w-56 h-56 rounded-full bg-expressive-red" />
                    <div className="mx-12 flex-grow text-gray-dark">
                        <div className="font-xs">
                            学籍番号:{user?.studentNumber}
                        </div>
                        <div>{user?.name}</div>
                    </div>
                    <div className="flex flex-col">
                        <button
                            className="text-expressive-red border rounded p-[2px] bg-gray-bright mb-[8px]"
                            onClick={() => setIsOpen(true)}
                        >
                            ログアウト
                        </button>
                        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
                            <div className="text-expressive-red text-[18px] font-bold">
                                本当にログアウトしますか?
                            </div>
                            <div className="flex justify-end w-full space-x-[4px]">
                                <button
                                    className="text-expressive-red border rounded p-[2px] bg-gray-bright"
                                    onClick={handleLogout}
                                >
                                    ログアウト
                                </button>
                                <button
                                    className="text-gray-dark rounded border p-[2px]"
                                    onClick={() => setIsOpen(false)}
                                >
                                    キャンセル
                                </button>
                            </div>
                        </Modal>
                        <Link href="/account/update">
                            <a className="flex items-center justify-center">
                                <Image src={SettingIcon} />
                            </a>
                        </Link>
                    </div>
                </div>
                <div className="pb-12 mt-12 border-gray-light border-b">
                    <Heading2>利用中の書籍</Heading2>
                    {rental?.map((lendRecord) => (
                        <li key={lendRecord.book.id}>
                            <Book book={lendRecord.book} />
                        </li>
                    ))}
                </div>
                <div className="mt-12">
                    <Heading2>返却済みの書籍</Heading2>
                    {returned?.map((lendRecord) => (
                        <li key={lendRecord.book.id}>
                            <Book book={lendRecord.book} />
                        </li>
                    ))}
                </div>
            </div>
        </DefaultLayout>
    );
};
