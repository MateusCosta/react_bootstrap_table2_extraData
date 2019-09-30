import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { StyledContainer } from './styles';
import BootstrapTable from 'react-bootstrap-table-next';
import { Button, ButtonGroup } from "react-bootstrap";


export default function Rejected() {
    const rejected = useSelector(state => state.rejected);
    const actualState = useSelector(state => state);
    const dispatch = useDispatch();
    const rowClasses = row => (row.aprovado ? "accepted" : "rejected");

    const columns = [
        {
            dataField: 'actions',
            text: 'Ações',
            isDummyField: true,
            csvExport: false,
            formatter: (cell, row, rowIndex, extraData) => (
                <div>
                    <span>ID: {row.id}</span>
                    <br/>
                    <span>state: {extraData}</span>
                </div>
            ),
            formatExtraData: rejected.length
        },
        {
            dataField: 'deposito',
            text: 'Deposito',
            csvExport: false,
           
        },
        {
        dataField: 'produto_id',
        text: 'Produto',
        csvExport: false,
       
    },
    
   
    {
        dataField: 'ean',
        text: 'Novo EAN',
       
    },
     {
        dataField: "df1",
        isDummyField: true,
        text: "Actions",
        formatter: (cellContent, row, rowIndex, extraData) => {
          return (
            <ButtonGroup>
              <Button variant="warning" onClick={() => updateRequests(true,row,extraData)}>
                Desfazer
              </Button>
              <Button variant="info" onClick={() => updateRequests(false,row,extraData)}>Aceitar</Button>
            </ButtonGroup>
          );
        },formatExtraData: actualState
      }
   
    ];

    const updateRequests = (action, row, extraData) => {
        var newRejected = Array.from(extraData.rejected).filter( res => (res.produto_id !== row.produto_id));

        if(action){
          var newPending = Array.from(extraData.pending);
          newPending.push(row);
          dispatch({type: 'UPDATE_REQUESTS', accepted:extraData.accepted, pending:newPending, rejected: newRejected})
        }else{
            var newAccepted = Array.from(extraData.accepted)
            row.aprovado = true;
            newAccepted.push(row);
           
            dispatch({type: 'UPDATE_REQUESTS', accepted:newAccepted, pending:extraData.pending, rejected: newRejected})
        }
      }

  return (
   <StyledContainer>
       <h1>Rejeitados</h1>
       <BootstrapTable data={rejected} columns={columns} keyField="produto_id" rowClasses={rowClasses}/>
   </StyledContainer>
  );
}
