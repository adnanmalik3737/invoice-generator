// src/components/Sidebar.js
import React from "react";
import { Link } from "react-router-dom";

function Sidebar({ isVisible }) {
  return (
    <div className="sidebar" style={{ display: isVisible ? "none" : "block" }}>
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
      <div className="navlist">
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
          >
            <g opacity="0.9">
              <path
                d="M9.41775 8.02931H11.823C12.1082 8.02931 12.3384 7.7991 12.3384 7.51391V5.10867C12.3384 4.82348 12.1082 4.59326 11.823 4.59326H9.41775C9.13256 4.59326 8.90234 4.82348 8.90234 5.10867V7.51391C8.90234 7.7991 9.13256 8.02931 9.41775 8.02931ZM9.93316 5.62236H11.3076V6.99678H9.93316V5.62236Z"
                fill="white"
                stroke="white"
                stroke-width="0.4"
              />
              <path
                d="M18.0787 1.14355H8.73088C7.11937 1.14355 5.81024 2.45441 5.81024 4.0642V5.96434H3.90838C2.30375 5.96434 0.998047 7.27004 0.998047 8.87467V15.8258C0.998047 17.4304 2.30375 18.7361 3.90838 18.7361H13.9537C15.1924 18.7361 16.3589 18.2534 17.2351 17.3772C18.1113 16.501 18.5941 15.3362 18.5941 14.0958V1.65896C18.5941 1.37377 18.3639 1.14355 18.0787 1.14355ZM3.90838 6.99515H5.80852V10.091H2.02886V8.87467C2.02886 7.8387 2.87241 6.99515 3.90838 6.99515ZM3.91869 17.7053H3.90838C2.87241 17.7053 2.02886 16.8618 2.02886 15.8258V11.1219H5.81024V15.8258C5.81024 16.8618 4.96669 17.7053 3.93072 17.7053H3.91869ZM17.5633 14.0975C17.5633 16.0869 15.9449 17.707 13.9537 17.707H6.15041C6.57991 17.2002 6.84105 16.5439 6.84105 15.8275V4.0642C6.84105 3.02136 7.68976 2.17437 8.73088 2.17437H17.5633V14.0975Z"
                fill="white"
                stroke="white"
                stroke-width="0.4"
              />
              <path
                d="M9.41775 11.1216H14.9756C15.2608 11.1216 15.491 10.8914 15.491 10.6062C15.491 10.321 15.2608 10.0908 14.9756 10.0908H9.41775C9.13256 10.0908 8.90234 10.321 8.90234 10.6062C8.90234 10.8914 9.13256 11.1216 9.41775 11.1216ZM9.41775 14.2158H14.9756C15.2608 14.2158 15.491 13.9856 15.491 13.7004C15.491 13.4152 15.2608 13.185 14.9756 13.185H9.41775C9.13256 13.185 8.90234 13.4152 8.90234 13.7004C8.90234 13.9856 9.13256 14.2158 9.41775 14.2158Z"
                fill="white"
                stroke="white"
                stroke-width="0.4"
              />
            </g>
          </svg>
        </span>
        <NavItem
          title="Billing"
          subItems={["Create Invoice", "History", "User Profile"]}
        />
      </div>
      <div className="navlist">
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
          >
            <path
              d="M9.23125 11.375L10.5 10.4344L11.7469 11.375C11.8781 11.4771 12.0094 11.4844 12.1406 11.3969C12.2719 11.3094 12.3156 11.1854 12.2719 11.025L11.7906 9.47187L13.125 8.44375C13.2417 8.34166 13.2745 8.21771 13.2234 8.07187C13.1724 7.92604 13.0667 7.85312 12.9063 7.85312H11.3094L10.8063 6.23437C10.7625 6.07396 10.6641 5.99375 10.5109 5.99375C10.3578 5.99375 10.2521 6.07396 10.1938 6.23437L9.66875 7.85312H8.09375C7.93333 7.85312 7.8276 7.92604 7.77656 8.07187C7.72552 8.21771 7.75833 8.34166 7.875 8.44375L9.20938 9.47187L8.72813 11.025C8.68438 11.1854 8.72813 11.3094 8.85938 11.3969C8.99063 11.4844 9.11458 11.4771 9.23125 11.375ZM6.2125 19.8406C6.00833 19.9135 5.81146 19.8844 5.62188 19.7531C5.43229 19.6219 5.3375 19.4396 5.3375 19.2062V13.475C4.68125 12.7896 4.21094 12.0385 3.92656 11.2219C3.64219 10.4052 3.5 9.58125 3.5 8.75C3.5 6.76667 4.17083 5.10417 5.5125 3.7625C6.85417 2.42083 8.51667 1.75 10.5 1.75C12.4833 1.75 14.1458 2.42083 15.4875 3.7625C16.8292 5.10417 17.5 6.76667 17.5 8.75C17.5 9.58125 17.3578 10.4052 17.0734 11.2219C16.7891 12.0385 16.3188 12.7896 15.6625 13.475V19.2062C15.6625 19.4396 15.5677 19.6219 15.3781 19.7531C15.1885 19.8844 14.9917 19.9135 14.7875 19.8406L10.5 18.3969L6.2125 19.8406ZM10.5 14.4375C12.0896 14.4375 13.4349 13.887 14.5359 12.7859C15.637 11.6849 16.1875 10.3396 16.1875 8.75C16.1875 7.16042 15.637 5.8151 14.5359 4.71406C13.4349 3.61302 12.0896 3.0625 10.5 3.0625C8.91042 3.0625 7.5651 3.61302 6.46406 4.71406C5.36302 5.8151 4.8125 7.16042 4.8125 8.75C4.8125 10.3396 5.36302 11.6849 6.46406 12.7859C7.5651 13.887 8.91042 14.4375 10.5 14.4375ZM6.65 18.2875L10.5 17.0844L14.35 18.2875V14.5469C13.7667 14.9698 13.1396 15.276 12.4688 15.4656C11.7979 15.6552 11.1417 15.75 10.5 15.75C9.85833 15.75 9.20208 15.6552 8.53125 15.4656C7.86042 15.276 7.23333 14.9698 6.65 14.5469V18.2875Z"
              fill="white"
            />
          </svg>
        </span>
        <NavItem
          title="Pro Features"
          subItems={[
            "PDF Templates",
            "Attach with Different Websites",
            "Professional Business Use",
          ]}
        />
      </div>
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

export default Sidebar;
