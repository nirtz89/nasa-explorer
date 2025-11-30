import React, { useEffect, useState } from 'react';
import { BentoGrid, BentoGridItem, BentoGridLightBox } from './ui/bento-grid';
import { useSearch } from '../lib/api/useSearch';
import { CollectionItem, ImageLink } from '../lib/api/search.types';
import { Skeleton } from './ui/skeleton';
import ConfidenceBadge from './ConfidenceBadge';
import { useAppContext } from '../AppContext';
import { replaceFullHistoryInLocalStorage, formatDate } from '../lib/utils';

interface ImageData {
  url: string;
  thumbnail: string;
  width?: number;
  height?: number;
  title?: string;
  description?: string;
}

interface SearchResponseProps {
  query: string;
}

const SearchResponse: React.FC<SearchResponseProps> = ({ query }) => {
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const { data: searchData, isLoading, error } = useSearch(query);
  const { setHistory, history } = useAppContext();

  useEffect(() => {
    const formattedTimestamp = formatDate(new Date());
    const newHistory = [
      ...history,
      {
        query,
        timestamp: formattedTimestamp,
        isFavorite: false,
        numberOfResults: searchData?.length || 0
      }
    ];
    setHistory(newHistory);
    replaceFullHistoryInLocalStorage(newHistory);
  }, [query]);

  const getThumbnail = (item: CollectionItem) => {
    const thumbnailLink = item.links?.find((link: ImageLink) => link.rel === 'preview');
    return thumbnailLink?.href || '';
  };

  const getFullSizeImage = (item: CollectionItem): ImageData | null => {
    const largeImage = item.links?.find((link: ImageLink) => link.rel === 'alternate' && link.href?.includes('~large'));
    const mediumImage = item.links?.find((link: ImageLink) => link.rel === 'alternate' && link.href?.includes('~medium'));
    const thumbnail = item.links?.find((link: ImageLink) => link.rel === 'preview');

    const fullImage = largeImage || mediumImage || thumbnail;
    const thumbnailUrl = getThumbnail(item);
    const itemData = item.data?.[0];

    if (!fullImage || !thumbnailUrl) return null;

    return {
      url: fullImage.href || '',
      thumbnail: thumbnailUrl,
      width: fullImage.width,
      height: fullImage.height,
      title: itemData?.title,
      description: itemData?.description,
    };
  };

  return (
    <>
      <BentoGrid>
        {isLoading && Array.from({ length: 12 }).map((_, index) => (
          <BentoGridItem
            key={`skeleton-${index}`}
            header={<Skeleton className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gray-200 dark:bg-gray-800" />}
            title={<Skeleton className="h-4 w-2/3 bg-gray-200 dark:bg-gray-800" />}
            description={
              <div className="w-full space-y-2">
                <Skeleton className="h-3 w-full bg-gray-200 dark:bg-gray-800" />
                <Skeleton className="h-3 w-5/6 bg-gray-200 dark:bg-gray-800" />
              </div>
            }
          />
        ))}

        {!isLoading && searchData?.map((item: CollectionItem, index: number) => {
          const itemData = item.data?.[0];
          const title = itemData?.title || 'Untitled';
          const description = itemData?.description || 'No description available';
          const thumbnail = getThumbnail(item);

          return (
            <BentoGridItem
              key={itemData?.nasa_id || index}
              title={title.length > 150 ? title.substring(0, 50) + '...' : title}
              description={description.length > 150 ? description.substring(0, 150) + '...' : description}
              header={
                thumbnail ? (
                  <div
                    className="relative flex flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden cursor-pointer transition-opacity hover:opacity-90"
                    onClick={() => {
                      const imageData = getFullSizeImage(item);
                      if (imageData) {
                        setSelectedImage(imageData);
                      }
                    }}
                  >
                    <ConfidenceBadge score={item.score || 0} />
                    <img
                      src={thumbnail}
                      alt={title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-purple-500 to-blue-500" />
                )
              }
            />
          );
        })}
      </BentoGrid>
      <BentoGridLightBox
        image={selectedImage?.url}
        thumbnail={selectedImage?.thumbnail}
        width={selectedImage?.width}
        height={selectedImage?.height}
        title={selectedImage?.title}
        description={selectedImage?.description}
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </>
  );
};

export default SearchResponse;
