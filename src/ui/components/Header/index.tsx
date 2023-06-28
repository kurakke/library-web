import Link from "next/link";
import { PAGE_PATH } from "~/features/application/constants/page";
import classNames from "classnames";

export type Props = {
    className?: string;
    disableCtrls?: boolean;
};

export const Header = ({ className, disableCtrls }: Props) => {
    return (
        <div
            className={classNames(
                "flex justify-between items-center w-full px-20 h-60 bg-white",
                className
            )}
        >
            <Link href={PAGE_PATH.Root}>
                <a className="z-10">
                    <h1 className="text-lg font-black">コン研‐図書館</h1>
                </a>
            </Link>
            {!disableCtrls && (
                <Link href={PAGE_PATH.SignIn}>
                    <a className="z-10 px-16 py-6 rounded lib-pointer bg-brand-green text-white text-xs font-black">
                        ログイン
                    </a>
                </Link>
            )}
        </div>
    );
};
