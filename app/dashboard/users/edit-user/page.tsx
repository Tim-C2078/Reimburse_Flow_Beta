"use client";

import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

const EditUser = () => {
  const searchParams = useSearchParams();

  const id = searchParams.get("id");
  const username = searchParams.get("username");
  const role = searchParams.get("role");

  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold mx-1 my-5">
          Change User Information
        </h1>
      </div>

      <div>
        <form className="mx-5 space-y-5" action="">
          <div>
            <label className="inline-block w-[180px]">Current Username:</label>
            <input
              className="w-[30%] p-3 box-border border-3 rounded-lg outline-none"
              placeholder="Username"
              type="text"
              id="username"
              name="username"
              value={username || ""}
              readOnly
            />
          </div>

          <div>
            <label className="inline-block w-[180px]">Role:</label>
            <input
              placeholder="Role"
              type="text"
              id="role"
              name="role"
              value={role || ""}
              className="w-[30%] p-3 box-border border-3 rounded-lg outline-none"
              readOnly
            />
          </div>

          <div>
            <label className="inline-block w-[180px]">Change Username:</label>
            <input
              className="w-[30%] p-3 box-border border-3 rounded-lg outline-none"
              placeholder="Change Username:"
              type="text"
              id="username"
              name="change_username"
            />
          </div>

          <div>
            <label className="inline-block w-[180px]">Change Password:</label>
            <input
              className="w-[30%] p-3 box-border border-3 rounded-lg outline-none"
              placeholder="Change Password"
              type="password"
              id="password"
              name="change_password"
            />
          </div>

          <div>
            <label className="inline-block w-[180px]">Confirm Password:</label>
            <input
              className="w-[30%] p-3 box-border border-3 rounded-lg outline-none"
              placeholder="Confirm Password"
              type="password"
              id="password"
              name="confirm_password"
            />
          </div>

          <div>
            <Button className="rounded-lg cursor-pointer ml-45 h-15 w-[30%] hover:bg-white hover:text-black hover:border-1 hover:border-black">
              Submit Change
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditUser;
