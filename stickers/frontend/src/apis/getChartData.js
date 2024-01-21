const url = "http://localhost:8080/chart/";

const failed = { success: false, msg: "Server Issue... Try again later !" };
export default async function getChartData(range) {
    try {
        const response = await fetch(url + range);
        if (!response.ok) return failed;

        let chartData = await response.json();
        return { success: true, chartData };
    } catch (error) {
        // return failed;
        
        let response = await fetch("http://localhost:3000/db/coin"+range+".json");
        let chartData = await response.json();
        return { success: true, chartData };
    }
}