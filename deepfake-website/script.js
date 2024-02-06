document.addEventListener('DOMContentLoaded', function() {
    const uploadButton = document.getElementById('uploadButton');
    const videoFileInput = document.getElementById('videoFileInput');
    const resultText = document.getElementById('resultText');

    // Enable drag and drop functionality
    const dropArea = document.getElementById('dropArea');

    dropArea.addEventListener('dragover', function(event) {
        event.preventDefault();
        dropArea.classList.add('dragover');
    });

    dropArea.addEventListener('dragleave', function(event) {
        event.preventDefault();
        dropArea.classList.remove('dragover');
    });

    dropArea.addEventListener('drop', function(event) {
        event.preventDefault();
        dropArea.classList.remove('dragover');
        const file = event.dataTransfer.files[0];
        if (file) {
            uploadFile(file);
        }
    });

    uploadButton.addEventListener('click', function() {
        videoFileInput.click();
    });

    videoFileInput.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            uploadFile(file);
        }
    });

    function uploadFile(file) {
        const formData = new FormData();
        formData.append('video', file);

        resultText.innerText = 'Waiting for result...';

        // Simulate sending data to backend for analysis
        setTimeout(function() {
            const isFake = Math.random() < 0.5; // Simulate result (50% chance of being fake)
            displayResult(isFake);
        }, 2000);
    }

    function displayResult(isFake) {
        if (isFake) {
            resultText.innerText = 'The video is detected as FAKE.';
            resultText.style.color = 'red';
        } else {
            resultText.innerText = 'The video is detected as REAL.';
            resultText.style.color = 'green';
        }
    }
});
