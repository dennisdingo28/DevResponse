"use client"
import { Tab } from "@headlessui/react";

import React, { useState } from "react";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

const AuthTabs = () => {
  const [loginForm,setLoginForm] = useState<boolean>(true);

  return (
    <div>
      <Tab.Group defaultIndex={0}>
        <Tab.Panels>
          <Tab.Panel>
            <LoginForm/>
          </Tab.Panel>
          <Tab.Panel>
            <RegisterForm/>
          </Tab.Panel>
        </Tab.Panels>
        <Tab.List>
          <Tab onClick={()=>setLoginForm(true)} className={`${loginForm ? "opacity-0 -z-10 absolute":"opacity-100 z-0 text-slate-500 text-[.9em] mt-3 hover:underline"}`}>I already have an account</Tab>
          <Tab onClick={()=>setLoginForm(false)} className={`${loginForm ? "opacity-100 z-0 text-slate-500 text-[.9em] mt-3 hover:underline":"opacity-0 -z-10 absolute"}`}>Create new account</Tab>
        </Tab.List>
      </Tab.Group>
    </div>
  );
};

export default AuthTabs;
