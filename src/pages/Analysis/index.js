import React from 'react';
import * as API from '../../services/apiAnalise';
import { StyledContainer } from './styles';
import { useDispatch} from 'react-redux';
import Pending from '../../components/Pending';
import Rejected from '../../components/Rejected';
import Accepted from '../../components/Accepted';
import {Container, Row, Col} from 'react-bootstrap';
export default function Analysis() {

  const dispatch = useDispatch();
    React.useEffect(() => {

        async function fetchData(){
            const response = await API.getPending();
            dispatch({type: 'UPDATE_REQUESTS', accepted:[], pending: response.data, rejected: []})
            
        }
        fetchData();
       
    },[])

    

  return (
    <StyledContainer>
      <Container>
        <Row>
          <Col>
            <Pending/>
          </Col>
        </Row>

        <Row noGutters={false}>
        
          <Col  lg={6}>
            <Accepted/>
          </Col>
          <Col lg={6}>
            <Rejected/>
          </Col>
        </Row>
      </Container>
     
    </StyledContainer>
  );
}
