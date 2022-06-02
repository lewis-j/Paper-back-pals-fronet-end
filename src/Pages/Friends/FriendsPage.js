import { Outlet } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { ContactList } from "../../components";

const FriendsPage = () => {
  return (
    <Container fluid>
      <Row>
        <Col sm="4" lg="3" className="ps-0">
          <ContactList />
        </Col>
        <Col sm="8" lg="9">
          <div className="FriendResults">
            <Outlet />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default FriendsPage;
