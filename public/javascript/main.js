document.querySelector("input[type=\"submit\"]").addEventListener('click', () =>{
    const text = document.querySelector("input[type=\"text\"]").value;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text })
    };
    fetch('/api', options);
});