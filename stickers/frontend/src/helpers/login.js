import { redirect } from "react-router-dom";
export default async function loginAction(formData) {
    const formBody = {
      title: formData.get("email"),
      image: formData.get("pass"),
    };
    console.log("formbody : ",formBody);
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formBody),
      });
      if (!response.ok) {
        console.log("wrong credential");
        return {for:"login",msg : "Wrong Credentials..."};
      }
      const data = await response.json();
      localStorage.setItem("authToken",data.token);
      console.log("saved");
      
      return redirect("/profile");
    } catch (error) {
      return {for:"login",msg : "Server Issue..."};
    }
  }