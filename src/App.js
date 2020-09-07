import React, { useState } from 'react';
import './App.css';
import CsvReader from './CsvReader';
import { Table } from 'antd'

function App() {
  const [csvData, setCsvData] = useState([]);
  const [searched, setSearched] = useState([]);
  const [pinCode, setPinCode] = useState("");
  const [orderDate, setOrderDate] = useState("");
  
  const columns = [
    {
      title: 'Order Id',
      dataIndex: 'orderId',
      key: 'orderId',
      sorter: (a, b) => a.orderId - b.orderId,
    },
    {
      title: 'Customer Id',
      dataIndex: 'customerId',
      key: 'customerId'
    },
    {
      title: 'Pin Code',
      dataIndex: 'deliveryPincode',
      key: 'deliveryPincode'
    },
    {
      title: 'Order Date',
      dataIndex: 'orderDate',
      key: 'orderDate'
    },
    {
      title: 'Items',
      dataIndex: 'items',
      key: 'items'
    },
  ];

const filterItemsPin = (e) => {
  const pin = new RegExp(`^${e.target.value}`, "i");
  const date = new RegExp(`^${orderDate}`, "i");
  const value = csvData.filter(list => pin.test(list.deliveryPincode) && date.test(list.orderDate))
  setSearched(value);
  setPinCode(e.target.value)
}

const filterItemsDate = (e) => {
  const pin = new RegExp(`^${pinCode}`, "i");
  const date = new RegExp(`^${e.target.value}`, "i");
  const value = csvData.filter(list => pin.test(list.deliveryPincode) && date.test(list.orderDate))
  setSearched(value);
  setOrderDate(e.target.value)
}

  console.log(csvData)
  return (

<>
    <div className="App">
      <CsvReader 
        getResult={res => {
          setCsvData(res.data);
          setSearched(res.data)
        }}
      />
      <div>          
        <label className="inputfield">
        Pincode:        
          <input 
          value={pinCode}
          onChange={e => {
            filterItemsPin(e)
            }}/>

            
        </label>
        <label className="inputfield">
        Date:        
          <input 
          value={orderDate}
          onChange={e => {
            filterItemsDate(e)
            }}/>
        </label>        
      </div>
      <Table columns={columns} dataSource={searched} />
    </div>
</>
  );
}

export default App;
