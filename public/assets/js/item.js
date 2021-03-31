let id;

let makeToast = () => {
    let newDiv = $('<div>').addClass('toasty').css('position', 'relative').css('top', 0).css('right', 0).css('display', 'none');
    let newBody = $('<div>').text('Item Added!')
    let newClose = $('<button>').addClass('btn btn-danger ml-2 mb-1 closeToasty').text("x");
    newBody.append(newClose);
    newDiv.append(newBody);
    $('.btn-primary').before(newDiv);
}

let showToast = () => {

    $('.toasty').css('display', 'inline');
}

let renderShoe = shoe => {
    $('#imgLg').attr('src', shoe.image_url);
    $('#name').text(shoe.product_name);
    $('#stock').text(`Stock: ${shoe.stock}`);
    $('#size').text(`Price: ${shoe.price}`);
    $('#info').text(`Description: ${shoe.description}`)
}

let loadShoe = () => {
    let temp = window.location.toString().split('/');

    id = parseInt(temp[temp.length - 1]);

    axios.get(`/api/products/${id}`).then(res => {
        renderShoe(res.data);
    }).catch(err => {
        console.log(err);
    })
}

let addToCart = id => {
    let newProd = {
        id,
        quantity: 1
    }
    axios.post('/api/carts', newProd).then(res => {
        showToast();
        getCartCount();
    }).catch(err => {
        console.log(err);
    })
}

let changeCartCount = shoes => {
    let cartTotal = 0;
    for (let shoe of shoes) {
        cartTotal += parseInt(shoe.cartItem.quantity);
    }
    $('#cartCount').text(cartTotal);
}

let getCartCount = () => {
    axios.get('/api/carts')
        .then(res => {
            if (res.data) {
                changeCartCount(res.data.products);
            }
        })
        .catch(err => {
            console.log(err);
        })
}

let logout = () => {
    axios.post('/api/users/logout')
        .then(res => {
            $('#navLogin').text('Login').attr('href', '/login')
        })
        .catch(err => {
            console.log(err);
        })
}

let checkLogged = () => {
    axios.get('/api/users/logged')
        .then(res => {
            if (res.data.logged_in) {
                $('#navLogin').text('Logout').removeAttr('href').click(logout);
            } else {
                $('#navLogin').text('Login').attr('href', '/login')
            }
        })
        .catch(err => {
            console.log(err);
        })
}

$(document).ready(() => {

    $(document).on('click', '.btn-primary', function() {
        addToCart(id);
    })

    $(document).on('click', '.closeToasty', function() {
        $('.toasty').css('display', 'none');
    })

    $('#navCart').attr('href', '/cart');
    $('.text-light').attr('href', '/');
    $('#navLogin').attr('href', '/login');
    $('#navContact').attr('href', '/contact');
    $('.navbar-brand').children().first().attr('src', "/assets/img/logo1.png");
    $('.row').children().first().css('display', 'none');
    $('.btn-light').css('display', 'none');
    $('#detail').css('display', 'none');
    $('#review').css('display', 'none');

    checkLogged();
    loadShoe();
    makeToast();
    getCartCount();
})