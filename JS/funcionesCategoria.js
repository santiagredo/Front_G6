// GET, POST, PUT, DEL

function getCategoria(){
    $.ajax({
        url:"http://155.248.196.6:8080/api/Category/all",
        type: "GET",
        datatype: "JSON",
        success:function(respuesta){
            console.log(respuesta)
            pintarCategoria(respuesta);
        }
    });
}

function postCategoria(){

    if($("#name").val().length == 0 || $("#description").val().length == 0){
        alert("Todos los campos son obligatorios");
    }else{
    let cajas = {
        name: $("#name").val(),
        description: $("#description").val()
    };

    $.ajax({
        url:"http://155.248.196.6:8080/api/Category/save",
        type: "POST",
        datatype: "JSON",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("Se creó correctamene la categoría");
            window.location.reload();
        }
    });
}
}

function putCategoria(idDesdeElBoton){
    console.log(idDesdeElBoton);

    if($("#name").val().length == 0 || 
        $("#description").val().length == 0){
            alert("Todos los campos son obligatorios");
    }else{
    let cajas = {
        id: idDesdeElBoton,
        name: $("#name").val(),
        description: $("#description").val()
    };

    $.ajax({
        url:"http://155.248.196.6:8080/api/Category/update",
        type: "PUT",
        datatype: "JSON",
        contentType: "application/json",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("Se actualizó correctamene la información de la categoría");
            window.location.reload();
        }
    });
}

}

function deleteCategoria(idDesdeElBoton){

    let myData = {
        id: idDesdeElBoton
    };

    $.ajax({
        url:"http://155.248.196.6:8080/api/Category/" + idDesdeElBoton,
        type: "DELETE",
        datatype: "JSON",
        data: JSON.stringify(myData),
        contentType: "application/json",

        success:function(respuesta){
            alert("Se borró correctamente la categoría");
            window.location.reload();
        }
    });
}


function pintarCategoria(respuesta){
    let myTable = '<table class="w-full flex justify-around text-left whitespace-no-wrap">';
    for(let i = 0; i < respuesta.length; i++){
        myTable += "<tr>";
        myTable += '<td class="pr-16 break-words">' 
            + respuesta[i].name + "</td>";
        myTable += '<td class="px-16">' 
            + respuesta[i].description + "</td>";
        myTable += "<td class=''> <button class='border-2 border-black rounded-xl w-32 hover:shadow-lg shadow-black font-semibold hover:text-sky-300 bg-yellow-300' onclick='putCategoria("+ respuesta[i].id + ")'> Actualizar </button>";
        myTable += "<td class=''> <button class='border-2 border-black rounded-xl w-32 hover:shadow-lg shadow-black font-semibold hover:text-sky-300 bg-yellow-300' onclick='deleteCategoria("+ respuesta[i].id + ")'> Borrar </button>";
        myTable += "</tr>";
    } 
    myTable += "</table>";
    $("#resultadoCategoria").html(myTable);
}