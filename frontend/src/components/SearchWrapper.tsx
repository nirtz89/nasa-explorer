import React, { useState } from 'react';
import SearchChat from './SearchChat';
import SearchResponse from './SearchResponse';

const SearchWrapper: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');

    const onSearch = (query: string) => {
        setSearchQuery(query);
    };

    return (
        <div className="flex flex-row items-center justify-center h-screen w-full pt-[64px]">
            <SearchChat onSearch={onSearch} />
            <div className="flex w-full flex-col items-center justify-start bg-white h-full border-t border-[#E9E7E1] p-8 overflow-y-auto">
                <SearchResponse query={searchQuery} />
            </div>
        </div>
    );
};

export default SearchWrapper;
