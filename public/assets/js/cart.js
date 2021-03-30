let curTotal;

let renderProduct = product => {
    let newRow = $('<tr>');
    let dataOne = $('<td>').addClass('col-md-6');
    let newDiv = $('<div>').addClass('media');
    let newAnch = $('<a>').addClass('thumbnail pull-left');
    let newImg = $('<img>').addClass('media-object').attr('src', product.image_url);
    let newerDiv = $('<div>').addClass('media-body');
    let newH4 = $('<h4>').addClass('media-heading');
    let newerAnch = $('<a>').text(product.product_name).attr('href', `/item/${product.id}`);
    let dataTwo = $('<td>').addClass('col-sm-1 col-md-1');
    let newInput = $('<input>').addClass('form-control').attr('type', 'number').attr('value', product.cartItem.quantity);
    let dataThree = $('<td>').addClass('col-sm-1 col-md-1 text-center').text(product.price);
    let dataFour = $('<td>').addClass('col-sm-1 col-md-1 text-center').text(product.cartItem.quantity * product.price);
    let dataFive = $('<td>').addClass('col-sm-1 col-md-1');
    let newBtn = $('<button>').addClass('btn btn-danger').text('Remove');
    let newSpan = $('<span>').addClass('glyphicon glyphicon-remove');
    newBtn.prepend(newSpan);
    dataFive.append(newBtn);

    dataTwo.append(newInput);

    newH4.append(newerAnch);
    newerDiv.append(newH4);

    newAnch.append(newImg);

    newDiv.append(newAnch);
    newDiv.append(newerDiv);

    dataOne.append(newDiv);

    newRow.append(dataOne, dataTwo, dataThree, dataFour, dataFive)

    $('#prodTable').append(newRow);

    curTotal += product.cartItem.quantity * product.price
}

let showCart = cart => {
    $('#prodTable').empty();
    curTotal = 0;
    for (let product of cart) {
        renderProduct(product);
    }
}

let loadCart = () => {
    axios.get('/api/carts')
        .then(res => {
            showCart(res.data.products);
        })
        .catch(err => {

        })
}


$(document).ready(() => {

    loadCart();
})