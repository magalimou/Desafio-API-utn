
let datosjson;

function pedidoApi(){

    return new Promise( (resolve, reject) =>{

        var xhr = new XMLHttpRequest();

/*El método open() inicializa una solicitud recién creada o reinicializa una existente
El primer parametro indica que método se va a utilizar para la solicitud, el segundo la URL y el tercero si la operación
// es asincrónica o no.*/

        let url = "https://apisimpsons.fly.dev/api/personajes?limit=650";

        xhr.open('GET', url, true);

        xhr.responseType = 'json';

// El evento onload es se desencadena cuando la solicitud fue exitosa. Se le indica
// al código JavaScript que se ha recibido una respuesta exitosa y los datos están listos para ser procesados.
// La función que aloje el evento va a ejecutarse cada vez que se complete la solicitud.

        xhr.onload = function(){

            if(xhr.status == 200)
            {
                datosjson = xhr.response;
                resolve(datosjson);

            }else
            {
                reject(new Error("error en la conexion"));
            }
        }

        xhr.send();

        })

}

function generarNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


async function asyncall(){

    try{
       
        let respuesta = await pedidoApi();
        console.log(respuesta);

        let num = generarNumeroAleatorio( 0, respuesta.docs.length - 1);
        let elemento = respuesta.docs[num];

        //agrego la imagen 
        let img = document.getElementById("imagen");
        img.setAttribute("src", elemento.Imagen);

        //agrego el nombre
        let elementonombre = document.getElementById("nombre");
        elementonombre.textContent = elemento.Nombre;


    }catch(error)
    {
        console.log(error);
    }
}


document.getElementById("juego").addEventListener('click', (evento) => {asyncall()});

