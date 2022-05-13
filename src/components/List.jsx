import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { set, ref, onValue, remove, update } from 'firebase/database';
import { RiDeleteBin2Line } from 'react-icons/ri';

const List = ({
  setCategory,
  setName,
  setOptions,
  menus,
  setMenus,
  setUpdateMenu,
  setTempUUID,
}) => {
  const [search, setSearch] = useState('');
  const [filteredMenus, setFilteredMenus] = useState([]);
  //read
  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      setMenus([]);
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((menus) => {
          setMenus((oldMenu) => [...oldMenu, menus]);
          setFilteredMenus(menus);
        });
      }
    });
  }, []);

  useEffect(() => {
    if (search == '') {
      setFilteredMenus(menus);
    } else {
      setFilteredMenus(
        menus.filter((menu) => {
          return menu.category.toLowerCase().includes(search.toLowerCase());
        })
      );
    }
  }, [search, menus]);

  //delete
  const handleDelete = (menus) => {
    remove(ref(db, `/${menus.uuid}`));
  };

  //update
  const handleUpdate = (menus) => {
    setUpdateMenu('update');
    setCategory(menus.category);
    setName(menus.name);
    setOptions(menus.options);
    setTempUUID(menus.uuid);
  };

  return (
    <div className='flex bg-[#5C8D89] flex-col h-screen'>
      <div className='overflow-y-auto overflow-x-hidden'>
        <div className='sticky top-0 bg-[#74B49B] p-10'>
          <h1 className='text-center'>Menu List</h1>
          <div className='flex justify-end'>
            <input
              type='text'
              placeholder='category search'
              className='w-52'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className='pt-10 w-full'>
          <div className='products__container max-w-7xl flex flex-grow-[1] flex-wrap items-center justify-center gap-4 '>
            {filteredMenus.length > 0 &&
              filteredMenus.map((menu) => (
                <div key={menu.id} className='card'>
                  <div>
                    <h2>{menu.category}</h2>
                  </div>{' '}
                  <div>{menu.name}</div>
                  <table>
                    <thead>
                      <tr>
                        <th>name</th>
                        <th>price</th>
                        <th>cost</th>
                        <th>quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {menu.options.map((opt) => (
                        <tr key={opt.id}>
                          <td>{opt.optionName}</td>
                          <td>{opt.price}</td>
                          <td>{opt.cost}</td>
                          <td>{opt.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className='h-36 flex items-end justify-end'>
                    <div>
                      <button
                        className='bg-[#74B49B]'
                        onClick={() => handleUpdate(menu)}
                      >
                        edit
                      </button>
                      <button
                        className='bg-red-500 px-2 py-1.5'
                        onClick={() => handleDelete(menu)}
                      >
                        <RiDeleteBin2Line />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
