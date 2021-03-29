let renderShoes = shoes => {
    for (let shoe of shoes) {
        let newCard = $('<div>').addClass('card').css('width', '14rem').attr('data-id', shoe.id);
        let newIMG = $('<img>').addClass('card-img-top').attr('src', shoe.image_url);
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
        console.log(res);
    }).catch(err => {
        console.log(err);
    })
}

$(document).ready(() => {

    $('form').submit(function(e) {
        e.preventDefault();

        productSearch($(this).children().first().val());
    })

    $(document).on('click', '.card', function() {
        console.log($(this).attr('data-id'));
    })

    $(document).on('click', '.shoeBtn', function() {
        let id = $(this).attr('data-id')
        addToCart(id);
    })

    getAllShoes();
})