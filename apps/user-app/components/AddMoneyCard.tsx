"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { TextInput } from "@repo/ui/textInput";
import { createOnRampTransactions } from "../app/lib/actions/createOnRampTransaction";
import prisma from "@repo/db/client";
import { useSession } from "next-auth/react";
import { authOptions } from "../app/lib/auth";

const SUPPORTED_BANKS = [
  {
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com",
  },
  {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/",
  },
];



export const AddMoney = () => {
  const [redirectUrl, setRedirectUrl] = useState(
    SUPPORTED_BANKS[0]?.redirectUrl
  );

  const [amount  , setAmount] = useState(0);
  const [provider , setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
  const [error , setError] = useState<boolean>(false);



  return (
    <Card title="Add Money">
      <div className="w-full">
        <TextInput
          label={"Amount"}
          placeholder={"Amount"}
          onChange={(value) => setAmount(Number(value))}
        />
        <div className="py-4 text-left">Bank</div>
        <Select
          onSelect={(value: string) => {
            setRedirectUrl(
              SUPPORTED_BANKS.find((x) => x.name === value)?.redirectUrl || ""
            );
          }}
          options={SUPPORTED_BANKS.map((x) => ({
            key: x.name,
            value: x.name,
          }))}
        />
        <div className="flex justify-center pt-4">
          <Button
            onClick={async () => {
                await createOnRampTransactions(amount*100 , provider)
              window.location.href = redirectUrl || "";
            }}
          >
            Add Money
          </Button>
        </div>
      </div>
    </Card>
  );
};
