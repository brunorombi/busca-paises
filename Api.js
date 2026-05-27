const API = "https://restcountries.com/v3.1/";

export async function buscaPais(pais) {
    try {
        const response = await fetch(`${API}name/${pais}`);

        if(!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}?`)
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch(error) {
        console.error(error);
    }
}

export async function buscaCapital(capital) {
    try {
        const response = await fetch(`${API}capital/${capital}`);

        if(!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}?`)
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error)
    }
}