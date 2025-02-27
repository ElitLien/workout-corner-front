import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./style.css";

const UsersCards = () => {
  const [users, setUsers] = useState<
    {
      id: number;
      email: string;
      username: string;
      role: string;
    }[]
  >([]);
  const tokenStorage = localStorage.getItem("authToken");
  const [token, setToken] = useState<any>(tokenStorage);
  const [selectedRole, setSelectedRole] = useState<string>();
  const [activeChanger, setActiveChanger] = useState<number | null>(null);

  const loadUsers = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/users/all`,
        {
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const changeRole = async (name: string) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/users/role`,
        {
          userId: activeChanger,
          role: `${selectedRole?.toUpperCase()}`,
        },
        {
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === activeChanger
            ? { ...user, role: selectedRole?.toUpperCase() || user.role }
            : user
        )
      );

      window.alert(`Role for ${name} has changed!`);
      setActiveChanger(null);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <>
      {users &&
        users.map((el, ind) => {
          const isActive = activeChanger === el.id;
          return (
            <div className="users-cards-body">
              <div className="users-cards-body-first-block">
                <div>{ind + 1}</div>
                <div>{el.username}</div>
              </div>
              <div className="users-cards-body-second-block">{el.email}</div>
              <select
                name="role"
                className="select-role"
                onChange={(e) => {
                  const newRole = e.target.value.toLowerCase();
                  if (newRole !== el.role.toLowerCase()) {
                    setSelectedRole(newRole);
                    setActiveChanger(el.id);
                  } else {
                    setSelectedRole(undefined);
                    setActiveChanger(null);
                  }
                }}
              >
                {el.role === "MODERATOR" ? (
                  <option value="moderator" selected>
                    MODERATOR
                  </option>
                ) : (
                  <option value="moderator">MODERATOR</option>
                )}
                {el.role === "ADMIN" ? (
                  <option value="admin" selected>
                    ADMIN
                  </option>
                ) : (
                  <option value="admin">ADMIN</option>
                )}
                {el.role === "USER" ? (
                  <option value="user" selected>
                    USER
                  </option>
                ) : (
                  <option value="user">USER</option>
                )}
              </select>
              {isActive && (
                <button
                  className="users-cards-body-apply"
                  onClick={() => changeRole(el.username)}
                >
                  Apply
                </button>
              )}
              <div className="users-cards-body-third-block">
                {el.role || "Not Found"}
              </div>
            </div>
          );
        })}
    </>
  );
};

export default UsersCards;
