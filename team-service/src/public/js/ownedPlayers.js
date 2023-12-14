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