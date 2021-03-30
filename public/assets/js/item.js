let id;

let renderShoe = shoe => {
    $('#imgLg').attr('src', shoe.image_url);
    $('#name').text(shoe.product_name);
    $('#stock').text(`Stock: ${shoe.stock}`);

}

let loadShoe = () => {
    let temp = window.location.toString().split('/');

    id = parseInt(temp[temp.length - 1]);

    axios.get(`/api/products/${id}`).then(res => {
        renderShoe(res.data);
    }).catch(err => {})
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


    $(document).on('click', '.addBtn', function() {
        addToCart(id);
    })

    $('#navCart').attr('href', '/cart');
    $('#navHome').attr('href', '/');
    $('#navLogin').attr('href', '/login');
    $('#navContact').attr('href', '/contact');

    loadShoe();
})