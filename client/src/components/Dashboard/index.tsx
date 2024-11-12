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
import { useFormStore } from "@component/store/store";
import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { phoneMask } from "@component/utils/phoneMask";
import { ToastContext } from "@component/context/ToastContext";
import { IForm } from "@component/store/types";
import { IStatus } from "@component/utils/types";
import EditOrderModal from "../EditOrderModal";

export default function Dasboard() {
  const { showToast } = useContext(ToastContext);
  const dataForm = useFormStore((s) => s.dataForm);
  const { deleteData } = useFormStore();
  const [open, setOpen] = useState<{ [key: number]: boolean }>({});
  const [status, setStatus] = useState<IStatus[]>([]);
  const [data, setData] = useState<IForm[]>([]);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<IForm | null>(null);

  async function fetchApiStatus() {
    // @todo
  }

  useEffect(() => {
    fetchApiStatus();
  }, []);

  useEffect(() => {
    setData(dataForm);
  }, [dataForm]);

  const toggleOpen = (index: number) => {
    setOpen((prevOpenStates) => ({
      ...prevOpenStates,
      [index]: !prevOpenStates[index],
    }));
  };

  const handleEditOrder = (index: number) => {
    setSelectedOrder({ ...data[index], index });
    setOpenModalEdit(true);
  };

  const removeOrder = (index: number) => {
    deleteData(index);
    showToast({ message: "Pedido cancelado!", status: "success" });
  };

  const handleSaveOrder = (updatedOrder: IForm) => {
    const newData = data?.map((order, index) => index === updatedOrder.index ? updatedOrder : order);
    useFormStore.setState((s) => ({ ...s, dataForm: newData }));
    setOpenModalEdit(false);
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
        {data?.length > 0 ? (
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell sx={{ fontWeight: 600 }}>id</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Cliente</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Retirada</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Pagamento</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((el, index) => (
                <Fragment key={index}>
                  <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                    <TableCell className="py-0">
                      <div className="cursor-pointer" onClick={() => toggleOpen(index)}>
                        <IoIosArrowDown className="text-pink" />
                      </div>
                    </TableCell>
                    <TableCell className="py-0">{position(index)}</TableCell>
                    <TableCell className="py-0">{el?.name}</TableCell>
                    <TableCell className="py-0">{el?.deliveryType}</TableCell>
                    <TableCell className="py-0">{el?.paymentType}</TableCell>
                    <TableCell className="py-3">
                      <div className="flex space-x-3 items-start lmd:justify-start justify-between">
                        <select className={`${styles.status}`} name="status">
                          {status?.map((el) => (
                            <option key={el?.id} value={el?.type}>
                              {el?.type}
                            </option>
                          ))}
                        </select>
                        <button
                          className="btnStyles py-1"
                          onClick={() => removeOrder(index)}
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
                            <p>{phoneMask(el?.celular as string)}</p>
                          </div>
                          <div>

                            <p className="font-semibold text-pink">Pedido:</p>
                            <div className="flex flex-col space-y-3">
                              {el?.order?.map((item, index) => (
                                <div key={index}>
                                  <p>{`${item?.quantity}x ${item?.name}`}</p>
                                  {item?.observations && (
                                    <p>{`Observações: ${item?.observations}`}</p>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                          {el?.cep && (
                            <div>
                              <p className="font-semibold text-pink">Endereço:</p>
                              <p>{`CEP - ${el?.cep}`}</p>
                              <p>{`${el?.city} - ${el?.state}`}</p>
                              <p>{`${el?.street}, ${el?.neighborhood}, ${el?.number}`}</p>
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
          onSave={handleSaveOrder}
        />
      )}
    </>
  );
}
