
import React from 'react'
import '../index.css'
import './cards.css'

function ACards(obj) { // obj={id,company,price,owner,fx1,fx2,fx3,detalis,||children||} 
    
    function like2(id,newstat){
        // alert("hehe");
        // obj.fx();
        obj.updatest(id,newstat);
    }
  return (
    <div className='box'>
        <center>
            <img src='./pics/img2.png'></img>
        </center>
        <hr/>

        <h3>{obj.email}</h3>
        <p>{obj.name}</p>
        <p>{obj.city}</p>
        <p>{obj.contact}</p>
        {/* <p>details: </p>
        {obj.children} */}
        
        {obj.status == 0?(
        <button onClick={()=>obj.onAccept(obj.email)}>accept</button>
        ):null}
        {obj.status == 0 || obj.status == 1?(
        <button onClick={()=>obj.onReject(obj.email)}>Decline</button>
        ):null}
        {obj.status == 1?(
        <button onClick={()=>obj.onFranchise(obj.email,2)}>franchise</button>
        ):null}
        {obj.status == -1?(
        <button >applicant rejected</button>
        ):null}

        {/* <button onClick={obj.fx}>like 1</button> */}


    </div>

  )
}


export default ACards
  
    
      















// import React from "react";
// import '../index.css' 

// const ACards = (object) => {
//   return (
//     <>
//       <section className="bg-gray-2 pb-10 pt-20 dark:bg-dark lg:pb-20 lg:pt-[120px]">
//         <div className="container">
//           <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
//           <div className="mb-10 overflow-hidden rounded-lg bg-white shadow-1 duration-300 hover:shadow-3 dark:bg-dark-2 dark:shadow-card dark:hover:shadow-3">
//         {/* <img src={image} alt="" className="w-full" /> */}
//         <div className="p-8 text-center sm:p-9 md:p-7 xl:p-9">
//           <h3>
//             <a
//               // href={titleHref ? titleHref : "/#"}
//               className="mb-4 block text-xl font-semibold text-dark hover:text-primary dark:text-white sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]"
//             >
//               hii
//             </a>
//           </h3>