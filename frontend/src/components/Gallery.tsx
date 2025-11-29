import React from 'react';
import { BentoGrid, BentoGridItem } from './ui/bento-grid';
import data from '../assets/data/mock_data.json';

const Gallery: React.FC = () => {
  const items = data.collection.items;

  // Get thumbnail image URL from links array
  const getThumbnail = (item: typeof items[0]) => {
    const thumbnailLink = item.links?.find(link => link.rel === 'preview');
    return thumbnailLink?.href || '';
  };
  
  // Get title and description from data array
  const getItemData = (item: typeof items[0]) => {
    const itemData = item.data?.[0];
    return {
      title: itemData?.title || 'Untitled',
      description: itemData?.description || 'No description available.'
    };
  };
  
  return (
    <BentoGrid className="-mt-[250px]">
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
                <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden">
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
  );
};

export default Gallery;
