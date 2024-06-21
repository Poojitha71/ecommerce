import React, { useState, useEffect } from 'react'
import './Cart.css'
import axios from 'axios'
export default function Cart() {
  const userId = localStorage.getItem('userId')
  const [loading, setLoading] = useState(true)
  const [userProducts, setUserProducts] = useState()
  useEffect(() => {
    getCartProducts()
  }, [])

  async function getCartProducts() {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/cart?userId=${userId}`,)
    console.log(response.data.items)
    setUserProducts(response.data.items)
    setLoading(false)
  }
  return (
    <div className='cart-component'>
      {
        loading ? (
          <p>loading...</p>
        ) : (
          <div className='cart-items'>
            {
              userProducts.map((productItem)=>(
                <div className='cart-item' key={productItem._id}>
                  <h3>Name: {productItem.product.name}</h3>
                  <p><b>Price:</b> {productItem.product.price}</p>
                  <p><b>Description:</b>{productItem.product.description}</p>
                  <p><b>Category:</b> {productItem.product.category}</p>
                  <p><b>Stock: </b>{productItem.product.stock}</p>
                  <p><b>Quantity:</b> {productItem.quantity}</p>
                </div>
              ))
            }
          </div>
        )
      }
    </div>
  )
}
