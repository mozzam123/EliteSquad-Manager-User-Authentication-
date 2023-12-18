function clicked(name, height, nationality, weight) {
    var name = name
    var height = height
    var nationality = nationality
    var weight = weight

    // Create player object
    var newPlayer = {
        "name": name,
        "position": "CF",
        "height": `${height}cm`,
        "nationality": nationality,
        "weight": `${weight}kg`,
        "user": "6569631e738444d9987e170c"  // You may need to dynamically set the user ID
    };

    // Make AJAX request
    fetch('http://127.0.0.1:2222/api/player/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPlayer),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            window.location.reload()
        })
        .then(data => {
            // Handle the response data as needed
            console.log(data);

        })
        .catch(error => console.error('Error:', error));
    }
