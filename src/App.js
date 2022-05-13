import Form from './components/Form';
import List from './components/List';
import React, { useState } from 'react';

let count = 0;

function App() {
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [option, setOption] = useState({
    optionName: '',
    price: 0,
    cost: 0,
    quantity: 0,
  });
  const [editId, setEditId] = useState(0);
  const [options, setOptions] = useState([]);
  const [optionStatus, setOptionStatus] = useState('add');
  const [menus, setMenus] = useState([]);
  const [updateMenu, setUpdateMenu] = useState('create');
  const [tempUUID, setTempUUID] = useState('');

  return (
    <div className='h-screen'>
      <div className='grid grid-cols-12 gap-2'>
        <div className='col-span-4'>
          <Form
            category={category}
            setCategory={setCategory}
            name={name}
            setName={setName}
            option={option}
            setOption={setOption}
            options={options}
            setOptions={setOptions}
            editId={editId}
            setEditId={setEditId}
            optionStatus={optionStatus}
            setOptionStatus={setOptionStatus}
            menus={menus}
            setMenus={setMenus}
            updateMenu={updateMenu}
            setUpdateMenu={setUpdateMenu}
            tempUUID={tempUUID}
            setTempUUID={setTempUUID}
            count={count}
          />
        </div>
        <div className='col-span-8'>
          <List
            category={category}
            setCategory={setCategory}
            name={name}
            setName={setName}
            options={options}
            setOptions={setOptions}
            editId={editId}
            setEditId={setEditId}
            optionStatus={optionStatus}
            setOptionStatus={setOptionStatus}
            menus={menus}
            setMenus={setMenus}
            updateMenu={updateMenu}
            setUpdateMenu={setUpdateMenu}
            tempUUID={tempUUID}
            setTempUUID={setTempUUID}
            count={count}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
