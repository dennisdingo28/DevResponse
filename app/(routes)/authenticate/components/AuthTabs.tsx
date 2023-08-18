"use client"
import { Tab } from "@headlessui/react";

import React from "react";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

const AuthTabs = () => {
  return (
    <div>
      <Tab.Group defaultIndex={0}>
        <Tab.Panels>
          <Tab.Panel>
            <div className="mt-3">
              <LoginForm/>
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <RegisterForm/>
          </Tab.Panel>
        </Tab.Panels>
        <Tab.List>
          <Tab>login</Tab>
          <Tab>Register</Tab>
        </Tab.List>
      </Tab.Group>
    </div>
  );
};

export default AuthTabs;
