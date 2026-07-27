export function cargarDeStorage(clave, valorPorDefecto) {
    const guardado = localStorage.getItem(clave)
    return guardado ? JSON.parse(guardado) : valorPorDefecto
  }
  
  export function guardarEnStorage(clave, valor) {
    localStorage.setItem(clave, JSON.stringify(valor))
  }