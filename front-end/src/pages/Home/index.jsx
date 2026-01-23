import { NavLink } from "react-router";

function Home() {
  return (
    <>
      <NavLink to="/signup">All Concerts</NavLink>
      <NavLink to="/animals/new">Register an Animal</NavLink>
    </>
  )
}

export default Home