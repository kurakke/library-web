import { Header } from "~/ui/components/Header";

type User = {
    id: string;
};

export type Props = {
    user: User;
    user2: User;
};

export const RootPage = (props: Props) => {
    console.log(props);
    return (
        <div className="bg-brand-green-light max-w-sm min-h-screen mx-auto flex flex-col  items-center">
            <Header />
            <h1 className="mb-16  text-5xl font-bold">コン研 - 図書館アプリ</h1>
            <p className="mb-28 text-white text-sm lg:text-lg">XXXX</p>
        </div>
    );
};
