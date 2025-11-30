import json
import os
from typing import Dict, List

class SpaceDB:
    def __init__(self):
        # Load and parse the JSON data
        data_path = os.path.join(os.path.dirname(__file__), "mock_data.json")
        with open(data_path, "r", encoding="utf-8") as f:
            json_data = json.load(f)
        
        # Store raw items for direct access
        self._raw_items = json_data.get("collection", {}).get("items", [])
        self._sources = None  # Lazy load when needed
        self._next_id = None

    def get_all_sources(self) -> List[Dict]:
        """Get all space sources."""
        if self._sources is None:
            self._sources = []
            for idx, item in enumerate(self._raw_items, start=1):
                data = item.get("data", [{}])[0]
                links = item.get("links", [])
                image_url = None
                for link in links:
                    if link.get("render") == "image":
                        image_url = link.get("href")
                        break
                self._sources.append(
                    {
                        "id": idx,
                        "name": data.get("title", f"NASA Item {idx}"),
                        "type": data.get("media_type", "unknown"),
                        "launch_date": data.get("date_created", ""),
                        "description": data.get("description", ""),
                        "image_url": image_url,
                        "status": "Active",
                    }
                )
            self._next_id = len(self._sources) + 1
        return self._sources

    def get_all_sources_raw(self, search_term: str = None) -> List[Dict]:
        """Get all raw source items from mock data without transformation."""
        if not search_term:
            return self._raw_items

        terms = search_term.lower().split()
        if not terms:
            return self._raw_items

        scored_items = []
        for item in self._raw_items:
            data = item.get("data", [{}])[0]
            title = data.get("title", "").lower()
            description = data.get("description", "").lower()
            
            current_score = 0
            for term in terms:
                if term in title:
                    current_score += 10
                elif term in description:
                    current_score += 2
            
            if current_score > 0:
                # Normalize to 0-100
                # Maximum possible points is if all terms are in the title (10 pts each)
                max_possible = len(terms) * 10
                normalized_score = (current_score / max_possible) * 100
                
                # Create a shallow copy to avoid modifying the original item in storage
                item_with_score = item.copy()
                item_with_score["score"] = round(normalized_score, 1)
                scored_items.append(item_with_score)
                
        # Sort by score descending
        scored_items.sort(key=lambda x: x["score"], reverse=True)
        
        return scored_items
