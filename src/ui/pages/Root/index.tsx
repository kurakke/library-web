import {Book} from "~/ui/components/Book/index"
import {DefaultLayout} from "~/ui/layouts/Default";
import {getBookList} from "~/features/book/usecases/getBookList";
import {Hero} from "~/ui/pages/Root/_hero";
import {Heading2} from "~/ui/components/Heading2";
import {PAGE_PATH} from "~/features/application/constants/page";
import {useEffect,useRef} from 'react';
import {SearchInput} from "~/ui/components/SearchInput";
import {useRouter} from "next/router";

type User = {
    id: string;
};

export type Props = {
    user: User;
    user2: User;
};

export const RootPage = (props: Props) => {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                console.log(entry);
            }
        })
        if(ref.current === null) {
            return;
        }
        //useRefで参照したdivタグを監視対象に追加する
        observer.observe(ref.current);
        const { current } = ref;
        return () => {
            observer.unobserve(current);
        };
    },[]);


    const router = useRouter()
    const handleSearch = (result: string) => {
        router.push({
            pathname: PAGE_PATH.Books,
            query: {
                keyword: result
            }
        })
    }

    const bookList = getBookList();
    return (
        <DefaultLayout>
            <Hero/>
            <Heading2 className="mt-40 px-16">検索して本を探す</Heading2>
            <div className="w-full px-16">
                <SearchInput onSearch={handleSearch}/>
                <Heading2 className="mt-32">本を一覧で見る</Heading2>
                {
                    bookList.list.map((book) =>
                        <li key={book.id}><Book book={book}/></li>
                    )

                }
            <div ref={ref}></div>
            </div>
        </DefaultLayout>
    );
};
