import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-gray-200 w-full h-screen flex flex-col justify-center items-center">
      <div className="text-7xl text-green-600 font-bold">SendMoney</div>
      <div className="flex gap-14 mt-5">
        <Link
          className="px-3 py-2 rounded bg-blue-300 text-black"
          to={"/signup"}
        >
          Sign up
        </Link>
        <Link
          className="px-3 py-2 rounded bg-blue-300 text-black"
          to={"/signin"}
        >
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default Home;
