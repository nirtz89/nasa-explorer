import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CollectionItem } from "./search.types";

const getSearch = async (searchTerm?: string): Promise<CollectionItem[]> => {
    const response = await axios.get<CollectionItem[]>(`http://localhost:8001/api/sources/raw?searchTerm=${searchTerm}`);
    // add 1 second delay before returning response (simulate slow API)
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return response.data;
};

export function useSearch(searchTerm?: string) {
    return useQuery<CollectionItem[], Error>({
        queryKey: ['search', searchTerm],
        queryFn: () => getSearch(searchTerm),
    });
}