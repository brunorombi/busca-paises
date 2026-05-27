const API = "https://restcountries.com/v3.1/name";

export default async function buscaPais(nome) {
    try {
        const response = await fetch(`${API}/${nome}`);

        if(!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}?`)
        }

        const data = await response.json();
        return data;
        console.log(data);
    } catch(error) {
        console.error(error);
    }
}