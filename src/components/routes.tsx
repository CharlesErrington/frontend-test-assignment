import clsx from "clsx";
import { NavLink } from "react-router-dom";

const routes = [
  { name: "Home", path: "/" },
  { name: "Favorites", path: "/favorites" },
];

const Routes = () => {
  return (
    <div className="flex py-5 px-4 md:px-8 border shadow-md">
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
                    "underline-offset-4 decoration-orange-500 underline",
                  "text-xl font-bold text-blue-950 underline-offset-4 hover:underline hover:decoration-orange-500"
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
