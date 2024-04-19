// const populateSlots = async () => {
//   let payLoad = {
//     "garageId": 12,
//   }
//   let data = await fetch('/customer/servicesList', {
//     method: "post",
//     headers: {
//       "Content-type": "application/json"
//     },
//     body: JSON.stringify(payLoad)
//   });
//   let result = await data.json();
//   let serviceDisplay = document.getElementById("serviceList");
//   if (result.length == 0) {
//     serviceDisplay.innerHTML = ` <p class="font-serif text-2xl text-white">No Service Available</p>`;
//   } else {
//     result.forEach((element) => {
//       serviceDisplay.innerHTML += `<label>
//               <li class="max-w-fit mx-3 h-20 bg-blue rounded-6 flex items-center rounded-lg my-5 relative">
//                   <div class="flex items-center ps-3 ">

//                       <input type="checkbox" name="test" value="${element.id}"
//                           class="w-5 h-5 absolute right-0 top-0">
//                       <img src="/assets/service.png" class="w-16 h-16 rounded-md" alt="Option 1">

//                       <div class="max-w-56">
//                           <p class="font-medium text-sm ml-4">
//                               ${element.description}
//                           </p>
//                       </div>
//                   </div>
//               </li>
//           </label>`
//     });
//   }
// }
// populateSlots();