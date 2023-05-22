import React from "react";

export default function FilterData({ data }) {
  return (
    <ul>
      {data.map((poz, i) => (
        <li key={i}>{poz.title}</li>
      ))}
    </ul>
  );
}