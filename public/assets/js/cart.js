let curTotal;

let renderTotal = () => {
    let newRow = $('<tr>');
    let emptyData1 = $('<td>');
    let emptyData2 = $('<td>');
    let emptyData3 = $('<td>');
    let titleData = $('<td>');
    let totalTitle = $('<h5>').text('Total:');
    let totalData = $('<td>').addClass('text-right');
    let totalHeader = $('<h5>').text(curTotal.toFixed(2));

    titleData.append(totalTitle);

    totalData.append(totalHeader);

    newRow.append(emptyData1, emptyData2, emptyData3, titleData, totalData);

    $('tbody').append(newRow);
}

let renderButtons = () => {
    let newRow = $('<tr>');
    let emptyData1 = $('<td>');
    let emptyData2 = $('<td>');
    let emptyData3 = $('<td>');
    let shopData = $('<td>');
    let shopBtn = $('<td>').addClass('btn btn-primary shopBtn').text('Continue Shopping');
    let orderData = $('<td>');
    let orderBtn = $('<td>').addClass('btn btn-success orderBtn').text('Place order');

    shopData.append(shopBtn);
    orderData.append(orderBtn);

    newRow.append(emptyData1, emptyData2, emptyData3, shopData, orderData);

    $('tbody').append(newRow);
}

let renderProduct = product => {
    let newRow = $('<tr>');
    let dataOne = $('<td>').addClass('col-md-6');
    let newDiv = $('<div>').addClass('media');
    let newAnch = $('<a>').addClass('thumbnail pull-left');
    let newImg = $('<img>').addClass('media-object').attr('src', product.image_url).css('height', '72px').css('width', '72px');
    let newerDiv = $('<div>').addClass('media-body');
    let newH4 = $('<h4>').addClass('media-heading');
    let newerAnch = $('<a>').addClass('ml-2').text(product.product_name).attr('href', `/item/${product.id}`);
    let dataTwo = $('<td>').addClass('col-sm-1 col-md-1');
    let newInput = $('<input>').addClass('form-control').attr('type', 'number').attr('value', product.cartItem.quantity).data('id', product.id);
    let dataThree = $('<td>').addClass('col-sm-1 col-md-1 text-center').text(product.price);
    let dataFour = $('<td>').addClass('col-sm-1 col-md-1 text-center').text((product.cartItem.quantity * product.price).toFixed(2));
    let dataFive = $('<td>').addClass('col-sm-1 col-md-1');
    let newBtn = $('<button>').addClass('btn btn-danger delBtn').text('Remove').data('id', product.id);

    dataFive.append(newBtn);

    dataTwo.append(newInput);

    newH4.append(newerAnch);
    newerDiv.append(newH4);

    newAnch.append(newImg);

    newDiv.append(newAnch);
    newDiv.append(newerDiv);

    dataOne.append(newDiv);

    newRow.append(dataOne, dataTwo, dataThree, dataFour, dataFive)

    $('tbody').append(newRow);

    curTotal += product.cartItem.quantity * product.price
}

let showCart = cart => {
    $('tbody').empty();
    curTotal = 0;
    for (let product of cart) {
        renderProduct(product);
    }
    renderTotal();
    renderButtons();
}

let loadCart = () => {
    axios.get('/api/carts')
        .then(res => {
            showCart(res.data.products);
            getCartCount();
        })
        .catch(err => {
            console.log(err);
        })

}

let delShoe = id => {
    axios.delete(`/api/carts/:${id}`)
        .then(res => {
            loadCart();
        })
        .catch(err => {
            console.log(err);
        })
}


let updateQuantity = (id, quantity) => {
    let data = {
        id,
        quantity
    }

    if (quantity <= 0) {
        delShoe(id);
        return;
    }

    axios.put('/api/carts', data).then(res => {
        loadCart();
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
                location.href = "/login"
            }
        })
        .catch(err => {
            console.log(err);
        })
}

let makeOrder = () => {
    axios.post('/api/orders').then(res => {
        let orderTitle = $('<h3>').text('Order Placed!');
        $('.container').append(orderTitle)
    }).catch(err => {
        console.log(err);
    })
}

$(document).ready(() => {

    $(document).on('click', '.delBtn', function() {
        delShoe($(this).data('id'));
    })

    $(document).on('change', 'input', function() {
        updateQuantity($(this).data('id'), $(this).val());
    })


    $(document).on('click', '.shopBtn', function() {
        window.location.href = "/";
    })

    $(document).on('click', '.orderBtn', function() {
        makeOrder();
    })

    $('#navCart').attr('href', '/cart');
    $('.text-light').attr('href', '/');
    $('#navLogin').attr('href', '/login');
    $('#navContact').attr('href', '/contact');

    checkLogged();
    loadCart();
})