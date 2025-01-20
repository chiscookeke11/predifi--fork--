"use client";
import { useState } from "react";
import { useAccount, useDisconnect } from "@starknet-react/core";
import { addressSlice } from "@/lib/helper";
import Conectors from "../conectors";
import { Button } from "../ui/button";
import ChevronDown from "@/svg/chevron-down";
import Link from "next/link";
import { routes } from "@/lib/route";

function Nav() {
  const [openModal, setModal] = useState(false);
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect({});
  const user = isConnected ? addressSlice(address ?? "") : "Connect Wallet";

  function modalHandler() {
    setModal((prev) => !prev);
  }
  return (
    <>
      {openModal && !isConnected && <Conectors setIsOpen={modalHandler} />}
      <div className="relative mt-6">
        <nav className="flex justify-between items-center  mt-4">
          <Link href={routes.home} className="text-xl font-normal">
            PrediFi
          </Link>
          <ul className="hidden justify-between items-center gap-4 sm:flex capitalize">
            <li>Features</li>
            <li>How it works</li>
            <li>about</li>
          </ul>
          <Button
            className="bg-transparent rounded-full hover:bg-transparent shadow-none border border-[#37B7C3] text-[#37B7C3]"
            onClick={modalHandler}
          >
            {user}
            <span
              className={`${
                openModal ? "-rotate-180" : "rotate-0"
              } transition-all duration-500`}
            >
              <ChevronDown />
            </span>
          </Button>
          {openModal && (
            <Button
              className={`fixed top-16 right-20 transition-all duration-500 text-[#37B7C3] border border-[#37B7C3] bg-inherit rounded-full hover:bg-transparent ${
                isConnected ? "block" : "hidden"
              }`}
              onClick={() => {
                disconnect();
                setModal((prev) => !prev);
              }}
            >
              Disconnect Wallet
            </Button>
          )}
        </nav>
      </div>
    </>
  );
}
export default Nav;
