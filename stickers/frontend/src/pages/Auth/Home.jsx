import { Await, redirect, useLoaderData } from "react-router-dom";
import { Fragment, Suspense } from "react";
import styles from "./Home.module.css";

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
  console.log("loaded");
  const data = useLoaderData();
  console.log("data aaa gaya : ",data);
  console.log("himanshu");

  return (
    <div className={styles.profileCard + " center"}>
      <Suspense fallback={<h2 style={{ textAlign: "center" }}>Loading....</h2>}>
        <Await resolve={data}>
          {(resolvedData) => <ProfileCard data={resolvedData} />}
        </Await>
      </Suspense>
    </div>
  );
}
async function loadData(){
  try {
    const token = localStorage.getItem("authToken");
    if (token == null) return redirect("/landing");
    const response = await fetch("http://localhost:8080/token/" + token);
      if (!response.ok) {
        return redirect("/landing");
      }
    const data = await response.json();
    return data;
  } catch (error) {
    let data = {
      name: "Himanshu Rawat",
      email: "himanshurw@gmail.com",
      stickers: 22,
    };
    console.log("loader khatam");
    return data;
  }
}
export const loader = async () => {
  console.log("inside outter loader");
    return loadData(); // its a promise tey to resolve
}