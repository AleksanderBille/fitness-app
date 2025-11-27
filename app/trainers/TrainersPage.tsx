"use client"

import { useState } from "react";
import CreateUserComponent from "../components/CreateUserComponent";

export default function TrainersPage() {

  return(
    <div className="flex min-h-screen">
      <CreateUserComponent 
        setClientList={null}
      />
    </div>
  );
}