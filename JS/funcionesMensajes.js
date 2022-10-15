// GET, POST, PUT, DEL

function getMensajes(){
    $.ajax({
        url:"http://155.248.196.6:8080/api/Message/all",
        type: "GET",
        datatype: "JSON",
        success:function(respuesta){
            pintarMensaje(respuesta);
        }
    });
}

function postMensajes(){
    let cajas = {
        messageText: $("#messageText").val(),
        client: {idClient: + $("#select-client").val()},
        machine: {id: + $("#select-machine").val()}

    };

    $.ajax({
        url:"http://155.248.196.6:8080/api/Message/save",
        type: "POST",
        datatype: "JSON",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("Se creó correctamene el mensaje");
            window.location.reload();
        }
    });
}

function putMensajes(idDesdeElBoton){
    console.log(idDesdeElBoton)

    if($("#messageText").val().length == 0 || 
        $("#select-client").val().length == 0 || 
        $("#select-machine").val().length == 0){
            alert("Todos los campos son obligatorios");
}else{
let cajas = {
    idMessage: idDesdeElBoton,
    messageText: $("#messageText").val(),
    client: {idClient: + $("#select-client").val()},
    machine: {id: + $("#select-machine").val()}
};

$.ajax({
    url:"http://155.248.196.6:8080/api/Message/update",
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

function deleteMensajes(idDesdeElBoton){
    let myData = {
        idMessage: idDesdeElBoton
    };

    $.ajax({
        url:"http://155.248.196.6:8080/api/Message/" + idDesdeElBoton,
        type: "DELETE",
        datatype: "JSON",
        data: JSON.stringify(myData),
        contentType: "application/json",

        success:function(respuesta){
            alert("Se borró correctamente el mensaje");
            window.location.reload();
        }
    });
}

function pintarMensaje(respuesta){

    let myTable = "<table>";
    let MENSAJE = "MENSAJE";
    let MAQUINA = "MAQUINA";
    let CLIENTE = "CLIENTE";

    myTable+="<th>"+MENSAJE+"</th>";
    
    myTable+="<th>"+MAQUINA+"</th>";

    myTable+="<th>"+CLIENTE+"</th>";

    for(let i = 0; i < respuesta.length; i++){
        myTable += "<tr>";
        myTable += "<td>" + respuesta[i].messageText + "</td>";
        myTable += "<td>" + respuesta[i].machine.name + "</td>";
        myTable += "<td>" + respuesta[i].client.name + "</td>";
        myTable += "<td> <button class='border-2 border-black rounded-xl w-28 hover:shadow-lg shadow-black font-semibold hover:text-sky-300 bg-yellow-300' onclick='putMensajes("+ respuesta[i].idMessage + ")'> Actualizar </button>";
        myTable += "<td> <button class='border-2 border-black rounded-xl w-28 hover:shadow-lg shadow-black font-semibold hover:text-sky-300 bg-yellow-300' onclick='deleteMensajes("+ respuesta[i].idMessage + ")'> Borrar </button>";
        myTable += "</tr>";
    } 
    myTable += "</table>";
    $("#resultadoMensajes").html(myTable);
}

function getMachine_Message(){
    $.ajax({
        url:"http://155.248.196.6:8080/api/Machine/all",
        type: "GET",
        datatype: "JSON",
        success:function(respuesta){
            let $select = $("#select-machine");
            $.each(respuesta, function(id, name){
                $select.append('<option value=' + name.id + '>' + name.name + '</option>')
            })
        }
    });
}

function getClient_Message(){
    $.ajax({
        url:"http://155.248.196.6:8080/api/Client/all",
        type: "GET",
        datatype: "JSON",
        success:function(respuesta){
            let $select = $("#select-client");
            $.each(respuesta, function(id, name){
                $select.append('<option value=' + name.idClient + '>' + name.name + '</option>')
            })
        }
    });
}