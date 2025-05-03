import { Outlet, Link } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/create-lobby">Create Lobby</Link>
          </li>
          <li>
            <Link to="/join-lobby">Join Lobby</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};
  
export default DefaultLayout;