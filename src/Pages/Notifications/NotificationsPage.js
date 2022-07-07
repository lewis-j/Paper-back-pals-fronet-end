import { useSelector } from "react-redux";
import { Container, Row } from "reactstrap";
import { EmptyPage, NoContent, UserInboxCard } from "../../components";
import { faBellSlash } from "@fortawesome/free-regular-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";

const NotificationsPage = () => {
  const { friendRequestInbox: friendRequest } = useSelector(
    (state) => state.friends
  );

  if (friendRequest.length === 0)
    return (
      <NoContent icon={faBell} text="You currently don't have notifications" />
    );

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

export default NotificationsPage;
