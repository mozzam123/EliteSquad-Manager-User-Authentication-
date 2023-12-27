function clicked(name, height, nationality, weight) {
    var name = name
    var height = height
    var nationality = nationality
    var weight = weight

    // Create player object
    var newPlayer = {
        "name": name,
        "position": "CF",
        "height": height,
        "nationality": nationality,
        "weight": weight,
        "user": "658bc1437b708a916818b14e"  // You may need to dynamically set the user ID
    };

    // Make AJAX request to create or add a new player
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
