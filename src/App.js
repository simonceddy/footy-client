import { /* NavLink,  */useOutlet } from 'react-router-dom';
// import routes from './routes';

function App() {
  const outlet = useOutlet();
  return (
    <div className="col justify-center items-center relative w-full h-full dark:bg-black dark:text-lime-300">
      {/* <div className="row w-full h-[10%] justify-center items-center"> */}
      {/* {routes.map(({ path }) => (
          <NavLink
            to={path}
            className="hover:underline m-2 capitalize nav-link"
            key={`route-navlink-${path}`}
          >
            {path}
          </NavLink>
        ))} */}
      {/* </div> */}
      <div className="flex-1 w-full h-full col justify-start items-center">
        {outlet}
      </div>
    </div>
  );
}

export default App;
