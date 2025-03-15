import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ACards from './ACards';
import ReactDOMServer from "react-dom/server";
import { sendCustomEmail } from '../Emails/email';
import FranchiseEmailBody from '../Emails/FranchiseEmail';
import { use } from 'react';
import '../index.css';

const ApplicantDash = () => {
  const [applicants, setApplicants] = useState([]);
  const [allApplicants, setAllApplicants] = useState([]); // Store all applications
  const [selcom,setcurrent]=useState("");

  async function FetchData() {
    try {
      let url = "http://localhost:2008/admin/fetchdata";
      let resp = await axios.get(url);
        // alert("inside fetchdata")
      if (resp.data.status == true) {
        setApplicants(resp.data.appdata);
        setAllApplicants(resp.data.appdata); // Store original data separately
        // showselComp(selcom); // Show all applicants by default
      } else {
        alert(resp.data.msg);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // Update applicant status
//   async function updateStatus(id, newStatus) {
//     try {
//         alert("inside the function updatestatus")
//       let url = `http://localhost:2008/user/updateStatus?email=${id}&status=${newStatus}`;
//       let resp = await axios.get(url);

//       alert(resp.data.msg);
      
//         FetchData(); // Refresh data after update
      
//     } catch (error) {
//       console.error("Error updating status:", error);
//     }
//   }

  async function Acceptapp(id) {
    try {
        alert("inside the function updatestatus A")
      let url = `http://localhost:2008/admin/acceptapp`;
      let resp = await axios.post(url,{email:id},{headers:{"Content-Type":"application/x-www-form-urlencoded"}});

      alert(resp.data.msg);
      FetchData(); // Refresh data after update
      
    } catch (error) {
      console.error("Error updating status A:", error);
    }
  }
  async function rejectapp(id) {
    try {
        alert("inside the function updatestatus R")
      let url = `http://localhost:2008/admin/rejectapp`;
        let resp = await axios.post(url,{email:id},{headers:{"Content-Type":"application/x-www-form-urlencoded"}});
     

      alert(resp.data.msg);
      
        FetchData(); // Refresh data after update
      
    } catch (error) {
      console.error("Error updating status R:", error);
    }
  }
  async function franchiseapp(id) {
    try {
        alert("inside the function updatestatus F")
        let url = `http://localhost:2008/admin/grantapp`;
        let resp = await axios.post(url,{email:id},{headers:{"Content-Type":"application/x-www-form-urlencoded"}});
        alert(resp.data.msg);
        FetchData(); // Refresh data after update

            async function SaveFrCred(id) {
            
                let url = `http://localhost:2008/admin/addfranchise`;

                let resp = await axios.post(url,{email:id},{headers:{"Content-Type":"application/x-www-form-urlencoded"}});
               
                if(resp.data.status==true)
                {
                    alert(resp.data.msg);
                    sendCustomEmail({
                        to_email: id,
                        subject: "Franchise Application Accepted",
                        message: ReactDOMServer.renderToStaticMarkup(
                            <FranchiseEmailBody
                              pwd={resp.data.pwd}
                              email={id}
                            />
                          ),
                    });
                }
        }
        SaveFrCred(id);
    } catch (error) {
      console.error("Error updating status F:", error);
    }
  }

  function dorendercard(object, index) {
    return <ACards key={index} {...object} onAccept={Acceptapp} onReject={rejectapp} onFranchise={franchiseapp} />;
  }

  function onchangetab(tab)
  {
    setcurrent(tab);
  }

  useEffect(() => {
    FetchData();
  }, []);
  useEffect(()=>{
        let filteredjson = [];
        if(selcom==""){
            filteredjson = allApplicants;
        }
        if (selcom =="FRANCHISE") {
            filteredjson = allApplicants.filter(obj => obj.status == 2);
        }
        if (selcom =="ACCEPTED") {
          filteredjson = allApplicants.filter(obj => obj.status == 1);
        } 
        else if (selcom == "REJECTED") {
          filteredjson = allApplicants.filter(obj => obj.status == -1);
        }
         else if (selcom == "APPLICATIONS") {
          filteredjson = allApplicants.filter(obj => obj.status == 0);
        }
        setApplicants(filteredjson);
  },[selcom,allApplicants])

  return (
    <div>
      <div className='combo'>
        <select onChange={(event) => { onchangetab(event.target.value) }}>
        <option key='noval' value=''>all</option>
          <option key='accept' value='ACCEPTED'>ACCEPTED</option>
          <option key='reject' value='REJECTED'>REJECTED</option>
          <option key='application' value='APPLICATIONS'>APPLICATIONS</option>
          <option key='franchise' value='FRANCHISE'>FRANCHISE</option>
        </select>
      </div>

      <div>
        {applicants.map((obj, index) => dorendercard(obj, index))}
        {/* <input type="button" value="Fetch Data" onClick={FetchData} /> */}
        {/* <input type="button" value="Test Update" onClick={() => updateStatus('dakshj2029@gmail.com', 0)} /> */}
      </div>
    </div>
  );
};

export default ApplicantDash;































// import React from 'react';
// import { useState } from 'react';
// import axios from 'axios';
// import ACards from './ACards';
// import '../index.css'
// const ApplicantDash = () => {
//   const [applicants, setApplicants] = useState([]);
// //   const [activeTab, setActiveTab] = useState('applications');

// var Allappli;
// async function FetchData()
// {
//   let url="http://localhost:2008/user/fetchdata";
//   let resp= await axios.get(url);
//     alert(JSON.stringify(resp.data.appdata))
//     if(resp.data.status==true){
//         setApplicants(resp.data.appdata)
//         Allappli=applicants
//     }
//     else
//     alert(resp.data.msg)
// }


// //   // Update applicant status
//   async function updateStatus (id, newStatus) {
    
//     try {
//         let url=`http://localhost:2008/user/updateStatus?email=${id}&status=${newStatus}`;
//         let resp= await axios.get(url);
//           //alert(JSON.stringify(resp.data)); 
//           if(resp.data.status==true)
//               alert(resp.data.msg);
//           else
//           {
//             alert(resp.data.msg);
//           }
//       FetchData(); // Refresh the data
//     } catch (error) {
//       console.error('Error updating status:', error);
//     }
//   };

//   function dorendercard(object,index)
//     {
//         // return <Card path={obj.path} company={obj.company} price={obj.price} owner={obj.owner}></Card>
//         return <ACards key={index} {...object} updatest={updateStatus} ></ACards> //data in the tag is recieved in chilren prop in cards.jsx
//     }


//      function showselComp(selcom)
//     {
//         if(selcom=="ACCEPTED"){
//             let filteredjson=Allappli?.filter(obj=>obj.status===1)
//             setApplicants(filteredjson);
//         }
//         if(selcom=="REJECTED"){
//             let filteredjson=Allappli.filter(obj=>obj.status===-1)
//             setApplicants(filteredjson);
//         } 
//         if(selcom=="APPLICATIONS"){
//             let filteredjson=Allappli.filter(obj=>obj.status===0)
//             setApplicants(filteredjson);
//         }
        
//     }

//   return (
//     <div >
//         <div className='combo'>
//         <select onChange={(event)=>{showselComp(event.target.value)}}>

//                <option key='accept' value='ACCEPTED'>ACCEPTED</option>
//                <option key='reject' value='REJECTED'>REJECTED</option>
//                <option key='application' value='APPLICATIONS'>APPLICATIONS</option>

            
//         </select>
//         </div>
//     <div>   
//         {
//             applicants.map((obj)=>dorendercard(obj))
//         }
       
//        <input
//           type="button"
//           value="Alert the text input"
//           onClick={FetchData}
//         />

//         <input
//           type="button"
//           value="Alert the text input"
//           onClick={()=>updateStatus('dakshj2029@gmail.com',0)}
//         />
        

//     </div> 
//     </div>
//   );
// };

// export default ApplicantDash;

// // {/* <div className="container mx-auto p-4">
// //       <Tabs value={activeTab} onValueChange={setActiveTab}>
// //         <TabsList className="w-full mb-6">
// //           <TabsTrigger value="applications" className="flex-1">
// //             Applications
// //           </TabsTrigger>
// //           <TabsTrigger value="accepted" className="flex-1">
// //             Accepted
// //           </TabsTrigger>
// //           <TabsTrigger value="rejected" className="flex-1">
// //             Rejected
// //           </TabsTrigger>
// //         </TabsList>

// //         {['applications', 'accepted', 'rejected'].map((tab) => (
// //           <TabsContent key={tab} value={tab}>
// //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// //               {filteredApplicants.map((applicant) => (
// //                 <Card key={applicant._id} className="shadow-lg">
// //                   <CardContent className="p-4">
// //                     <div className="mb-4">
// //                       <h3 className="text-lg font-semibold">{applicant.name}</h3>
// //                       <p className="text-gray-600">{applicant.email}</p>
// //                       <p className="text-sm text-gray-500 mt-2">
// //                         {applicant.position}
// //                       </p>
// //                     </div>
                    
// //                     {activeTab === 'applications' && (
// //                       <div className="flex justify-end gap-2">
// //                         <Button
// //                           onClick={() => updateStatus(applicant._id, 1)}
// //                           className="bg-green-500 hover:bg-green-600"
// //                         >
// //                           <Check className="w-4 h-4 mr-2" />
// //                           Accept
// //                         </Button>
// //                         <Button
// //                           onClick={() => updateStatus(applicant._id, -1)}
// //                           variant="destructive"
// //                         >
// //                           <X className="w-4 h-4 mr-2" />
// //                           Decline
// //                         </Button>
// //                       </div>
// //                     )}
// //                   </CardContent>
// //                 </Card>
// //               ))}
// //             </div>
// //           </TabsContent>
// //         ))}
// //       </Tabs>
// //     </div> */}