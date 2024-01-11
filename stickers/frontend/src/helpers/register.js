import { redirect } from "react-router-dom";

export default async function registerAction(formData) {
    const pass1 = formData.get("pass");
    const pass2 = formData.get("confPass");
    if(pass1!==pass2){
      return {for:"register",msg : "Password and Confirm Password does not match"};
    }
    const formBody = {
      email: formData.get("email"),
      name: formData.get("name"),
      pass: pass1,
    };
    console.log("formbody : ",formBody);
    try {
      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formBody),
      });
      
      const data = await response.json();
      if (!response.ok) {
        return {for:"register",msg : data.msg};
      }
      localStorage.setItem("authToken",data.token);
      console.log("saved");
      
      return redirect("/");
    } catch (error) {
      console.log("server issue");
      return {for:"register",msg : "Server Issue..."};
    }
  }