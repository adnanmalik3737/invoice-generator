// src/components/Sidebar.js
import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="appLogo">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="52"
          height="32"
          viewBox="0 0 52 32"
          fill="none"
        >
          <path
            d="M39.9727 31.0247C39.296 31.0247 38.6105 30.8841 37.9514 30.5941L23.8903 24.3276C21.3769 23.2114 20.2432 20.2496 21.3593 17.736L27.6253 3.67373C28.7414 1.16011 31.703 0.0263404 34.2164 1.14253L48.2775 7.40901C50.791 8.5252 51.9247 11.4871 50.8086 14.0007L44.5427 28.0629C43.7078 29.9261 41.8797 31.0247 39.9727 31.0247ZM39.1202 27.9574C40.1836 28.432 41.4315 27.9486 41.9061 26.894L48.1722 12.8317C48.6467 11.7683 48.1633 10.5203 47.1087 10.0457L33.0388 3.7792C31.9754 3.3046 30.7275 3.78798 30.253 4.84265L23.987 18.9049C23.5124 19.9683 23.9958 21.2164 25.0503 21.691L39.1202 27.9574Z"
            fill="white"
          />
          <path
            d="M26.4206 13.4647L24.3466 18.1052C24.3202 18.1579 24.2938 18.2019 24.2675 18.2458L25.076 23.2379C25.2605 24.3892 24.4784 25.4703 23.3359 25.6548L8.13232 28.1157C7.57867 28.2036 7.01622 28.0718 6.55924 27.7466C6.10225 27.4214 5.80345 26.9292 5.71557 26.3755L3.25487 11.1708C3.16699 10.6171 3.29881 10.0546 3.62398 9.59754C3.94914 9.14052 4.44128 8.84169 4.99494 8.75381L20.1985 6.29292C20.3128 6.27534 20.427 6.26655 20.5325 6.26655C21.5431 6.26655 22.4483 7.00482 22.6153 8.04191L23.4326 13.0691L25.5769 8.26163L25.4627 7.58488C25.0232 4.86912 22.4571 3.01466 19.7415 3.45411L4.53795 5.915C3.22851 6.11714 2.06847 6.82904 1.2951 7.91007C0.512955 8.99111 0.205368 10.3094 0.416285 11.6278L2.87698 26.8325C3.0879 28.1509 3.79974 29.3022 4.88069 30.0844C5.73315 30.7084 6.74379 31.0248 7.78958 31.0248C8.05323 31.0248 8.32566 31.0073 8.5981 30.9633L23.8017 28.5024C26.5172 28.063 28.3715 25.4966 27.9321 22.7809L26.4206 13.4647Z"
            fill="white"
          />
        </svg>
        <p>Company Logo Here </p>
      </div>
      <NavItem title="Billing" subItems={["Create Invoice", "History"]} />
      <NavItem
        title="Pro Features"
        subItems={[
          "PDF Templates",
          "Attach with Different Websites",
          "Professional Business Use",
        ]}
      />
    </div>
  );
}

function NavItem({ title, subItems }) {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="nav-item">
      <div className="major-items" onClick={toggleDropdown}>
        {title}
      </div>
      {isDropdownOpen && (
        <div className="Navdropdown">
          {subItems.map((item, index) => (
            <Link
              key={index}
              to={`/${item.toLowerCase().replace(" ", "-")}`}
              className="sub-items"
            >
              {item}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

// function Sidebar() {
//   return (
//     <div className="sidebar">
//       <div className="logo">Logo</div>

//       <NavItem title="Billing" subItems={["Create Invoice", "History"]} />
//       <NavItem
//         title="Pro Features"
//         subItems={[
//           "PDF Templates",
//           "Attach with Different Websites",
//           "Professional Business Use",
//         ]}
//       />

//       <div className="major-items">
//         <Link to="/popup">Signature Popup</Link>
//         <Link to="/mainform">Invoice Maker</Link>
//         <Link to="/invoicebody">Invoice Body</Link>
//       </div>
//       <div className="sub-items">
//         <Link to="/fileupload">Upload File</Link>
//         <Link to="/sub2">Sub Item 2</Link>
//       </div>
//     </div>
//   );
// }

export default Sidebar;
