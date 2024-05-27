import React, { useState } from "react";
import LogoImg from "../../assets/logo.svg";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase";
import { setToaster } from "../../features/redux/UserSlice";
import { useDispatch } from "react-redux";
const initForm = {
  email: "",
  password: "",
};

const AuthScreen = () => {
  const dispatch = useDispatch();
  const [isLogin, setIslogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const authText = isLogin
    ? "Dont have any account ?"
    : "Already have an account";

  const [form, setForm] = useState(initForm);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleAuth = async (e) => {
    // call when user try to sign in and when user create account.
    e.preventDefault();
    try {
      setLoading(true); //disable button if user authenticated.
      if (isLogin) {
        await signInWithEmailAndPassword(auth, form.email, form.password);
      } else {
        await createUserWithEmailAndPassword(auth, form.email, form.password);
      }
    } catch (err) {
      const msg = err.code.split("auth/")[1].split("-").join(" ");
      dispatch(setToaster(msg));
      setLoading(false);
    }
  };
  return (
    <div className="container max-w-[444px] mx-auto mt-[80px] text-center">
      <div className="flex flex-col  items-center">
        <img src={LogoImg} alt="logo" />
        <p className="text-[rgba(255,255,255,0.6)] mt-[32px]">
          Visualize Your Workflow for Increased Productivity. <br />
          Access Your Tasks Anytime, Anywhere
        </p>
      </div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="">
          <form className="">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  autoComplete="email"
                  placeholder="Email"
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-[1px] outline-none py-[16px] px-[14px] bg-transparent border-[#333] hover:border-white focus:border-purple-600 "
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  onChange={handleChange}
                  value={form.password}
                  type="password"
                  placeholder="password"
                  required
                  className="block w-full rounded-md border-[1px] outline-none py-[16px] px-[14px] bg-transparent border-[#333] hover:border-white focus:border-purple-600 "
                />
              </div>
            </div>

            <div>
              <button
                onClick={handleAuth}
                disabled={
                  loading || !form.email.trim() || !form.password.trim()
                }
                type="submit"
                className="mt-[22px] bg-[rgba(255,255,255,0.12)] w-full  px-[22px] py-[8px] bg-purple-700 hover:bg-purple-500 text-white disabled:bg-purple-950"
              >
                {isLogin ? "Login" : "Sign-up"}
              </button>
            </div>
          </form>
        </div>
        <p
          onClick={() => setIslogin(!isLogin)}
          className="mt-[8px] cursor-pointer"
        >
          {authText}
        </p>
      </div>
    </div>
  );
};

export default AuthScreen;
