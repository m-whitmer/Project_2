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
    }).catch(err => {
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
    $('#navHome').attr('href', '/');
    $('#navLogin').attr('href', '/login');
    $('#navContact').attr('href', '/contact');

    loadShoe();
    makeToast();
})