//-------------------------PARTE TTS----------------------------
let buttons = document.querySelectorAll('button');

function reproducirTexto(boton) {
    speechSynthesis.cancel();
    let numerovoz = new SpeechSynthesisUtterance(boton.textContent);
    numerovoz.pitch = 1;
    numerovoz.rate = 1;
    numerovoz.volume = 1;
    speechSynthesis.speak(numerovoz);
}

function inicializarTTS() {
    const inicializacion = new SpeechSynthesisUtterance(" ");
    speechSynthesis.speak(inicializacion);
    console.log("API de síntesis de voz inicializada.");
}

if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = inicializarTTS;
} else {
    inicializarTTS();
}

buttons.forEach(botonsito => {
    botonsito.addEventListener('mouseover', () => reproducirTexto(botonsito));
    botonsito.addEventListener('focus', () => reproducirTexto(botonsito));
});

//-------------------------PARTE VALIDACIÓN NÚMEROS----------------------------
let encontrarmin = 1;
let encontrarmax = 42;
let numeroincognito = Math.floor(Math.random() * (encontrarmax - encontrarmin + 1)) + encontrarmin;
console.log(numeroincognito);

let mensajeinicio = document.getElementById('mensaje-inicio');
mensajeinicio.textContent = 'Adivina el número, tienes 5 intentos';
reproducirTexto(mensajeinicio);

let incognito = document.getElementById('encontrar');
incognito.textContent = '???';

let reiniciar = document.getElementById('reiniciar');
reiniciar.addEventListener('click', () => {
    location.reload();
});

let intentos = 5;

function desactivarBotones() {
    buttons.forEach(botonsito => {
        if (botonsito.id !== 'reiniciar') { // Excluir botón #reiniciar
            botonsito.disabled = true; // Desactiva el botón
            botonsito.classList.add('disabled'); // Agrega clase para estilos
        }
    });
}


buttons.forEach(botonsito => {
    botonsito.addEventListener('click', () => {
        let valorBotonsito = parseInt(botonsito.textContent);

        if (valorBotonsito === numeroincognito) {
            mensajeinicio.textContent = 'Felicidades!!! Lograste adivinar el número';
            reproducirTexto(mensajeinicio);
            incognito.style.display = "none";
            reiniciar.style.display = "block";
            desactivarBotones();
        } else {
            intentos--;
            if (intentos > 0) {
                mensajeinicio.textContent = `Adivina el número, tienes ${intentos} intentos`;
                reproducirTexto(mensajeinicio);
                incognito.textContent = valorBotonsito < numeroincognito 
                    ? 'El número ingresado es menor que el oculto' 
                    : 'El número ingresado es mayor que el oculto';
                reproducirTexto(incognito);
            } else {
                mensajeinicio.textContent = 'Fracasaste!!! Qué pena';
                reproducirTexto(mensajeinicio);
                incognito.style.display = "none";
                reiniciar.style.display = "block";
                desactivarBotones();
            }
        }
    });
});
