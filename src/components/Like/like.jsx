import '../Like/Like.css';
import { Trash2, Heart } from 'lucide-react';

function Like({ item, onLikeClick, likedCards = [] }) {
  if (!item) return null;
  return (
    <>
      <Heart
        className={`${likedCards.includes(item._id) ? 'like__liked' : 'like__no-like'}`}
        onClick={() => onLikeClick(item)}
      />
    </>
  );
}

export default Like;
