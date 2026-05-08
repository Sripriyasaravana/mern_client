import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="navbar">
      <NavLink to="/" className="brand-link">
        <img
          alt="MongoDB logo"
          className="brand-logo"
          src="https://d3cy9zhslanhfa.cloudfront.net/media/3800C044-6298-4575-A05D5C6B7623EE37/4B45D0EC-3482-4755-82DA37D8EA07D229/webimage-8A27671A-8A53-45DC-89D7BF8537F15A0D.png"
        />
        <div className="brand-copy">
          <span className="brand-text">MongoDB Employee Portal</span>
          <span className="brand-subtitle">Manage team records in one place</span>
        </div>
      </NavLink>

      <NavLink to="/create" className="button button-primary">
        Create Employee
      </NavLink>
    </header>
  );
}