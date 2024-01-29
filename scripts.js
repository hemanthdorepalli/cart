document.addEventListener('DOMContentLoaded',()=>{
    const addtocartBtn=document.querySelectorAll('.add-to-cart-btn')
  //   console.log(addtocartBtn)
  //   accessing all btns to adding the functionality for all the add to cart buttons
  addtocartBtn.forEach((ele)=>{
      // console.log(ele)
      // add functionality
      ele.addEventListener('click',(e)=>{
          // console.log(e.target)
          // accessing the product information through the navigator
          const productInfo=ele.parentElement.parentElement
          // console.log(productInfo)
          // accessing the information like title peice img
          const productTitle=productInfo.querySelector('.product-title').innerText
          const productPrice=productInfo.querySelector('.product-price').innerText
          const productImgage=productInfo.querySelector('.product-img').src
          console.log(productTitle)
          // console.log(productPrice)
          // console.log(productImgage)
          // creating a single object for selected items to store cart
          const SelectedProducts={
              name:productTitle,
              price:productPrice,
              ImageUrl:productImgage
          }
        //   console.log(SelectedProducts)
  //passing the selected products into the add to cart function as value
          AddtoCart(SelectedProducts)
      })
  })
  })

  let CartItems=[]
console.log(CartItems)
  function AddtoCart(products){
    // debugger;

    console.log(products)
// checking for existing items in the cart
const ExistingItems=CartItems.find((item)=>item.name === products.name)
if(ExistingItems){
    //increasing the quantity for the items that is found in the cart (only for Existing items)
    ExistingItems.quantity++
}else{
    //if items not found in cart the singlr item with quantity one will be pushes in cart
    CartItems.push({...products,quantity:1})
}
//calling method
UpdateCartUI()
}

function UpdateCartUI(){
    //accessing the ul list to print the selected cart items into it
    const CartItemEle=document.querySelector('.cart_items')
     CartItemEle.innerHTML=''

    //accessing the array to print the item selected
    CartItems.forEach((item)=>{
    
        console.log(item)
        //creating li items and appending dynamically into cart
        const CartProd=document.createElement('li')
        CartProd.innerHTML=`     
         <div class="product">
        <img src=${item.ImageUrl} class="product-img" />

        <div class="product-info">
          <h4 class="product-title">${item.name}</h4>
          <p class="product-price">${item.price}</p>
          <span class="Quantity">${item.quantity}</span>
          <div class="quantity-container">
            <button class="increase-quantity">+</button>
            <span class="quantity-val">${item.quantity}</span>
            <button class="decrease-quantity">-</button> 
        </div>
        <button class="remove-quantity">remove-quantity</button>
        </div>
        </div>`
    //  console.log(CartProd) 

    //adding the functionality for increase and decrease buttons
    const CartProductEle=CartProd.querySelector('.quantity-container')// increase / decrease
    const CartProductVal=CartProd.querySelector('.Quantity') //value of number of products / items (similar)
    const increaseQuantity=CartProductEle.querySelector('.increase-quantity')
    const decreaseQuantity=CartProductEle.querySelector('.decrease-quantity')
    const removeQuantity=CartProd.querySelector('.remove-quantity')//remove button

    //adding functionality to increase decrease , remove buttons through add event listeners
    increaseQuantity.addEventListener('click',()=>{
        HandleIncQuantity(item,CartProductVal)
    })
    //decrease functionality
    decreaseQuantity.addEventListener('click',()=>{
        HandleDecQuantity(item,CartProductVal)
    })
    //remove functionality
    removeQuantity.addEventListener('click',()=>{
        HandleRemQuantity(item)
    })
   //appending the cardprod(li) element
   CartItemEle.appendChild(CartProd)
    })
}

// function to handle increase_quantity

function HandleIncQuantity(item,CartProductVal){
    item.quantity++
    CartProductVal.innerText=item.quantity
    UpdateCartUI()
}
// function to handle decrese_quantity

function HandleDecQuantity(item,CartProductVal){
if(item.quantity>1){
   item.quantity--
   CartProductVal.innerText=item.quantity
}
UpdateCartUI()
// CartIconTotal()
// CartTotal()

}
// function to handle Delete_item

function HandleRemQuantity(item){
   let index=CartItems.findIndex((prod)=>item.name==prod.name)
   if(index!=-1){
       if(CartItems[index]>1){
           CartItems[index].quantity-- //used for removing only one item at a time 
       }
       else{
           CartItems.splice(index,1) //if only one element is found it removes item completely
       }
   }
UpdateCartUI()
// CartTotal()
// CartIconTotal()
}