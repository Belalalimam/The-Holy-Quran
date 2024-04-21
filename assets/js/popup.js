async function get(){
    const respons = await fetch("https://www.breakingbadapi.com/api/")
    const data = await respons.json()
    console.log(data)
}
get()