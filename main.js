const formulario = document.getElementById('form');

const nombre = document.getElementById('firstName');
const apellido = document.getElementById('lastName');
const email = document.getElementById('email');
const monto = document.getElementById('amount');
const cuotas = document.getElementById('fees');

const montoFinal = document.getElementById('finalAmount');
const cuotasFinales = document.getElementById('finalFees');
const intereses = document.getElementById('interests');
const totalADevolver = document.getElementById('totalAmount');

const tasa = 0.2; // 1%

formulario.addEventListener('submit', (e) => {
    e.preventDefault();


    obtenerCuotaPrestamo();
});

const obtenerCuotaPrestamo = () => {
    const cuotaPrestamo = tasa * monto.value / (1 - (1+tasa)**-cuotas.value);
    obtenerTotal(cuotaPrestamo)
};

const obtenerTotal = (cuotaPrestamo) => {
    const total = cuotaPrestamo.toFixed(2) * cuotas.value;

    const prestamo = {
        monto: monto.value,
        cuotas: cuotas.value,
        intereses: total - monto.value,
        total: total
    }

    pintarPrestamo(prestamo);

    guardarPrestamoStorage(prestamo);
};

const pintarPrestamo = (prestamo) => {
    montoFinal.innerText = `$${prestamo.monto}`;
    cuotasFinales.innerText = `${prestamo.cuotas}`;
    intereses.innerText = `$${prestamo.intereses}`;
    totalADevolver.innerText = `$${prestamo.total}`;
};

const guardarPrestamoStorage = (prestamo) => {
    localStorage.setItem('prestamo', JSON.stringify(prestamo));
};

const obtenerPrestamoStorage = () => {
    const prestamoStorage = JSON.parse(localStorage.getItem('prestamo'));
    return prestamoStorage;
};

const obtenerPrestamo = () => {
    if (localStorage.getItem('prestamo')) {
        const prestamoStorage = obtenerPrestamoStorage();
        pintarPrestamo(prestamoStorage);
    }
};

obtenerPrestamo();