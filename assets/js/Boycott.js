fetch('data.json')
.then(response => response.json())
.then((data) => show(data))
function show(data){
    let table_body = '';
    // for(j in data){
    //     for(i in data[j]){
    //         console.log(i)
    //     }
    // }
    for(i in data){ 
        table_body += `
        <tr>
            <td>${data[i].id}</td>
            <td>${data[i].name}</td>
            <td>${data[i].company}</td>
            <td>${data[i].product}</td>
            <td><img src="${data[i].img}" width="200px"></td>
        </tr>
        `;
    }
    table_body = `<tbody><tr>${table_body}</tr></tr></tbody>`
    const tabel = document.querySelector("#tabel-container");
    tabel.innerHTML = 
    `
    <table class="table table-striped" id="data-table">
        ${table_body}
    </table>
    `;

}