let renderShoes = shoes => {
    for (let shoe of shoes) {
        let newCard = $('<div>').addClass('card').css('width', '14rem').attr('data-id', shoe.id);
        let newIMG = $('<img>').addClass('card-img-top').attr('src', shoe.image_url).css('object-fit', 'cover').css('height', "200px").attr('data-id', shoe.id).css('cursor', 'pointer');
        let newCardInfo = $('<div>').addClass('card-body');
        let newCardTitle = $('<h5>').addClass('card-title').text(shoe.product_name);
        let newCardDesc = $('<p>').addClass('card-text').text(`price: $ ${shoe.price} stock: ${shoe.stock}`);
        let newBtn = $('<a>').addClass('btn btn-primary btn-sm shoeBtn').text('Add to Cart').attr('data-id', shoe.id);

        newCardInfo.append(newCardTitle);
        newCardInfo.append(newCardDesc);
        newCardInfo.append(newBtn);

        newCard.append(newIMG);
        newCard.append(newCardInfo);

        $('#show').append(newCard);
    }
}

let productSearch = search => {
    $('#show').empty();
    axios.post(`/api/products/search/`, null, { params: { search } })
        .then(res => {
            renderShoes(res.data);
        })
        .catch(err => {
            console.log(err);
        })
}

let getAllShoes = () => {
    $('#show').empty();
    axios.get('/api/products')
        .then(res => {
            renderShoes(res.data);
        })
        .catch(err => {
            console.log(err);
        })
}


let addToCart = id => {
    let newProd = {
        id,
        quantity: 1
    }
    axios.post('/api/carts', newProd).then(res => {
        getCartCount();
        console.log(res);
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

    $('form').submit(function(e) {
        e.preventDefault();

        productSearch($(this).children().first().val());
    })

    $(document).on('click', '.card-img-top', function() {
        let id = $(this).attr('data-id');
        location.href = `/item/${id}`
    })

    $(document).on('click', '.shoeBtn', function() {
        let id = $(this).attr('data-id')
        addToCart(id);
    })

    $('#navCart').attr('href', '/cart');
    $('.text-light').attr('href', '/');
    $('#navLogin').attr('href', '/login');
    $('#navContact').attr('href', '/contact');

    checkLogged();
    getCartCount();
    getAllShoes();
})