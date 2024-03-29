import { useState } from "react";
import { SearchInput } from "~/ui/components/SearchInput";
import { DefaultLayout } from "~/ui/layouts/Default";
import { Book } from "~/ui/components/Book";
import { PAGE_PATH } from "~/features/application/constants/page";
import { useRouter } from "next/router";
import { getServerSideProps } from "~/views/pages/Books/beforeRender";
import { InferGetServerSidePropsType } from "next";
import { Tab, DisplayStatus } from "~/ui/components/Tab";

export const BooksPage = ({
    searchResult,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const router = useRouter();
    const handleSearch = (result: string) => {
        router.push({
            pathname: PAGE_PATH.Books,
            query: {
                keyword: result,
            },
        });
    };

    const [displayStatus, setDisplayStatus] = useState<DisplayStatus>(
        DisplayStatus.All
    );
    const handleChangeTab = (result: DisplayStatus) => {
        setDisplayStatus(result);
    };

    return (
        <div>
            <DefaultLayout>
                <div className="px-16 mt-16">
                    <SearchInput onSearch={handleSearch} />
                    <div className="mt-16">
                        <Tab
                            displayStatus={displayStatus}
                            onChange={handleChangeTab}
                        />
                        {searchResult[displayStatus]?.list.length !== 0 ? (
                            searchResult[displayStatus]?.list.map((book) => (
                                <Book book={book} key={book.id} />
                            ))
                        ) : (
                            <div className="flex justify-center items-center mt-[128px] text-gray-dark font-bold text-[18px]">
                                検索結果に一致する本は見つかりませんでした
                            </div>
                        )}
                    </div>
                </div>
            </DefaultLayout>
        </div>
    );
};
