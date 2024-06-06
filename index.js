const dropArea = document.getElementById('drop-area');
const fileElem = document.getElementById('fileElem');
const browseButton = document.getElementById('browseButton');
const gallery = document.getElementById('gallery');

// Prevent default drag behaviors
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false);
    document.body.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

// Highlight drop area when item is dragged over it
['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, () => dropArea.classList.add('highlight'), false);
});

['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, () => dropArea.classList.remove('highlight'), false);
});

// Handle dropped files
dropArea.addEventListener('drop', handleDrop, false);
browseButton.addEventListener('click', () => fileElem.click());
fileElem.addEventListener('change', () => handleFiles(fileElem.files));

function handleDrop(e) {
    let dt = e.dataTransfer;
    let files = dt.files;
    handleFiles(files);
}

function handleFiles(files) {
    ([...files]).forEach(previewFile);
}

function previewFile(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function() {
        let container = document.createElement('div');
        container.classList.add('image-container');

        let img = document.createElement('img');
        img.src = reader.result;

        let infoInput = document.createElement('input');
        infoInput.type = 'text';
        infoInput.placeholder = 'Add info about this image';
        infoInput.classList.add('image-info');

        let buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');

        let confirmBtn = document.createElement('button');
        confirmBtn.textContent = 'Add';
        confirmBtn.classList.add('confirm-btn');
        confirmBtn.onclick = function() {
            confirmBtn.disabled = true;
            infoInput.disabled = true;
            confirmBtn.style.backgroundColor = 'grey';
        };

        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.onclick = function() {
            gallery.removeChild(container);
        };

        buttonContainer.appendChild(confirmBtn);
        buttonContainer.appendChild(deleteBtn);
        container.appendChild(img);
        container.appendChild(infoInput);
        container.appendChild(buttonContainer);
        gallery.appendChild(container);
    }
}
