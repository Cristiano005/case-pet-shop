import { NavLink } from "react-router";

function Home() {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/signup">All Concerts</NavLink>
                    </li>
                    <li>
                        <NavLink to="/animals/new">Register an Animal</NavLink>
                    </li>
                    <li>
                        <NavLink to="/appointments/new">Create an Appointment</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Home