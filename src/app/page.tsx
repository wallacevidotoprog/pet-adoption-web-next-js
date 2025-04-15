"use client";
import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setLoading(true)}>
        ON
      </button>
      <button type="button" onClick={() => setLoading(false)}>
        OF
      </button>
    </>
  );
}
