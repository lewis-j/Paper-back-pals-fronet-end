import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { ContactList, FriendsNavigation } from "../../components";

const FriendsPage = () => {
  const [activeId, setActiveId] = useState("");
  const navigate = useNavigate();

  const clickHandler = (_id) => {
    setActiveId(_id);
    navigate(`library`, { state: { user_id: _id } });
  };
  return (
    <Container fluid>
      <Row>
        <Col sm="4" lg="3" className="p-0">
          <ContactList activeId={activeId} setId={clickHandler} />
        </Col>
        <Col sm="8" lg="9" className="m-0 p-0">
          <div className="FriendResults">
            <FriendsNavigation />
            <Outlet />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default FriendsPage;
