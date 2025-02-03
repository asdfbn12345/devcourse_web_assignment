import React, { useState } from "react";
import { useTypedDispatch, useTypedSelector } from "../../hooks/redux";
import { FiLogIn, FiPlusCircle } from "react-icons/fi";
import SideForm from "./SideForm/SideForm";
import {
  addButton,
  addSection,
  boardItem,
  boardItemActive,
  container,
  title,
} from "./BoardList.css";
import clsx from "clsx";
import { GoSignOut } from "react-icons/go";
import { app } from "../../firebase";
import { getAuth, signInWithPopup, signOut } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth/web-extension";
import { removeUser, setUser } from "../../store/slices/userSlice";
import { useAuth } from "../../hooks/useAuth";

type TBoardListProps = {
  activeBoardId: string;
  setActiveBoardId: React.Dispatch<React.SetStateAction<string>>;
};

const BoardList: React.FC<TBoardListProps> = ({
  activeBoardId,
  setActiveBoardId,
}) => {
  const dispatch = useTypedDispatch();
  const { boards } = useTypedSelector((state) => state.boards);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const { isAuth } = useAuth();

  const handleOnClick = () => {
    setIsFormOpen(!isFormOpen);
  };
  const handleSingOut = () => {
    signOut(auth)
      .then(dispatch(removeUser()))
      .catch((error) => {
        console.error(error);
      });
  };
  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((userCredential) => {
        dispatch(
          setUser({
            email: userCredential.user.email,
            id: userCredential.user.uid,
          })
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className={container}>
      <div className={title}>게시판:</div>
      {boards.map((board, index) => (
        <div
          key={board.id}
          className={clsx(
            {
              [boardItemActive]:
                boards.findIndex((board) => board.id === activeBoardId) ===
                index,
            },
            {
              [boardItem]:
                boards.findIndex((board) => board.id === activeBoardId) !==
                index,
            }
          )}
        >
          <div>{board.name}</div>
        </div>
      ))}
      <div className={addSection}>
        {isFormOpen ? (
          <SideForm setIsFormOpen={setIsFormOpen} />
        ) : (
          <FiPlusCircle className={addButton} onClick={handleOnClick} />
        )}

        {isAuth ? (
          <GoSignOut className={addButton} onClick={handleSingOut} />
        ) : (
          <FiLogIn className={addButton} onClick={handleLogin} />
        )}
      </div>
    </div>
  );
};

export default BoardList;
