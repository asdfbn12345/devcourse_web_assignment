import ThemeSwitcher from "components/header/ThemeSwitcher";
import React from "react";
import styled from "styled-components";
import logo from "../../assets/images/logo.png";
import { FaRegUser, FaSignInAlt } from "react-icons/fa";
import { useCategory } from "hooks/useCategory";
import { useAuthStore } from "store/autStore";
import { Link } from "react-router-dom";

function Header() {
  const { category } = useCategory();
  const { isLoggedIn, storeLogout } = useAuthStore();

  return (
    <HeaderStyle>
      <h1>
        <img src={logo} alt="book store" />
      </h1>
      <nav className="category">
        <ul>
          {category.map((item) => (
            <li key={item.id}>
              <a href={`/books?category_id=${item.id}`}>{item.name}</a>
            </li>
          ))}
        </ul>
      </nav>
      <nav className="auth">
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
      </nav>
      <ThemeSwitcher />
    </HeaderStyle>
  );
}

const HeaderStyle = styled.header`
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
      gap: 16px;
      li {
        a {
          display: flex;
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
`;

export default Header;
