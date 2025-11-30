import React, { useState } from 'react';
import { BentoGrid, BentoGridItem, BentoGridLightBox } from './ui/bento-grid';
import data from '../assets/data/mock_data.json';

interface ImageData {
  url: string;
  thumbnail: string;
  width?: number;
  height?: number;
  title?: string;
  description?: string;
}

const items = data.collection.items.sort(() => Math.random() - 0.5);

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);

  const getThumbnail = (item: typeof items[0]) => {
    const thumbnailLink = item.links?.find(link => link.rel === 'preview');
    return thumbnailLink?.href || '';
  };

  const getFullSizeImage = (item: typeof items[0]): ImageData | null => {
    // Try to get large image first, then medium, then fallback to thumbnail
    const largeImage = item.links?.find(link => link.rel === 'alternate' && link.href?.includes('~large'));
    const mediumImage = item.links?.find(link => link.rel === 'alternate' && link.href?.includes('~medium'));
    const thumbnail = item.links?.find(link => link.rel === 'preview');

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

  const getItemData = (item: typeof items[0]) => {
    const itemData = item.data?.[0];
    return {
      title: itemData?.title || 'Untitled',
      description: itemData?.description || 'No description available.'
    };
  };

  return (
    <>
      <BentoGrid className="mt-[150px] pb-10">
        {items.map((item, index) => {
          const thumbnail = getThumbnail(item);
          const { title, description } = getItemData(item);
          const truncatedDescription = description.length > 150
            ? description.substring(0, 150) + '...'
            : description;
          const truncatedTitle = title.length > 20
            ? title.substring(0, 20) + '...'
            : title;

          // Pattern: first item and every 5th item spans 2 columns for visual variety
          const shouldSpanTwo = index === 0 || index % 5 === 0;

          return (
            <BentoGridItem
              key={item.href || index}
              title={truncatedTitle}
              description={truncatedDescription}
              header={
                thumbnail ? (
                  <div
                    className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden cursor-pointer transition-opacity hover:opacity-90"
                    onClick={() => {
                      const imageData = getFullSizeImage(item);
                      if (imageData) {
                        setSelectedImage(imageData);
                      }
                    }}
                  >
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
              className={shouldSpanTwo ? "md:col-span-2" : ""}
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

export default Gallery;
