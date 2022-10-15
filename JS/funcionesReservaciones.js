// GET, POST, PUT, DEL

function getReservaciones(){
    $.ajax({
        url:"http://155.248.196.6:8080/api/Reservation/all",
        type: "GET",
        datatype: "JSON",
        success:function(respuesta){
            // console.log(respuesta)
            pintarReservaciones(respuesta);
        }
    });
}

function postReservaciones(){

    if($("#startDate").val().length == 0 || $("#devolutionDate").val().length == 0){
        alert("Todos los campos son obligatorios");
    }else{

    let cajas = {
        startDate: $("#startDate").val(),
        devolutionDate: $("#devolutionDate").val(),
        status: $("#status").val(),
        client: {idClient: + $("#select-client").val()},
        machine: {id: + $("#select-machine").val()}
    };

    $.ajax({
        url:"http://155.248.196.6:8080/api/Reservation/save",
        type: "POST",
        datatype: "JSON",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("Se creó correctamene la reserva");
            window.location.reload();
        }
    });
    }
}

function putReservaciones(idDesdeElBoton){
    if($("#startDate").val().length == 0 || $("#devolutionDate").val().length == 0){
        alert("Todos los campos son obligatorios");
    }else{
        let cajas = {
            idReservation: idDesdeElBoton,
            startDate: $("#startDate").val(),
            devolutionDate: $("#devolutionDate").val(),
            status: $("#status").val(),
            client: {idClient: + $("#select-client").val()},
            machine: {id: + $("#select-machine").val()}
    };

    $.ajax({
        url:"http://155.248.196.6:8080/api/Reservation/update",
        type: "PUT",
        datatype: "JSON",
        contentType: "application/json",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("Se actualizó correctamene la información de la reservación");
            window.location.reload();
        }
    });
}
}

function deleteReservaciones(data){

    let myData = {
        id: data
    };

    $.ajax({
        url:"http://155.248.196.6:8080/api/Reservation/" + data,
        type: "DELETE",
        datatype: "JSON",
        data: JSON.stringify(myData),
        contentType: "application/json",

        success:function(respuesta){
            alert("Se borró correctamente la reservación");
            window.location.reload();
        }
    });

}


function pintarReservaciones(json_maquinas){
    
    let myTable = "<table>";
    for(let i = 0; i < json_maquinas.length; i++){
        myTable += "<tr>";
        myTable += "<td>" + json_maquinas[i].startDate + "</td>";
        myTable += "<td>" + json_maquinas[i].devolutionDate + "</td>";
        myTable += "<td>" + json_maquinas[i].status + "</td>";
        myTable += "<td>" + json_maquinas[i].machine.name + "</td>";
        myTable += "<td>" + json_maquinas[i].client.name + "</td>";
        myTable += "<td> <button class='border-2 border-black rounded-xl w-28 hover:shadow-lg shadow-black font-semibold hover:text-sky-300 bg-yellow-300' onclick='putReservaciones("+ json_maquinas[i].idReservation + ")'> Actualizar </button>";
        myTable += "<td> <button class='border-2 border-black rounded-xl w-28 hover:shadow-lg shadow-black font-semibold hover:text-sky-300 bg-yellow-300' onclick='deleteReservaciones("+ json_maquinas[i].idReservation + ")'> Borrar </button>";
        myTable += "</tr>";
    } 
    myTable += "</table>";
    $("#resultadoReservaciones").html(myTable);
}




function getClient_Reservation(){
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


function getMachine_Reservation(){
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