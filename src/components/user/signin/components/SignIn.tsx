import { Link } from "react-router-dom";
import rjlogo from "../../../../assets/rjavancenalogo.svg";

const SignIn: React.FC = () => {
  return (
    <>
      <div className="w-full h-screen p-4 py-44 md:flex items-center max-w-[1200px] m-auto">
        <form className="m-auto lg:p-8 flex flex-col gap-4 lg:w-2/6 rounded-md">
          <div className="flex items-center m-auto gap-3 mb-10">
            <img className="w-10" src={rjlogo} alt="RJ Avancena Logo" />
            <h1 className="font-bold text-2xl">RJ AVANCENA</h1>
          </div>
          <label className="form-control w-full">
            <input
              type="text"
              placeholder="Email"
              className="input input-bordered w-full"
            />
          </label>
          <label className="form-control w-full">
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
            />
          </label>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center">
              <input type="checkbox" className="checkbox" />
              <label className="label cursor-pointer">
                <span className="label-text sm:text-md">Remember me</span>
              </label>
            </div>
            <div>
              <label className="label-text sm:text-md">
                <Link to="/">Forgot Password?</Link>
              </label>
            </div>
          </div>
          <button className="btn btn-md bg-btnprimary w-full text-white mt-10">
            Sign In
          </button>
          <div className="text-sm text-center flex gap-1 m-auto">
            Don’t have an account?
            <span className="font-bold">
              <Link to="/signup">Sign Up</Link>
            </span>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignIn;
