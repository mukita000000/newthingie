const noteIta = JSON.parse(localStorage.getItem('Notes')) || [];

const noteEng = JSON.parse(localStorage.getItem('translNotes')) || [];

let mode = JSON.parse(localStorage.getItem('mode')) || {mo: 0, de: 0};
let menu = 0;

const buttonElem = document.querySelector('.js-scrivi');
const inputElement = document.querySelector('.js-input');
const selectElem = document.getElementById('seleziona');
const itaElem = document.getElementById('0');
const engElem = document.getElementById('1');

if (mode.mo === 0) {
    langIta();
    nascondiMenu();
} else {
    langEng();
    nascondiMenu();
}

transLang();
renderNote();
eventListeners();

function addNote() {

    const inputElem = document.querySelector('.js-input');
    const Nota = inputElem.value;
    
    if (mode.de === 0 && mode.mo === 0) {

        noteIta.push(Nota);

        console.log(noteIta)
        
        mode.de++

        console.log(mode);

    } else if (mode.de === 1 && mode.mo === 0) {

        noteEng.push(Nota);

        console.log(noteEng);

        //console.log(mode.de);

        mode.de--

        console.log(mode);

    } else if (mode.de === 0 && mode.mo === 1) {

        noteEng.push(Nota);

        console.log(noteEng);

        //console.log(mode.de);

        mode.de++

        console.log(mode);

    } else if (mode.de === 1 && mode.mo === 1) {

        noteIta.push(Nota);

        console.log(noteIta)
        
        mode.de--

        console.log(mode);

    }
    
    //console.log(mode);
    inputElem.value = '';

    transLang();


}

function transLang() {

    const inputElem = document.querySelector('.roba');
    

    if (mode.mo === 0 && mode.de === 0) {
        
        inputElem.innerHTML = `<input type="text" class="js-input coseDaFare" placeholder="Nota" />`;
        buttonElem.innerHTML = `Scrivi`
        renderNote();
        
    } else if (mode.mo === 0 && mode.de === 1) {

        inputElem.innerHTML = `<input type="text" class="js-input coseDaFare" placeholder="Translate note" />`
        buttonElem.innerHTML = `Translate`
    
    } else if (mode.mo === 1 && mode.de === 0) {

        inputElem.innerHTML = `<input type="text" class="js-input coseDaFare" placeholder="Note" />`
        buttonElem.innerHTML = `Write`
        renderNote();

        
    } else if (mode.mo === 1 && mode.de === 1) {

        inputElem.innerHTML = `<input type="text" class="js-input coseDaFare" placeholder="Traduci nota" />`
        buttonElem.innerHTML = `Traduci`


    }
}

/*function mostraLingue() {

    if (menu === 0) {
        itaElem.innerHTML = 'Ita';
        engElem.innerHTML = 'Eng';
        menu++
    } else  {
        itaElem.innerHTML = '';
        engElem.innerHTML = '';
        menu--
    }
    
}*/

function nascondiMenu() {
    if (menu === 0) {
        itaElem.innerHTML = 'Ita';
        engElem.innerHTML = 'Eng';
        menu++
    } else  if (menu === 1) {
        itaElem.innerHTML = '';
        engElem.innerHTML = '';
        menu--
    }

    //console.log(localStorage.getItem('Notes'))
}

function langIta() {
    mode.mo = 0;
    const translateElem = document.querySelector('.roba');
    translateElem.innerHTML = `
      <input type="text" class="js-input coseDaFare" placeholder="Nota" />
    `

    document.querySelector('.js-scrivi').innerHTML = 'Scrivi'
    document.getElementById('seleziona').innerHTML = 'Seleziona lingua:';
    document.querySelectorAll('.bottone').innerHTML = 'Elimina';


    //console.log(menu);

    nascondiMenu();
    renderNote()

    
    localStorage.setItem('mode', JSON.stringify(mode));

    
} 

function langEng() {
    mode.mo = 1;
    const translateElem = document.querySelector('.roba');
    translateElem.innerHTML= `
      <input type="text" class="js-input coseDaFare" placeholder="Note" />
    `
    document.querySelector('.js-scrivi').innerHTML = 'Write';
    document.getElementById('seleziona').innerHTML = 'Select Language:';
    document.querySelectorAll('.bottone').innerHTML = 'Delete';

    

    nascondiMenu();
    renderNote()

    localStorage.setItem('mode', JSON.stringify(mode));
}

function renderNote() {
    let noteHTML = ''

    if (mode.mo === 0) {
        for (let i = 0; i < noteIta.length; i++) {
            const noteobject = noteIta[i];
            const html = `<div class='Grid'><div class='nota'>${noteobject}</div><div class='button'><button class='bottone'>Delete</button></div></div>`;

            noteHTML += html;
    
        }

        document.querySelector('.js-note').innerHTML = noteHTML;

    } else if (mode.mo === 1) {
        for (let i = 0; i < noteEng.length; i++) {
            const noteobject = noteEng[i];
            const html = `<div class='Grid'><div class='nota'>${noteobject}</div><div class='button'><button class='bottone'>Delete</button></div></div>`;

            noteHTML += html;
    
        }

        document.querySelector('.js-note').innerHTML = noteHTML;
    }

    document.querySelectorAll('.button').forEach((deleteButton, index) => {
        deleteButton.addEventListener('click', () => {
            noteIta.splice(index, 1);
            noteEng.splice(index, 1);
            renderNote();
        })
    });

    localStorage.setItem('Notes', JSON.stringify(noteIta))
    localStorage.setItem('translNotes', JSON.stringify(noteEng))

    if (mode.mo === 0) {
        document.querySelectorAll('.bottone').forEach((deleteButton, index) => {
            deleteButton.innerHTML = 'Elimina';
        })
    } else if (mode.mo === 1) {
        document.querySelectorAll('.bottone').forEach((deleteButton, index) => {
            deleteButton.innerHTML = 'Delete';
        })
    }

}    

function eventListeners() {

    itaElem.addEventListener('click', () => {langIta(); console.log(mode)})
    engElem.addEventListener('click', () => {langEng()})
    selectElem.addEventListener('click', () => {if (mode.de === 0) {
        nascondiMenu()
    } else {
        alert('No')
    }

})
    //selectElem.addEventListener('mouseover', () => {mostraLingue()})
    buttonElem.addEventListener('click', () => {addNote()});
    //inputElement.addEventListener('keydown', () => {addNote()})
    inputElement.addEventListener('click', () => {if (menu === 1) {
        nascondiMenu()
    } 
})

}