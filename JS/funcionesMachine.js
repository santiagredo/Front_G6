// GET, POST, PUT, DEL

function getMachine(){
    $.ajax({
        url:"http://155.248.196.6:8080/api/Machine/all",
        type: "GET",
        datatype: "JSON",
        success:function(respuesta){
            console.log(respuesta)
            pintarMachine(respuesta);
        }
    });
}

function postMachine(){
    let cajas = {
        name: $("#name").val(),
        brand: $("#brand").val(),
        year: $("#year").val(),
        description: $("#description").val(),
        category: {id: + $("#select-categoria").val()}
    };

    $.ajax({
        url:"http://155.248.196.6:8080/api/Machine/save",
        type: "POST",
        datatype: "JSON",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("Se creó correctamene la máquina");
            window.location.reload();
        }
    });
}

function putMachine(idDesdeElBoton){

    if($("#name").val().length == 0 || 
        $("#brand").val().length == 0 || 
        $("#year").val().length == 0 || 
        $("#description").val().length == 0 ||
        $("#select-categoria").val().length == 0){
        alert("Todos los campos son obligatorios");
}else{
        let cajas = {
            id: idDesdeElBoton,
            name: $("#name").val(),
            brand: $("#brand").val(),
            year: $("#year").val(),
            description: $("#description").val(),
            category: {id: + $("#select-categoria").val()}
    };

    $.ajax({
        url:"http://155.248.196.6:8080/api/Machine/update",
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

function deleteMachine(idDesdeElBoton){
    let myData = {
        id: idDesdeElBoton
    };

    $.ajax({
        url:"http://155.248.196.6:8080/api/Machine/" + idDesdeElBoton,
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


function pintarMachine(respuesta){
    console.log(respuesta);
    let myTable = "<table class='w-full flex justify-around text-left whitespace-no-wrap'>";
    for(let i = 0; i < respuesta.length; i++){
        myTable += "<tr>";
        myTable += "<td class='px-2'>" + respuesta[i].name + "</td>";
        myTable += "<td class='px-2'>" + respuesta[i].brand + "</td>";
        myTable += "<td class='px-2'>" + respuesta[i].year + "</td>";
        myTable += "<td class='px-2'>" + respuesta[i].description + "</td>";
        myTable += "<td class='px-2'>" + respuesta[i].category.name + "</td>";
        myTable += "<td class='px-2'> <button class='border-2 border-black rounded-xl w-28 hover:shadow-lg shadow-black font-semibold hover:text-sky-300 bg-yellow-300' onclick='putMachine("+ respuesta[i].id + ")'> Actualizar </button>";
        myTable += "<td class='px-2'> <button class='border-2 border-black rounded-xl w-28 hover:shadow-lg shadow-black font-semibold hover:text-sky-300 bg-yellow-300' onclick='deleteMachine("+ respuesta[i].id + ")'> Borrar </button>";
        myTable += "</tr>";
    } 
    myTable += "</table>";
    $("#resultadoMachine").html(myTable);
}

function getCategoria_Machine(){
    $.ajax({
        url:"http://155.248.196.6:8080/api/Category/all",
        type: "GET",
        datatype: "JSON",
        success:function(respuesta){
            let $select = $("#select-categoria");
            $.each(respuesta, function(id, name){
                $select.append('<option value=' + name.id + '>' + name.name + '</option>')
            })
        }
    });
}