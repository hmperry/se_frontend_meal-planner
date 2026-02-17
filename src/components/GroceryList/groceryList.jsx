import { useState } from 'react';
import PageHeading from '../PageHeading/pageHeading';
import { ChevronRight, Pencil, Check } from 'lucide-react';
import './groceryList.css';

import { defaultGroceryList } from '../../utils/dummyData';

const Checkbox = ({ checked, onChange }) => {
  return (
    <div
      className={
        checked ? 'grocery__table_checkbox checked' : 'grocery__table_checkbox'
      }
      onClick={onChange}
    >
      {checked && <Check className="grocery__table__check" />}
    </div>
  );
};

function GroceryList() {
  const [groceryList, setGroceryList] = useState(defaultGroceryList);

  const handleCheckboxChange = (index) => {
    setGroceryList((prevList) =>
      prevList.map((item, i) =>
        i === index ? { ...item, checked: !item.checked } : item
      )
    );

    setTimeout(() => {
      setGroceryList((prevList) =>
        [...prevList].sort((a, b) => {
          if (a.checked === b.checked) return 0;
          return a.checked ? 1 : -1;
        })
      );
    }, 800);
  };

  return (
    <div className="grocery-list">
      <PageHeading>Grocery List</PageHeading>
      <div className="grocery-list__table_border">
        <div className="grocery-list__table">
          <div>
            <div className="grocery__table-header grocery__table-row">
              <div className="grocery__table_check-col"></div>
              <div className="grocery__table_ingred-col">Ingredient</div>
              <div className="grocery__table_amount-col">Amount</div>
              <div className="grocery__table_edit-col">Adjust</div>
            </div>
          </div>
          <div>
            {groceryList.map(({ ingredient, amount, checked }, index) => (
              <div className="grocery__table-row" key={index}>
                <div className="grocery__table_check-col">
                  <div>
                    <Checkbox
                      checked={checked}
                      onChange={() => handleCheckboxChange(index)}
                    />
                  </div>
                </div>
                <div className="grocery__table_ingred-col">{ingredient}</div>
                <div className="grocery__table_amount-col">{amount}</div>
                <div className="grocery__table_edit-col">Adjust</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroceryList;
