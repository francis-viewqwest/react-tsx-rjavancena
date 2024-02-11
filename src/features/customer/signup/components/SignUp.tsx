import { Link } from "react-router-dom";
const SignUp: React.FC = () => {
  return (
    <>
      <div className="w-full h-screen p-4 py-44 md:flex items-center max-w-[1200px] m-auto">
        <form className="m-auto lg:p-8 flex flex-col gap-4 lg:w-2/6 rounded-md">
          <div className="flex flex-col items-center m-auto gap-3 mb-10">
            <h1 className="text-3xl font-bold">Create Your Account</h1>
            <p className="text-sm">
              Get started with RJ Avancena Enterprises and enjoy a seamless
              shopping experience.
            </p>
          </div>
          <label className="form-control w-full">
            <input
              type="text"
              placeholder="Email Address"
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
          <label className="form-control w-full">
            <input
              type="password"
              placeholder="Confirm Password"
              className="input input-bordered w-full"
            />
          </label>

          <button className="btn btn-md bg-btnprimary w-full text-white mt-10">
            Sign Up
          </button>
          <div className="text-sm text-center flex gap-1 m-auto">
            Already have an account?
            <span className="font-bold">
              <Link to="/signin">Sign In</Link>
            </span>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
