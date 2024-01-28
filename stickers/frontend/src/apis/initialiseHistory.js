const url = "http://localhost:8080/history/";

export default async function sharingDetails() {
    try {
        const token = localStorage.getItem("authToken");
        if (token == null) return { success: false, redirect: true };
        const response = await fetch(url + token);
        // make a request for checking if user have profit or loss and by how much % if sell right now
        if (!response.ok) return { success: false, redirect: true };

        let data = await response.json();
        return { success: true, historyArray: data };
    } catch (error) {
        // return {success : false, redirect : false , msg : "Not able to connect Server.. Try Later !"};

        // status : given/received/purchased/sold
        // date
        // name : [purchased/sold]{JIITCOIN} {person ka naam}
        // coins : and its value at that time

        //JIIT COIN    7rs 6   date--

        let data = [
            { status : "purchased", coins: 2, value : 78, date:"26-01-2024" , price : 200},
            { status : "sold", coins: 2, value : 78, date:"26-01-2024" , price : 200},
            { name : "Meenal Rawat",status : "given", coins: 28, value : 78, date:"26-01-2024" , price : 200},
            { name : "Meenal Rawat",status : "given", coins: 28, value : 78, date:"26-01-2024" , price : 200},
            { name : "Meenal Rawat",status : "given", coins: 28, value : 78, date:"26-01-2024" , price : 200},
            { name : "Meenal Rawat",status : "given", coins: 28, value : 78, date:"26-01-2024" , price : 200},
            { name : "Meenal Rawat",status : "given", coins: 299, value : 78, date:"26-01-2024" , price : 200},
            { name : "Meenal Rawat",status : "given", coins: 2, value : 78, date:"26-01-2024" , price : 200},
            { name : "Himanshu Rawat",status : "received", coins: 2, value : 78, date:"26-01-2024" , price : 200},
            { name : "Himanshu Rawat",status : "received", coins: 2, value : 78, date:"26-01-2024" , price : 200},
            { name : "Himanshu Rawat",status : "received", coins: 2, value : 78, date:"26-01-2024" , price : 200},
        ];
        data.forEach(obj=>{
            if(obj.status=="purchased" || obj.status=="sold"){
                obj.name = "JIIT COIN";
            }
        })
        return {
            success: true,
            historyArray : data
        }
    }
}