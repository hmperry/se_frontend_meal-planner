import { Grid, List } from 'lucide-react';
import './ViewToggle.css';

function ViewToggle({ viewType, onViewChange }) {
  return (
    <div className="view-toggle">
      <button
        className={
          viewType === 'cards'
            ? 'view-toggle__btn view-toggle__btn_active'
            : 'view-toggle__btn'
        }
        onClick={() => onViewChange('cards')}
      >
        <Grid size={20} />
      </button>
      <button
        className={
          viewType === 'list'
            ? 'view-toggle__btn view-toggle__btn_active'
            : 'view-toggle__btn'
        }
        onClick={() => onViewChange('list')}
      >
        <List size={20} />
      </button>
    </div>
  );
}

export default ViewToggle;
