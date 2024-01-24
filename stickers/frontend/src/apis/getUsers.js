const url = "http://localhost:8080/search/";

export default async function getUsers(keyword) {
    try {
        const response = await fetch(url + keyword);
        // make a request for checking if user have profit or loss and by how much % if sell right now
        if (!response.ok) return { success: false, msg: "Not able to connect Server.. Try Later !" };

        let userData = await response.json();
        return { success: true, usersList: userData };
    } catch (error) {
        // return {success : false , msg : "Not able to connect Server.. Try Later !"};

        // sorting logic 
        let mykeyword = new RegExp(keyword,'i');
        let myResponse = await fetch("http://localhost:3000/db/users.json");
        let data = await myResponse.json();
        data = data.filter(personObj=>{
            return(mykeyword.test(personObj.name))
        });
        return { success : true, usersList : data};
    }
}