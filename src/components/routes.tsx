import clsx from "clsx";
import { NavLink } from "react-router-dom";

const routes = [
  { name: "Home", path: "/" },
  { name: "Favorites", path: "/favorites" },
];

const Routes = () => {
  return (
    <div className="flex border px-4 py-5 shadow-md md:px-8">
      <div className="container flex space-x-4 ">
        {routes.map((route, idx) => {
          return (
            <NavLink
              key={idx}
              to={route.path}
              data-cy={route.name}
              className={({ isActive }) =>
                clsx(
                  isActive &&
                    "underline decoration-simbase-orange-800 underline-offset-4",
                  "text-xl font-bold text-simbase-blue-900 underline-offset-4 hover:underline hover:decoration-orange-500",
                )
              }
            >
              {route.name}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default Routes;
