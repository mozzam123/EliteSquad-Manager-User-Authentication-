
function deleteTask(id) {
    fetch(`http://127.0.0.1:2222/api/player/delete?id=${id}`, {
        method: 'DELETE',
    })
        .then(response => {
            if (response.ok) {
                window.location.reload()
                console.log('Deleted succesfull');
            } else {
                console.error("Failed to delete a task")
            }
        }).catch(error => console.error('Error: ', error))

}

function openCreatePlayerModal() {
    $('#createPlayerModal').modal('show');
}
document.addEventListener('DOMContentLoaded', function () {
    // Use querySelector instead of getElementById
    document.querySelector('#createPlayerForm').addEventListener('submit', function (event) {
        event.preventDefault();
        createPlayer();
    });

    function createPlayer() {
    var name = document.getElementById('name').value;
    var position = document.getElementById('position').value;
    var height = document.getElementById('height').value;
    var nationality = document.getElementById('nationality').value;
    var weight = document.getElementById('weight').value;

    // Create player object
    var newPlayer = {
        "name": name,
        "position": position,
        "height": `${height}cm`,
        "nationality": nationality,
        "weight": `${weight}kg`,
        "user": "6593d99d916318fb234c20ad"  // You may need to dynamically set the user ID
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

            // Close the modal
            $('#createPlayerModal').modal('hide');
        })
        .catch(error => console.error('Error:', error));
    }
});

