function login() {
    let userInfo = {
        name: $('#name').val(),
        password: $('#password').val()
    }
    axios.post('/api/users/login', userInfo)
        .then(res => {
            if (res.status === 400) location.reload();
            if (res.status === 200) window.location.href = "/";
        }).catch(err => {
            console.log(err);
        })
}


$(document).ready(() => {

    $('#userform').submit(function(e) {
        e.preventDefault();

        login();
    })

})