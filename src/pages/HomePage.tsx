"use client";

import { useReducer } from "react";
import HomeNavBar from "../components/HomeNavBar";
import { ActionType } from "../utils/types";
import SignupModal from "../components/SignupModal";
import LoginModal from "../components/LoginModal";

const reduceSignup = (
  state: { isOpen: boolean },
  action: { type: ActionType }
) => {
  switch (action.type) {
    case ActionType.CLOSE:
      return { ...state, isOpen: false };
    case ActionType.OPEN:
      return { ...state, isOpen: true };
    default:
      return state;
  }
};

const reduceLogin = (
  loginModState: { isOpen: boolean },
  action: { type: ActionType }
) => {
  switch (action.type) {
    case ActionType.CLOSE:
      return { ...loginModState, isOpen: false };
    case ActionType.OPEN:
      return { ...loginModState, isOpen: true };
    default:
      return loginModState;
  }
};

const HomePage = () => {
  const [state, dispath] = useReducer(reduceSignup, { isOpen: false });
  const [loginModState, dispathLogin] = useReducer(reduceLogin, {
    isOpen: false,
  });
  return (
    <section className="bg-gray-light min-h-screen relative overflow-hidden">
      <HomeNavBar
        onSignUp={() => dispath({ type: ActionType.OPEN })}
        onLogin={() => dispathLogin({ type: ActionType.OPEN })}
      />
      <div className="lg:grid lg:grid-cols-2 lg:gap-5">
        <div className="lg:col-span-1 text-primary lg:ml-36 ml-10 mt-4">
          <h1 className=" font-primary font-bold text-6xl mb-4">Journey</h1>
          <h2 className=" font-primary font-medium md:text-4xl mb-4 text-2xl">
            Beyond words
          </h2>
          <h4 className=" font-secondary font-normal md:text-xl mb-6 w-80 text-lg">
            Navigate the world, capture the heart
          </h4>
          <p className=" font-secondary font-light md:text-lg w-80 text-justify text-base">
            Embark on a digital journey of wonderlust with our Travel journal
            app. Capture your globetrotting experiences through personalized
            entries, vivid images and interactive maps
          </p>
        </div>
        <div className="lg:col-span-1 md:translate-x-1/4 lg:translate-x-0 md:mt-12 lg:mt-0 mb-36">
          <div>
            <img src="/home-ill.png" alt="travel illustration" />
          </div>
        </div>
      </div>
      <div className=" absolute bottom-0 left-0 w-full bg-primary h-1/6"></div>
      <SignupModal
        onClose={() => dispath({ type: ActionType.CLOSE })}
        isOpen={state.isOpen}
      />
      <LoginModal
        isOpen={loginModState.isOpen}
        onClose={() => dispathLogin({ type: ActionType.CLOSE })}
      />
    </section>
  );
};

export default HomePage;
