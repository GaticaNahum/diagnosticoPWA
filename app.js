const URL = "https://reqres.in/api/users/";

let contenedor = document.querySelector("#contenedor");

const getList = async () => {
    try {
      const response = await fetch(`${URL}`);
      const datos = await response.json();
      console.log(datos.data);
      
      let contenido = datos.data.map((data, i) => `
      <tr>
        <th>${i + 1}</th>
        <th>${data.email}</th>
        <td>${data.first_name}</td>
        <td>${data.last_name}</td>
        <td><img src="${data.avatar}" class="img-thumbnail" alt="..."></td>
        <td>
        <button class='btn text-warning' onClick="getDataToUpdate(${data.id})" 
          type="button" data-toggle="modal" data-target="#update"><i class="fa-solid fa-pen-to-square h3"></i></button>
      </td>
      <td>
        <button class='btn text-danger'onClick="getId(${data.id})" type="button" data-toggle="modal" data-target="#delete""
          ><i class="fa-solid fa-eraser h3"></i></button>
      </td>
      </tr>
    `).join('');

    contenedor.innerHTML = contenido;
      
    } catch (error) {
      contenedor.innerHTML = vacio;
      console.error("Error:", error);
    }
  };

getList();

  const createPerson = async () => {
    let first_name = document.querySelector("#first_name").value;
    let job = document.querySelector("#job").value;
    let modal = document.querySelector("#add");
    let form = document.querySelector("#form");
  
    if (!job || !first_name) {
        Swal.fire(
            'Debes de llenar todos los campos',
            'Da clic para cerrar!',
            'warning')
      return;
    }

    let data = {job,first_name};
  
    try {
      let res = await fetch(`${URL}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
  
      if (res.status == 201) {
        form.reset();
        $(modal).modal("hide");
        getList();
        Swal.fire(
          'Se agrego correctamente el nuevo usuario!',
          'Da clic para cerrar!',
          'success'
        )
      }
    } catch (error) {
      Swal.fire(
        'Hubo un error al registrar, intentalo más tarde!',
        'Da clic para cerrar!',
        'error'
        )
        console.error("Error:", error);
    }
  };

  const getId = id => {
    document.querySelector("#idPerson").value = id;
  };

  const deletePerson = async () => {
    let modal = document.querySelector("#delete");
    let id = document.querySelector("#idPerson").value;
  
    try {
      let res = await fetch(`${URL}${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (res.status == 204) {
        $(modal).modal("hide");
        getList();
        Swal.fire(
          'Se elimino correctamente a la persona!',
          'Da clic para cerrar!',
          'success'
        )
      }
    } catch (error) {
      Swal.fire(
        'Hubo un error al eliminar, intentalo más tarde!',
        'Da clic para cerrar!',
        'error'
        )
      console.error("Error:", error);
    }
  }


const getPerson = async id => await (await fetch(`${URL}${id}`)).json();

const getDataToUpdate = async id => {
    let data = await getPerson(id);
    let { first_name, id:personId} = data.data;

  document.querySelector('#first_name_update').value = first_name;
  document.querySelector('#id_update').value = personId;
};

const updatePerson = async () => {
  let id = document.querySelector('#id_update').value;
  let first_name = document.querySelector('#first_name_update').value;
  let job = document.querySelector('#job_update').value;
  let modal = document.querySelector("#update");

  let data = { id, first_name, job };

  try {
    let res = await fetch(`${URL}${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    if (res.status == 200) {
      $(modal).modal("hide");
      getList();
      Swal.fire(
        'Se actualizo correctamente a la persona!',
        'Da clic para cerrar!',
        'success'
      )
    }
  } catch (error) {
    Swal.fire(
      'Hubo un error al actualizar, intentalo más tarde!',
      'Da clic para cerrar!',
      'error'
      )
    console.error("Error:", error);
  }
};


