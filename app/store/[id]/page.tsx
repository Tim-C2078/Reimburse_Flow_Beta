import React from "react";

async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // Fetch using the id
  // const response = await fetch(`${process.env.API_URL}/petty-cash/${id}`);
  // const pettyCash = await response.json();

  return <div>Petty Cash Record ID: {id}</div>;
}

export default EditPage;
