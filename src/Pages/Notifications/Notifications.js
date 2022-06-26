import { useSelector } from "react-redux";
import { Container, Row } from "reactstrap";
import { EmptyPage, UserInboxCard } from "../../components";

const Notifications = () => {
  const { friendRequestInbox: friendRequest } = useSelector(
    (state) => state.friends
  );

  if (friendRequest.length === 0)
    return <EmptyPage>You currently have no notifications</EmptyPage>;

  const renderFriendRequest = () => {
    return friendRequest.map((request, i) => {
      const props = { ...request.sender, _id: request._id };

      return <UserInboxCard {...props} key={request.sender.id + i} />;
    });
  };
  return (
    <Container>
      <Row>{renderFriendRequest()}</Row>
    </Container>
  );
};

export default Notifications;
