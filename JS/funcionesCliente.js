// GET, POST, PUT, DEL

function getCliente(){
    $.ajax({
        url:"http://155.248.196.6:8080/api/Client/all",
        type: "GET",
        datatype: "JSON",
        success:function(respuesta){
            pintarCliente(respuesta);
        }
    });
}

function postCliente(){
    let cajas = {
        email: $("#email").val(),
        password: $("#password").val(),
        name: $("#name").val(),
        age: $("#age").val()
    };

    $.ajax({
        url:"http://155.248.196.6:8080/api/Client/save",
        type: "POST",
        datatype: "JSON",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("Se registró correctamene el cliente");
            window.location.reload();
        }
    });
}

function putCliente(idDesdeElBoton){

    if($("#email").val().length == 0 || 
        $("#password").val().length == 0 || 
        $("#name").val().length == 0 || 
        $("#age").val().length == 0){
            alert("Todos los campos son obligatorios");
    }else{
    let cajas = {
        idClient: idDesdeElBoton,
        email: $("#email").val(),
        password: $("#password").val(),
        name: $("#name").val(),
        age: $("#age").val()

    };

    $.ajax({
        url:"http://155.248.196.6:8080/api/Client/update",
        type: "PUT",
        datatype: "JSON",
        contentType: "application/json",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("Se actualizó correctamene la información del cliente");
            window.location.reload();
        }
    });
}
}

function deleteCliente(idDesdeElBoton){
    let myData = {
        id: idDesdeElBoton
    };

    $.ajax({
        url:"http://155.248.196.6:8080/api/Client/" + idDesdeElBoton,
        type: "DELETE",
        datatype: "JSON",
        data: JSON.stringify(myData),
        contentType: "application/json",

        success:function(respuesta){
            alert("Se borró correctamente el cliente");
            window.location.reload();
        }
    });
}


function pintarCliente(respuesta){
    let myTable = "<table class='w-full flex justify-around text-left whitespace-no-wrap'>";
    for(let i = 0; i < respuesta.length; i++){
        myTable += "<tr>";
        myTable += "<td class='px-2'>" + respuesta[i].email + "</td>";
        myTable += "<td class='px-2'>" + "*".repeat(respuesta[i].password.length) + "</td>";
        myTable += "<td class='px-2'>" + respuesta[i].name + "</td>";
        myTable += "<td class='px-2'>" + respuesta[i].age + "</td>";
        myTable += "<td class='px-2'> <button class='border-2 border-black rounded-xl w-28 hover:shadow-lg shadow-black font-semibold hover:text-sky-300 bg-yellow-300' onclick='putCliente("+ respuesta[i].idClient + ")'> Actualizar </button>";
        myTable += "<td class='px-2'> <button class='border-2 border-black rounded-xl w-28 hover:shadow-lg shadow-black font-semibold hover:text-sky-300 bg-yellow-300' onclick='deleteCliente("+ respuesta[i].idClient + ")'> Borrar </button>";
        myTable += "</tr>";
    } 
    myTable += "</table>";
    $("#resultadoCliente").html(myTable);
}