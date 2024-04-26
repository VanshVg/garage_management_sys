
const notification = () => {
  const socketIo = io("");

  // socketIo.on('connect', ()=> {
  //   console.log("Socket Io is working");
  // })

  socketIo.on('notification', (notification) => {
    document.querySelectorAll('.totalNotification').forEach((notify=>{
        notify.innerHTML = notification.length;
    }))

    let notified = "";

    notification.forEach((ele) => {
      notified += `<div class="bg-slate-400 max-w-fit p-2 mt-10 -ml-[315px] float-left rounded-lg     absolute hidden" id="detailedNotification">
        <div class="bg-slate-400 p-3 w-10 h-10 -mt-2 mb-3 float-right rotate-45 "></div>
        <div class="bg-light py-1 px-2 m-2 rounded-lg text-left relative">
        <h4>${ele.customerName}</h4>
        <p>${ele.customerName} had requested for approval of slot</p>
        </div>
        </div>`
      
      document.getElementById('userNotification').innerHTML = notified;
    })

    // console.log(notified);

    // document.getElementById('userNotification').innerHTML = notified;

    // document.querySelectorAll('.userNotification').forEach((notify) => {
    //   notify.innerHTML = notified;
    // })

  })

}

notification();
