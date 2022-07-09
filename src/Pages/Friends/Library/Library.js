import styles from "./Library.module.scss";
import {
  UserCardLrg as CurrentRead,
  ResponsiveSlider,
  Loading,
  UserCardSm,
} from "../../../components";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import * as _status from "../../../redux/status";
import { Link } from "react-router-dom";

const Library = () => {
  const { currentFriend: user, status } = useSelector((state) => state.friends);

  useEffect(() => {
    console.log("user in slice", user);
  }, [user]);

  const renderUserCards = (books) => {
    console.log("books", books);
    if (books) return books.map((book) => <UserCardSm bookData={book} />);
    return <></>;
  };
  if (true) return <Loading />;
  return (
    <div>
      <div>
        <h3 className={styles.title}>Current Read</h3>
        {user.currentRead ? (
          <CurrentRead currentBook={user.currentRead} />
        ) : (
          <div>
            <div>You need to find a currentRead</div>
            <div>suggestions</div>
            {user.borrowedBooks.length !== 0 ? (
              <ResponsiveSlider>
                {renderUserCards(user.borrowedBooks)}
              </ResponsiveSlider>
            ) : (
              <Link to={"/friends"}>Search through your friends books</Link>
            )}
          </div>
        )}
        <h3 className={styles.title}>Checked Out</h3>
        <div className={styles.section}>
          {user.borrowedBooks.length !== 0 && (
            <ResponsiveSlider>
              {renderUserCards(user.borrowedBooks)}
            </ResponsiveSlider>
          )}
        </div>
        <h3 className={styles.title}>Library</h3>
        <ResponsiveSlider>{renderUserCards(user.ownedBooks)}</ResponsiveSlider>
      </div>
    </div>
  );
};

export default Library;
