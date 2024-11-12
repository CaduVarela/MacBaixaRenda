import {
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import styles from "./Dashboard.module.scss";
import { Fragment, useContext, useEffect, useState } from "react";
import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { phoneMask } from "@component/utils/phoneMask";
import { ToastContext } from "@component/context/ToastContext";
import { IForm } from "@component/store/types";
import { IStatus } from "@component/utils/types";
import EditOrderModal from "../EditOrderModal";

export default function Dasboard() {
  const { showToast } = useContext(ToastContext);
  const [open, setOpen] = useState<{ [key: number]: boolean }>({});
  const [status, setStatus] = useState<IStatus[]>([]);
  const [orders, setOrders] = useState<IForm[]>([]);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<IForm | null>(null);

  async function fetchApiStatus() {
    try {
      const response = await fetch(`http://localhost:3001/api/status`).then(response => response.json());
      setStatus(response.data);
    } catch (error) {
      console.warn(error);
    }
  }

  async function fetchApiOrders() {
    try {
      const response = await fetch(`http://localhost:3001/api/order?filters={"canceled": false}`).then(response => response.json());
      setOrders(response.data);
    } catch (error) {
      showToast({ message: "Erro ao carregar pedidos. Tente novamente mais tarde.", status: "error" });
      console.warn(error);
    }
  }

  useEffect(() => {
    fetchApiStatus();
    fetchApiOrders();
  }, []);

  const toggleOpen = (index: number) => {
    setOpen((prevOpenStates) => ({
      ...prevOpenStates,
      [index]: !prevOpenStates[index],
    }));
  };

  const handleEditOrder = (index: number) => {
    setSelectedOrder(orders[index]);
    setOpenModalEdit(true);
  };

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>, id: number) => {
    try {
      const statusId = Number(e.target.value);
      await fetch(`http://localhost:3001/api/order/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ statusId })
      });
      fetchApiOrders();
      showToast({ message: "Status do pedido atualizado!", status: "success" });
    } catch (error) {
      showToast({ message: "Erro ao atualizar o status do pedido.", status: "error" });
      console.warn(error);
    }
  };

  const handleCancelOrder = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3001/api/order/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ canceled: true })
      }).then(response => response.json());
      console.log(response)
      fetchApiOrders();
      showToast({ message: "Pedido cancelado!", status: "success" });
    } catch (error) {
      showToast({ message: "Erro ao cancelar o pedido. Tente novamente.", status: "error" });
      console.warn(error);
    }
  };

  const handleSaveOrder = async (updatedOrder: IForm) => {
    // @todo: pass the right params to update on body
    return;
    try {
      const response = await fetch(`http://localhost:3001/api/order/${updatedOrder.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ /* HERE */ })
      }).then(response => response.json());
      console.log(response)
      fetchApiOrders();
      showToast({ message: "Pedido Atualizado!", status: "success" });
    } catch (error) {
      showToast({ message: "Erro ao atualizar o pedido. Tente novamente.", status: "error" });
      console.warn(error);
    }
  }

  const position = (e: number) => {
    if (e || e === 0) {
      return e + 1;
    }
    return;
  };

  return (
    <>
      <TableContainer className="scrollbarStyles">
        {orders?.length > 0 ? (
          <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell sx={{  fontWeight:  600  }}>id</TableCell>
                  <TableCell sx={{  fontWeight:  600  }}>Cliente</TableCell>
                  <TableCell sx={{  fontWeight:  600  }}>Retirada</TableCell>
                  <TableCell sx={{  fontWeight:  600  }}>Pagamento</TableCell>
                  <TableCell sx={{  fontWeight:  600  }}>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders?.map((order, index) => (
                <Fragment key={index}>
                  <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                    <TableCell className="py-0">
                      <div className="cursor-pointer" onClick={() => toggleOpen(index)}>
                        <IoIosArrowDown className="text-pink" />
                      </div>
                    </TableCell>
                    <TableCell className="py-0">{position(index)}</TableCell>
                    <TableCell className="py-0">{order?.name}</TableCell>
                    <TableCell className="py-0">{order?.deliveryType}</TableCell>
                    <TableCell className="py-0">{order?.paymentType}</TableCell>
                    <TableCell className="py-3">
                      <div className="flex space-x-3 items-start lmd:justify-start justify-between">
                        <select 
                        className={`${styles.status}`} 
                        name="status" 
                        value={order?.status?.id || ''}
                        onChange={(e) => handleStatusChange(e, order?.id)}>
                          {status?.map((st) => (
                            <option key={st?.id} value={st?.id}>
                              {st?.type}
                            </option>
                          ))}
                        </select>
                        <button
                          className="btnStyles py-1"
                          onClick={() => handleCancelOrder(order?.id)}
                        >
                          Cancelar
                        </button>
                        <button
                          className="btnStyles py-1"
                          onClick={() => handleEditOrder(index)}
                        >
                          Editar
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>

                <TableRow>
                  <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                  >
                    <Collapse in={open[index]} timeout="auto" unmountOnExit>
                      <div className="flex msm:flex-row flex-col msm:gap-10 msm:space-y-0 space-y-4 p-4">
                        <div>
                          <p className="font-semibold text-pink">Contato:</p>
                          <p>{phoneMask(order?.phone as string)}</p>
                        </div>
                        <div>

                            <p className="font-semibold text-pink">Pedido:</p>
                            <div className="flex flex-col space-y-3">
                              {order?.products?.map((item, index) => (
                                <div key={index}>
                                  <p>{`${item?.quantity}x ${item?.product?.name}`}</p>
                                  {item?.observations && (
                                    <p>{`Observações: ${item?.observations}`}</p>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                          {order?.cep && (
                            <div>
                              <p className="font-semibold text-pink">Endereço:</p>
                              <p>{`CEP - ${order?.cep}`}</p>
                              <p>{`${order?.city} - ${order?.state}`}</p>
                              <p>{`${order?.street}, ${order?.neighborhood}, ${order?.number}`}</p>
                            </div>
                          )}
                        </div>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </Fragment>
              ))}
              </TableBody>
            </Table>
        ) : (
          <div className="my-10 text-pink font-semibold text-center">Sem pedidos no momento!</div>
        )}
      </TableContainer>

      {selectedOrder && (
        <EditOrderModal
          open={openModalEdit}
          handleClose={() => setOpenModalEdit(false)}
          order={selectedOrder}
          onSave={(updatedOrder) => handleSaveOrder(updatedOrder)}
        />
      )}
    </>
  );
}
