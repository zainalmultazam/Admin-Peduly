/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { 
  Row,
  Card,
  CardBody,
  Table,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle
} from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import useMousetrap from 'hooks/use-mousetrap';
import pengguna from 'data/pengguna';
import { orderData } from 'helpers/Utils';

const orderOptions = [
  { label: `Terbaru` },
  { label: `Terlama` }
];

const pageSizes = [4, 8, 12, 20];

const initialData = orderData("Terbaru", pengguna);

const Pengguna = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState("Terbaru");
  const [data, setData] = useState(initialData);
  // const [search, setSearch] = useState('');

  // const sortedDsc = transaksi.sort(function(a,b){
  //   // Transaksi terlama
  //   return new Date(a.created_at) - new Date(b.created_at);
  // });

  // console.log(data);

  const handleOrder = (option) => {
    const array = orderData(option, initialData);
    setData(array);
    setSelectedOrder(option);
  };

  const handleChangeSelectAll = (isToggle) => {
    if (selectedItems.length >= initialData.length) {
      if (isToggle) {
        setSelectedItems([]);
      }
    } else {
      setSelectedItems(initialData.map((x) => x.id));
    }
    document.activeElement.blur();
    return false;
  };

  // const statusColor = (status) => {
  //   if(status === `Approved`) {
  //     return `success`;
  //   }
    
  //   if(status === `Pending`) {
  //     return `warning`;
  //   }
    
  //   return `danger`;
  // };

  // const onSearchKey = (e) => {
  //   if (e.key === 'Enter') {
  //     setSearch(e.target.value.toLowerCase());
  //   }
  // };

  useMousetrap(['ctrl+a', 'command+a'], () => {
    handleChangeSelectAll(false);
  });

  useMousetrap(['ctrl+d', 'command+d'], () => {
    setSelectedItems([]);
    return false;
  });

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <h1>
            Semua Pengguna
          </h1>
          <Separator className="mb-3" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mb-3" >
          <div className="d-block d-md-inline-block pt-1">
              <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
                <DropdownToggle caret color="outline-dark" size="xs">
                  <IntlMessages id="pages.orderby" /> {selectedOrder}
                </DropdownToggle>
                <DropdownMenu>
                  {orderOptions.map((order, index) => {
                    return (
                      <DropdownItem
                        key={index}
                        onClick={()=>handleOrder(order.label)}
                      >
                        {order.label}
                      </DropdownItem>
                    );
                  })}
                </DropdownMenu>
              </UncontrolledDropdown>
              <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                <input
                  type="text"
                  name="keyword"
                  id="search"
                  // placeholder={messages['menu.search']}
                  // onKeyPress={(e) => onSearchKey(e)}
                />
              </div>
            </div>
            <div className="float-md-right pt-1">
              <span className="text-muted text-small mr-1">{`1 of 1 `}</span>
              <UncontrolledDropdown className="d-inline-block">
                <DropdownToggle caret color="outline-dark" size="xs"> 8
                  {/* {selectedPageSize} */}
                </DropdownToggle>
                <DropdownMenu right>
                  {pageSizes.map((size, index) => {
                    return (
                      <DropdownItem
                        key={index}
                        onClick=""
                      >
                        {size}
                      </DropdownItem>
                    );
                  })}
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <Table hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nama</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>No. Telepon</th>
                    <th>Role</th>
                    <th>Tanggal Dibuat</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    data.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.nama}</td>
                        <td>{item.username}</td>
                        <td>{item.email}</td>
                        <td>{item.telepon}</td>
                        <td>{item.role}</td>
                        <td>{item.created_at}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};

export default Pengguna;