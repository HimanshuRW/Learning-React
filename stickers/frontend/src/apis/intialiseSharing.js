const url = "http://localhost:8080/sharing/";

export default async function sharingDetails() {
    try {
        const token = localStorage.getItem("authToken");
        if (token == null) return { success: false, redirect: true };
        const response = await fetch(url + token);
        // make a request for checking if user have profit or loss and by how much % if sell right now
        if (!response.ok) return { success: false, redirect: true };

        let sharingData = await response.json();
        return { success: true, ...sharingData };
    } catch (error) {
        // return {success : false, redirect : false , msg : "Not able to connect Server.. Try Later !"};


        let sharingData = {
            giveTo : [
                {name : "Avinash Rw", coins : 2},
                {name : "Advitiya", coins : 5},
                {name : "Nikunj", coins : 3},
            ],
            askedTo : [
                {name : "Avinash Rw", coins : 2},
                {name : "Advitiya", coins : 5},
                {name : "Nikunj", coins : 3},
            ] 
        }
        return {
            success : true,
            ...sharingData
        }
    }
}