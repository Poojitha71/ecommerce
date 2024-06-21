import React,{useEffect,useState} from 'react'
import axios from 'axios'
import './Home.css'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
export default function Home() {
  const userId=localStorage.getItem("userId")
  const [products,setProducts]=useState([])
  const [loading,setLoading]=useState(true)
  const navigate=useNavigate()
  useEffect(()=>{
    fetchProducts()
  },[])
  async function fetchProducts(){
    const response=await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/products`)
    setProducts(response.data)
    setLoading(false)
  }
  async function handleAddProduct(productId){
    console.log(productId,userId)
    if(!userId){
      Swal.fire({
        icon:'warning',
        title:"Oops...",
        text:"Please login to add product"
      })
      return navigate("/login") 
    }
    const response=await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/cart/add`,{productId,quantity:1},{
      params:{userId}
    })
    console.log(response)
    if(response.status===200){
      Swal.fire({
        icon:"success",
        title:"Success",
        text:"Addedd Successfully"
      })
      return navigate('/cart')
    }else{
      Swal.fire({
        icon:"error",
        title:"Error",
        text:"Something Went Wrong"
      })
      return 
    }
  }
  return (
    <div className='home-container'>
      {
        loading ?(
          <p>Loading....</p>
        ):(
          <div className='product-list'>
            {
              products.map((product)=>(
                
                <div className='product-item' key={product._id}>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <p>{product.price}</p>
                  <p>{product.category}</p>
                  <p>{product.stock}</p>
                  <button onClick={()=>handleAddProduct(product._id)}>Add to Cart</button>
                </div>
              ))
            }
          </div>
        )
      }
    </div>
  )
}