
document.getElementById('agregarFeriadoForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    let fecha = document.getElementById('fecha').value;
    let nombre = document.getElementById('nombre').value;
  
    let response = await fetch('http://localhost:3000/feriados', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ fecha, nombre })
    });
  
    let result = await response.json();
    console.log('Feriado agregado:', result);
  });
  
  document.getElementById('listarFeriados').addEventListener('click', async () => {
    let response = await fetch('http://localhost:3000/feriados');
    let feriados = await response.json();
    console.log('Feriados:', feriados);
  });
  
  document.getElementById('modificarFeriadoForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    let id = document.getElementById('idModificar').value;
    let fecha = document.getElementById('fechaModificar').value;
    let nombre = document.getElementById('nombreModificar').value;
  
    let response = await fetch(`http://localhost:3000/feriados/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ fecha, nombre })
    });
  
    let result = await response.json();
    console.log('Feriado modificado:', result);
  });
  
  document.getElementById('eliminarFeriadoForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    let id = document.getElementById('idEliminar').value;
  
    let response = await fetch(`http://localhost:3000/feriados/${id}`, {
      method: 'DELETE'
    });
  
    let result = await response.json();
    console.log('Feriado eliminado:', result);
  });
  