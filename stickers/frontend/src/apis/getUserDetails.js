const url = "http://localhost:8080/user/";

export default async function getUserDeails() {
    try {
        const token = localStorage.getItem("authToken");
        if (token == null) return { success: false, redirect: true };
        const response = await fetch(url + token);
        // make a request for checking if user have profit or loss and by how much % if sell right now
        if (!response.ok) return { success: false, redirect: true };

        let userData = await response.json();
        return { success: true, ...userData };
    } catch (error) {
        // return {success : false, redirect : false , msg : "Not able to connect Server.. Try Later !"};
        // error page
        let userData = {
            name: "Himanshu",
            email: "himanshurw@gmail.com",
            coins: 2,
            avg: 85
        }
        return {
            success : true,
            ...userData
        }
    }
}