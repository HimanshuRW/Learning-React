const url = "http://localhost:8080/price";

export default async function getCurrentPrice() {
    try {
        const response = await fetch(url);
        let price = await response.text();
        price = parseInt(price);
        return { success: true, price : price };
    } catch (error) {
        // return {success : false,redirect : false, msg : "Not able to connect Server.. Try Later !"};
        // error page
        let price = "71";
        price = parseInt(price);
        return { success: true, price : price };
    }
}