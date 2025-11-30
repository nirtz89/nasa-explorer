
export interface ImageLink {
    href: string;
    rel: string;
    render: string;
    width?: number;
    size?: number;
    height?: number;
}

export interface ImageData {
    center?: string;
    date_created?: string;
    description?: string;
    description_508?: string;
    keywords?: string[];
    media_type?: string;
    nasa_id?: string;
    title?: string;
    photographer?: string;
    location?: string;
    album?: string[];
    secondary_creator?: string;
}

export interface CollectionItem {
    score?: number;
    href: string;
    data: ImageData[];
    links: ImageLink[];
}

export interface CollectionMetadata {
    total_hits: number;
}

export interface PaginationLink {
    rel: string;
    prompt: string;
    href: string;
}

export interface NASACollection {
    version: string;
    href: string;
    items: CollectionItem[];
    metadata: CollectionMetadata;
    links?: PaginationLink[];
}

export interface SearchResponse {
    collection: NASACollection;
}