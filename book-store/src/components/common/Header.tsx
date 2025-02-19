import ThemeSwitcher from "components/header/ThemeSwitcher";
import React, { useState } from "react";
import styled from "styled-components";
import logo from "../../assets/images/logo.png";
import {
  FaAngleRight,
  FaBars,
  FaRegUser,
  FaSignInAlt,
  FaUserCircle,
} from "react-icons/fa";
import { useCategory } from "hooks/useCategory";
import { useAuthStore } from "store/autStore";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";

function Header() {
  const { category } = useCategory();
  const { isLoggedIn, storeLogout } = useAuthStore();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <HeaderStyle $isMobileOpen={isMobileOpen}>
      <h1>
        <img src={logo} alt="book store" />
      </h1>
      <nav className="category">
        <button
          className="menu-button"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          {isMobileOpen ? <FaAngleRight /> : <FaBars />}
        </button>
        <ul>
          {category.map((item) => (
            <li key={item.id}>
              <a href={`/books?category_id=${item.id}`}>{item.name}</a>
            </li>
          ))}
        </ul>
      </nav>
      <nav className="auth">
        <Dropdown toggleButton={<FaUserCircle />}>
          <>
            {!isLoggedIn && (
              <ul>
                <li>
                  <Link to="/cart">Shopping cart</Link>
                </li>
                <li>
                  <Link to="/orderList">Order list</Link>
                </li>
                <li>
                  <button>Logout</button>
                </li>
              </ul>
            )}
            {!isLoggedIn && (
              <ul>
                <li>
                  <a href="/login">
                    <FaSignInAlt />
                    login
                  </a>
                </li>
                <li>
                  <a href="/sign-up">
                    <FaRegUser />
                    sign-up
                  </a>
                </li>
              </ul>
            )}
            <ThemeSwitcher />
          </>
        </Dropdown>
      </nav>
      <ThemeSwitcher />
    </HeaderStyle>
  );
}

interface HeaderStyleProps {
  $isMobileOpen: boolean;
}

const HeaderStyle = styled.header<HeaderStyleProps>`
  width: 100%;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.layout.width.large};

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid ${({ theme }) => theme.color.background};

  .logo {
    img {
      width: 200px;
    }
  }

  .category {
    .menu-button {
      display: none;
    }

    ul {
      display: flex;
      gap: 32px;
      li {
        a {
          font-size: 1.5rem;
          font-weight: 500;
          text-decoration: none;
          color: ${({ theme }) => theme.color.text};

          &:hover {
            color: ${({ theme }) => theme.color.primary};
          }
        }
      }
    }
  }

  .auth {
    ul {
      display: flex;
      flex-direction: column;
      gap: 16px;
      width: 100px;

      li {
        a,
        button {
          display: flex;
          justify-content: center;
          width: 100%;
          align-item: center;
          line-height: 1;
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none;

          svg {
            margin-right: 6px;
          }
        }
      }
    }
  }

  @media screen AND ${({ theme }) => theme.mediaQuery.mobile} {
    height: 52px;

    .logo {
      padding: 0 0 0 12px;

      img {
        width: 140px;
      }
    }

    .auth {
      position: absolute;
      top: 12px;
      right: 12px;
    }

    .category {
      .menu-button {
        position: absolute;
        top 14px;
        right: ${({ $isMobileOpen }) => ($isMobileOpen ? "62%" : "52px")};
        display: flex;
        background: #fff;
        border: 0;
        font-size: 1.5rem;
      }

      ul {
        position: fixed;
        top: 0;
        right: ${({ $isMobileOpen }) => ($isMobileOpen ? "0" : "-100")};
        width: 60%;
        height: 100vh;
        background: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        transition: right 0.3s ease-in-out;

        margin: 0;
        padding: 24px;
        z-index: 1000;

        flex-direction: column;
      }
    }
  }
`;

export default Header;
