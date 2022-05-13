import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { set, ref, onValue, remove, update } from 'firebase/database';
import { uid } from 'uid';
import { IoRefreshOutline } from 'react-icons/io5';

let count = 0;

const Form = ({
  category,
  setCategory,
  name,
  setName,
  option,
  setOption,
  options,
  setOptions,
  editId,
  setEditId,
  tempUUID,
  optionStatus,
  setOptionStatus,
  menus,
  updateMenu,
  setUpdateMenu,
}) => {
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

  //write and update
  const createMenu = () => {
    if (options.length > 0) {
      if (updateMenu == 'create') {
        const uuid = uid();
        set(ref(db, `${uuid}`), {
          uuid: uuid,
          category: category,
          name: name,
          options: options,
        });
        count = 0;
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
    } else {
      alert('need to fill-up options');
    }
  };

  const reset = () => {
    setCategory('');
    setName('');
    setOption({ optionName: '', price: 0, cost: 0, quantity: 0 });
    setOptions([]);
  };

  return (
    <div className='flex flex-col'>
      <div className='w-full h-screen flex flex-col'>
        <div className='bg-[#A7D7C5] flex flex-col justify-center items-center h-full'>
          <div className='w-full p-10 flex justify-center'>
            <h1>Restaurant Name</h1>
          </div>
          <div className='border border-2 w-11/12'>
            <div className='flex justify-end p-2'>
              {' '}
              <button onClick={reset}>
                <IoRefreshOutline className='text-3xl' />
              </button>
            </div>
            <div className='flex flex-col justify-center items-center pb-3 px-3'>
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
            </div>
            <div className='flex flex-col p-3'>
              <h2 className='my-2'>Options:</h2>
              <div className='flex flex-col items-center jutify-center gap-2'>
                <div className='perInput'>
                  <span className='font-semibold'>Name (Default if none)</span>
                  <input
                    className='m-0'
                    type='text'
                    name='optionName'
                    placeholder='ex. small, medium, large, alacarte... etc.'
                    value={option.optionName}
                    onChange={(e) =>
                      setOption({ ...option, optionName: e.target.value })
                    }
                  />
                </div>
                <div className='perInput'>
                  <span className='font-semibold'>Price</span>
                  <input
                    className='m-0'
                    type='number'
                    name='price'
                    value={option.price}
                    onChange={(e) =>
                      setOption({ ...option, price: e.target.value })
                    }
                  />
                </div>
                <div className='perInput'>
                  <span className='font-semibold'>Cost</span>
                  <input
                    className='m-0'
                    type='number'
                    name='cost'
                    value={option.cost}
                    onChange={(e) =>
                      setOption({ ...option, cost: e.target.value })
                    }
                  />
                </div>
                <div className='perInput '>
                  <span className='font-semibold'>Quantity</span>
                  <input
                    className='m-0'
                    type='number'
                    name='quantity'
                    value={option.quantity}
                    onChange={(e) =>
                      setOption({ ...option, quantity: e.target.value })
                    }
                  />
                </div>
                <div className=' flex items-end justify-end w-full py-1'>
                  <button
                    className='bg-[#5C8D89] w-fit h-fit mx-0'
                    onClick={addOption}
                  >
                    {optionStatus}
                  </button>
                </div>
              </div>
            </div>
            <div className=' p-2 w-full h-56 overflow-y-auto'>
              <table className='table-auto overflow-auto'>
                <thead>
                  <tr className='gap-5'>
                    <th>Option</th>
                    <th>Price</th>
                    <th>Cost</th>
                    <th>Quantity</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {options
                    .sort((a, b) => (a.id > b.id ? 1 : -1))
                    .map((opt) => (
                      <tr key={opt.id}>
                        <td>{opt.optionName}</td>
                        <td>{opt.price}</td>
                        <td>{opt.cost}</td>
                        <td>{opt.quantity}</td>
                        <td>
                          <button
                            className='bg-[#74B49B] px-2'
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
                            className='bg-red-500 px-2'
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
          </div>
          <div className='flex justify-center w-full m-5'>
            <button className='bg-[#5C8D89] w-fit mb-5' onClick={createMenu}>
              {updateMenu}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
