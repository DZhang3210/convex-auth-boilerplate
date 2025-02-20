"use client";
import React, { useState } from "react";
import { SignInFlow } from "./types";
import SignInCard from "./sign-in-card";
import SignUpCard from "./sign-up-card";

const AuthScreen = () => {
  const [state, setState] = useState<SignInFlow>("signIn");
  return (
    <div className="h-screen w-full flex items-center justify-center bg-white overflow-hidden">
      <div className="md:h-auto md:w-[600px] flex flex-col">
        <div className="text-2xl font-bold">Logo</div>
        {state === "signIn" ? (
          <SignInCard setState={setState} />
        ) : (
          <SignUpCard setState={setState} />
        )}
      </div>
    </div>
  );
};

export default AuthScreen;
