import { useState, useEffect } from 'react';

function Categories(props) {
  const [categories, setCategories] = useState([{ item: 'All', style: 'active' }]);

  const onClick = (index, id) => {
    const temp: any = categories.map((item: any) => {
      return { item: item.item, id: item.id };
    });
    temp[index].style = 'active';
    setCategories(temp);
    console.log(id);
    props.onCategoryChange(id);
  };

  useEffect(() => {
    const arr = props.categories.map((item) => ({ item: item.name, id: item.id }));
    arr.unshift({ item: 'All', style: 'active' });
    setCategories(arr);
  }, [props.categories]);

  return (
    <div className='row justify-content-center'>
      <div className='col-md-10 mb-5 text-center'>
        <ul className='product-category'>
          {categories.map((item: any, index) => (
            <li key={index}>
              <div
                onClick={() => {
                  onClick(index, item.id);
                }}
                className={item.style}
              >
                {item.item}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default Categories;
