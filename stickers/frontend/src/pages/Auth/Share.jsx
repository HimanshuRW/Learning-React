import styles from "./Share.module.css";

export default function Share() {
  return <h1>Share</h1>;
}

// async function loadData() {
//   try {
//     const token = localStorage.getItem("authToken");
//     if (token == null) return redirect("/landing");
//     const response = await fetch("http://localhost:8080/user/" + token);
//     if (!response.ok) {
//       return redirect("/landing");
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     let data = {
//       name: "Himanshu Rawat",
//       email: "himanshurw@gmail.com",
//       stickers: 22,
//     };
//     console.log("loader khatam");
//     return data;
//   }
// }
// export const loader = async () => {
//   console.log("inside outter loader");
//   return loadData(); // its a promise tey to resolve
// };
