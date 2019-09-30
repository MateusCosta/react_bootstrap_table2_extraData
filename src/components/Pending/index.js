import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyledContainer } from "./styles";
import BootstrapTable from "react-bootstrap-table-next";
import { Button, ButtonGroup } from "react-bootstrap";


export default function Pending() {
  const pending = useSelector(state => state.pending);
  const actualState = useSelector(state => state);
  const dispatch = useDispatch();
  const columns = [
    {
      dataField: "actions",
      text: "Ações",
      isDummyField: true,
      csvExport: false,
      formatter: (cell, row, rowIndex, extraData) => (
        <div>
          <span>ID: {row.id}</span>
          <br />
          <span>state: {extraData}</span>
        </div>
      ),
      formatExtraData: pending.length
    },
    {
      dataField: "deposito",
      text: "Deposito",
      csvExport: false
    },
    {
      dataField: "produto_id",
      text: "Produto",
      csvExport: false
    },
    

    {
      dataField: "ean",
      text: "Novo EAN"
    },
    {
      dataField: "df1",
      isDummyField: true,
      text: "Actions",
      formatter: (cellContent, row, rowIndex, extraData) => {
        return (
          <ButtonGroup>
            <Button variant="primary" onClick={() => updateRequests(true,row,extraData)}>
              Aceitar
            </Button>
            <Button variant="danger" onClick={() => updateRequests(false,row,extraData)}>Rejeitar</Button>
          </ButtonGroup>
        );
      },formatExtraData: actualState
    }
  ];

  const updateRequests = (action, row, extraData) => {
    var newPending = Array.from(extraData.pending).filter( res => (res.produto_id !== row.produto_id));

    if(action){
        var newAccepted = Array.from(extraData.accepted)
        row.aprovado = true;
        newAccepted.push(row);
    
        dispatch({type: 'UPDATE_REQUESTS', accepted:newAccepted, pending:newPending, rejected: extraData.rejected})

    }else{
        var newRejected = Array.from(extraData.rejected)
        row.aprovado = false;
        newRejected.push(row);
       
        dispatch({type: 'UPDATE_REQUESTS', accepted:extraData.accepted, pending:newPending, rejected: newRejected})
    }
  }

  return (
    <StyledContainer>
        <h1>Pendentes</h1>
      <BootstrapTable data={pending} columns={columns} keyField="produto_id" />
    </StyledContainer>
  );
}
