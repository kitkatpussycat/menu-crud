import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { set, ref, onValue, remove, update } from 'firebase/database';
import { uid } from 'uid';

let count = 0;
let menuId = 0;

const Form = () => {
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  //   const [optionName, setOptionName] = useState('');
  //   const [price, setPrice] = useState(0);
  //   const [cost, setCost] = useState(0);
  //   const [quantity, setQuantity] = useState(0);
  const [option, setOption] = useState({
    optionName: '',
    price: 0,
    cost: 0,
    quantity: 0,
  });
  const [editId, setEditId] = useState(0);
  const [options, setOptions] = useState([]);
  const [optionStatus, setOptionStatus] = useState('add');
  //const [menu, setMenu] = useState([]);
  const [menus, setMenus] = useState([]);
  const [updateMenu, setUpdateMenu] = useState('create');
  const [tempUUID, setTempUUID] = useState('');

  const addOption = () => {
    if (optionStatus === 'add') {
      setOptions([{ id: ++count, ...option }, ...options]);
      console.log(options);
    } else {
      const newOptions = options.map((opt) => {
        if (opt.id === editId) {
          return {
            ...opt,
            optionName: option.optionName,
            price: option.price,
            cost: option.cost,
            quantity: option.quantity,
          };
        } else {
          return opt;
        }
      });
      setOptions(newOptions);
    }

    setOption({ optionName: '', price: 0, cost: 0, quantity: 0 });
    setOptionStatus('add');
  };

  const deleteOption = (id) => {
    const newOptions = options.filter((opt) => opt.id !== id);
    setOptions(newOptions);
  };

  //read
  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      setMenus([]);
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((menus) => {
          setMenus((oldMenu) => [...oldMenu, menus]);
        });
      }
    });
  }, []);

  //write
  const createMenu = () => {
    // setMenus([
    //   { id: ++menuId, category: category, name: name, options: options },
    //   ...menus,
    // ]);
    if (updateMenu == 'create') {
      const uuid = uid();
      set(ref(db, `${uuid}`), {
        uuid: uuid,
        category: category,
        name: name,
        options: options,
      });
    } else {
      update(ref(db, `${tempUUID}`), {
        uuid: tempUUID,
        category: category,
        name: name,
        options: options,
      });
      setUpdateMenu('create');
    }
    console.log(menus);
    reset();
  };

  const reset = () => {
    setCategory('');
    setName('');
    setOption({ optionName: '', price: 0, cost: 0, quantity: 0 });
    setOptions([]);
  };

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
    <div className='flex flex-col'>
      <div className='w-fit flex flex-col'>
        <input
          type='text'
          placeholder='category'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type='text'
          placeholder='menu name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className='flex flex-col'>
          <p>options:</p>
          <div className='flex flex-row'>
            <input
              type='text'
              name='optionName'
              placeholder='default'
              value={option.optionName}
              onChange={(e) =>
                setOption({ ...option, optionName: e.target.value })
              }
            />
            price:{' '}
            <input
              className='w-1/4'
              type='number'
              name='price'
              value={option.price}
              onChange={(e) => setOption({ ...option, price: e.target.value })}
            />
            cost:{' '}
            <input
              className='w-1/4'
              type='number'
              name='cost'
              value={option.cost}
              onChange={(e) => setOption({ ...option, cost: e.target.value })}
            />
            quantity:{' '}
            <input
              className='w-1/4'
              type='number'
              name='quantity'
              value={option.quantity}
              onChange={(e) =>
                setOption({ ...option, quantity: e.target.value })
              }
            />
            <button className='bg-blue-500 w-fit h-fit' onClick={addOption}>
              {optionStatus}
            </button>
          </div>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Cost</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {options.map((opt) => (
                <tr key={opt.id}>
                  <td>{opt.optionName}</td>
                  <td>{opt.price}</td>
                  <td>{opt.cost}</td>
                  <td>{opt.quantity}</td>
                  <td>
                    <button
                      className='bg-green-500'
                      onClick={() => {
                        setEditId(opt.id);
                        setOptionStatus('edit');
                        setOption({
                          id: opt.id,
                          optionName: opt.optionName,
                          price: opt.price,
                          cost: opt.cost,
                          quantity: opt.quantity,
                        });
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className='bg-red-500'
                      onClick={() => {
                        deleteOption(opt.id);
                      }}
                    >
                      del
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className='bg-green-500 w-fit' onClick={createMenu}>
          {updateMenu}
        </button>
        <div className='flex bg-slate-500'>
          {menus &&
            menus.map((menu) => (
              <div key={menu.id} className='card'>
                {menu.category}, {menu.name}
                <div>
                  {menu.options.map((opt) => (
                    <div key={opt.id}>
                      {opt.optionName}, {opt.price}, {opt.cost}, {opt.quantity}
                    </div>
                  ))}
                </div>
                <div>
                  <button
                    className='bg-green-500'
                    onClick={() => handleUpdate(menu)}
                  >
                    edit
                  </button>
                  <button
                    className='bg-red-500'
                    onClick={() => handleDelete(menu)}
                  >
                    delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Form;
