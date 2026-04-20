import React from "react";
import { Button } from "@/components/ui/button";

const createUser = () => {
  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold mx-1 my-5">Create New Petty Cash</h1>
      </div>
      <div>
        <form className="mx-5" action="">
          <label className="mr-4">Username:</label>
          <input
            className="w-[30%] p-3 my-3.75 box-border border-3 rounded-lg outline-none"
            placeholder="Username"
            type="text"
            id="username"
            name="username"
          />
          <br />
          <label className="mr-5.5">Password:</label>
          <input
            placeholder="Password"
            type="password"
            id="password"
            name="password"
            className="w-[30%] p-3 my-3.75 box-border border-3 rounded-lg outline-none"
          />
          <br />
          <label className="mr-13.5">Email:</label>
          <input
            className="w-[30%] p-3 my-3.75 box-border border-3 rounded-lg outline-none"
            placeholder="Email"
            type="text"
            id="email"
            name="email"
          />
          <br />
          <label className="mr-15.5">Role:</label>
          <select className="w-[30%] p-3 my-3.75 box-border border-3 rounded-lg outline-none">
            <option>--Select a role--</option>
            <option>store</option>
            <option>admin</option>
            <option>supreme admin</option>
            <option>area coach</option>
            <option>regional coach</option>
            <option>finance</option>
            <option>HR office</option>
            <option>Q and A</option>
          </select>
          <br />
          <div className="flex items-center my-5">
            <Button className="cursor-pointer ml-25 h-15 w-[30%]">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default createUser;
