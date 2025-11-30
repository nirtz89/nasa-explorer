import React from 'react';
import { Badge } from './ui/badge';

interface ConfidenceBadgeProps {
  score: number;
}

const ConfidenceBadge: React.FC<ConfidenceBadgeProps> = ({ score }) => {
  const color =
    score > 85 ? 'bg-green-700' :
      score > 70 ? 'bg-yellow-600' :
        score > 50 ? 'bg-orange-600' :
          'bg-red-700';

  return (
    <Badge variant="outline" className={`absolute top-2 right-2 ${color} text-white border-none`}>
      {score}%
    </Badge>
  );
};

export default ConfidenceBadge;
