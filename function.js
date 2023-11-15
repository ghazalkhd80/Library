
const getSaveProducts = () => {
    const productsJSON = localStorage.getItem('products')
    try {
        return productsJSON !== null ?  JSON.parse(productsJSON) :  []
    } catch (error) {
        return []
    }
}

const saveProducts = (products) => {
    localStorage.setItem('products', JSON.stringify(products))
}

const removeProduct = (id) => {
    const productIndex = products.findIndex(item => item.id === id)
    if (productIndex > -1) {
        products.splice(productIndex, 1)
    }
}

const toggleProduct = (id) => {
    const product = products.find(item => item.id === id)
    if (product !== undefined) {
        product.exist = !product.exist
    }
}

const sortproducts = (products , sortBy) => {
    if (sortBy === 'byedited') {
        return products.sort( (a,b) => {
          if (a.updated > b.updated) {
            return -1
          }  else if (a.updated < b.updated) {
            return 1
          } else {
            return 0
          }
        })
    } else if (a.created > b.created) {
        return -1
    } else if (a.created < b.created) {
        return 1
    } else {
        return products
    }
    
}

const renderProducts = (products, filters) => {
    let filteredProducts = products.filter(item =>item.title.toLowerCase().includes(filters.searchItem.toLowerCase()))
    filteredProducts = filteredProducts.filter(function(item) {
        if(filters.availableProducts) {
            return item.exist
        } else {
            return true
        }
    })
    document.querySelector('#products').innerHTML = ''
    filteredProducts.forEach(function(item) {
        document.querySelector('#products').appendChild(createProductDOM(item))
    })
}

const createProductDOM = (product) => {
    const productEl = document.createElement('div')
    const checkbox = document.createElement('input')
    const productItem = document.createElement('a')
    const removeButton = document.createElement('button')

    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = !product.exist
    productEl.appendChild(checkbox)
    checkbox.addEventListener('change', function() {
        toggleProduct(product.id)
        saveProducts(products)
        renderProducts(products, filters)
    })

    productItem.textContent = product.title
 productItem.setAttribute("href", `./edit-product.html#${product.id}`)
    productEl.appendChild(productItem)

    removeButton.textContent = 'Remove'
    productEl.appendChild(removeButton)
    removeButton.addEventListener('click', function() {
        removeProduct(product.id)
        saveProducts(products)
        renderProducts(products, filters)
    })

    return productEl
}

const lastEditMessage = (timestamp) => {
    `last edit: ${moment(product.updated).local('fa').fromNow()}`
}