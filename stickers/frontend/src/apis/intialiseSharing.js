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
                {name : "Rajat", coins : 2, id:71},
                {name : "Nikunj", coins : 1, id:72},
                {name : "Koaml", coins : 3, id:73},
                {name : "Harry", coins : 3, id:75},
                {name : "Potter", coins : 5, id:74},
                {name : "Hagred", coins : 4, id:76},
                {name : "Yash", coins : 1, id:77},
                {name : "Animesh", coins : 2, id:78},
                {name : "Advitiya", coins : 3, id:79}
            ],
            askedTo : [
                {name : "Avinash Rw", coins : 2, id:201},
                {name : "Advitiya", coins : 5, id:202},
                {name : "Nikunj", coins : 3, id:203}
            ] 
        }
        return {
            success : true,
            ...sharingData
        }
    }
}