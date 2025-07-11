"use client";

import React from "react";

import { useBalanceSelector } from "@repo/store/balance";

const page = () => {
  const balance = useBalanceSelector((state) => state.balance.value);
  return <div>hi there {balance}</div>;
};

export default page;
