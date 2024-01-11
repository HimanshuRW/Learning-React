import { Await, redirect, useLoaderData } from "react-router-dom";
import { Fragment, Suspense } from "react";

function ProfileCard({ data }) {
  return (
    <Fragment>
      <h2>Hi, {data.name}</h2>
      <div>
        <p>{data.email}</p>
        <p>Coins : {data.stickers}</p>
      </div>
    </Fragment>
  );
}

export default function Home() {
  const data = useLoaderData();
  console.log(data);
  console.log("himanshu");

  return (
    <div className="profile-card center">
      <Suspense fallback={<h2 style={{ textAlign: "center" }}>Loading....</h2>}>
        <Await resolve={data}>
          {(resolvedData) => <ProfileCard data={resolvedData} />}
        </Await>
      </Suspense>
    </div>
  );
}
async function loadData(){
    const token = localStorage.getItem("authToken");
  if (token == null) return redirect("/landing");
  try {
    const response = await fetch("http://localhost:8080/token/" + token);
    if (!response.ok) {
      return redirect("/landing");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    // return redirect("/landing");
    // todo : throw err to error page
    return {
      name: "Himanshu Rawat",
      email: "himanshurw@gmail.com",
      stickers: 22,
    };
  }
}
export const loader = async () => {
    return loadData(); // its a promise tey to resolve
}