let garages = [];

const fillGarages = async () => {
  let garageDetails = await callAPI("/owner/garages/getGaragesList");
  garages = garageDetails.garages;
  let garageList = ``;
  let index = 0;
  garages.forEach((garage) => {
    garageList += `
      <div class="w-1/3 p-2 h-[600px] relative">
      <div class="absolute top-0 right-0 flex items-center mr-4 mt-4">
  <button type="button" class="bg-dark focus:outline-none rounded-full h-full w-full" onClick="editGarage(${index++})"}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
          style="fill: rgba(255, 255, 255, 1);">
          <path
              d="M4 21a1 1 0 0 0 .24 0l4-1a1 1 0 0 0 .47-.26L21 7.41a2 2 0 0 0 0-2.82L19.42 3a2 2 0 0 0-2.83 0L4.3 15.29a1.06 1.06 0 0 0-.27.47l-1 4A1 1 0 0 0 3.76 21 1 1 0 0 0 4 21zM18 4.41 19.59 6 18 7.59 16.42 6zM5.91 16.51 15 7.41 16.59 9l-9.1 9.1-2.11.52z">
          </path>
      </svg>
  </button>
</div>
      <div class="w-full h-full border border-gray-200 rounded-lg shadow" id='${
        garage.id
      }'>
      <a href="#" class="mb-4">
          <img class="rounded-t-lg w-full h-[280px]" src="/uploads/${
            garage.thumbnail
          }" onerror="this.src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeUyb754vebKqfbxScXd11wIOQGyxRlNNQBv31JG4wC9ytLmJgMP3i__68EPQpIN3vrPk&usqp=CAU'" />
      </a>
      <div class="p-5">
          <div class="flex justify-between mb-2">
              <h5 class="mb-2 text-2xl font-bold tracking-wide text-dark ">${
                garage.garage_name
              }</h5>
              <tag class="${
                garage.status ? "bg-[#038117]" : "bg-[#ff5f5f]"
              } w-max h-max px-4 py-[6px] rounded-xl text-white tracking-wide">${
      garage.status ? "OPEN" : "CLOSE"
    }</tag>
          </div>
          <div class="flex items-center mt-2">
              <icon class="bg-dark p-1 rounded-full mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                      style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;">
                      <path
                          d="M20 4H6c-1.103 0-2 .897-2 2v5h2V8l6.4 4.8a1.001 1.001 0 0 0 1.2 0L20 8v9h-8v2h8c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm-7 6.75L6.666 6h12.668L13 10.75z">
                      </path>
                      <path d="M2 12h7v2H2zm2 3h6v2H4zm3 3h4v2H7z"></path>
                  </svg>
              </icon>
              <p class="text-dark font-semibold text-sm">${garage.email}</p>
          </div>
          <div class="flex items-center mt-2">
              <icon class="bg-dark p-1 rounded-full mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                      style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;">
                      <path
                          d="M16.57 22a2 2 0 0 0 1.43-.59l2.71-2.71a1 1 0 0 0 0-1.41l-4-4a1 1 0 0 0-1.41 0l-1.6 1.59a7.55 7.55 0 0 1-3-1.59 7.62 7.62 0 0 1-1.59-3l1.59-1.6a1 1 0 0 0 0-1.41l-4-4a1 1 0 0 0-1.41 0L2.59 6A2 2 0 0 0 2 7.43 15.28 15.28 0 0 0 6.3 17.7 15.28 15.28 0 0 0 16.57 22zM6 5.41 8.59 8 7.3 9.29a1 1 0 0 0-.3.91 10.12 10.12 0 0 0 2.3 4.5 10.08 10.08 0 0 0 4.5 2.3 1 1 0 0 0 .91-.27L16 15.41 18.59 18l-2 2a13.28 13.28 0 0 1-8.87-3.71A13.28 13.28 0 0 1 4 7.41zM20 11h2a8.81 8.81 0 0 0-9-9v2a6.77 6.77 0 0 1 7 7z">
                      </path>
                      <path d="M13 8c2.1 0 3 .9 3 3h2c0-3.22-1.78-5-5-5z"></path>
                  </svg>
              </icon>
              <p class="text-dark font-semibold text-sm">+91 ${
                garage.contact_number
              }</p>
          </div>
          <div class="flex items-center mt-2">
              <icon class="bg-dark p-1 rounded-full mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                      style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;">
                      <path d="M7 11h2v2H7zm0 4h2v2H7zm4-4h2v2h-2zm0 4h2v2h-2zm4-4h2v2h-2zm0 4h2v2h-2z"></path>
                      <path
                          d="M5 22h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zM19 8l.001 12H5V8h14z">
                      </path>
                  </svg>
              </icon>
              <p class="text-dark font-semibold text-sm">${formatTimeAMPM(
                garage.open_time.split(" ")[1]
              )} to ${formatTimeAMPM(garage.close_time.split(" ")[1])}</p>
          </div>
          <div class="flex mt-2">
              <icon class="bg-dark p-1 rounded-full mr-2 h-max">
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25"
                      viewBox="0,0,256,256">
                      <g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt"
                          stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0"
                          font-family="none" font-weight="none" font-size="none" text-anchor="none"
                          style="mix-blend-mode: normal">
                          <g transform="scale(5.12,5.12)">
                              <path
                                  d="M25,2c-12.6907,0 -23,10.3093 -23,23c0,12.69071 10.3093,23 23,23c12.69071,0 23,-10.30929 23,-23c0,-12.6907 -10.30929,-23 -23,-23zM25,4c11.60982,0 21,9.39018 21,21c0,11.60982 -9.39018,21 -21,21c-11.60982,0 -21,-9.39018 -21,-21c0,-11.60982 9.39018,-21 21,-21zM25,11c-1.65685,0 -3,1.34315 -3,3c0,1.65685 1.34315,3 3,3c1.65685,0 3,-1.34315 3,-3c0,-1.65685 -1.34315,-3 -3,-3zM21,21v2h1h1v13h-1h-1v2h1h1h4h1h1v-2h-1h-1v-15h-1h-4z">
                              </path>
                          </g>
                      </g>
                  </svg>
              </icon>
              <p class="text-dark font-semibold text-left text-sm">${
                garage.description?.substring(0, 150) || ""
              }...</p>
          </div>

      </div>
  </div>
  </div>
      `;
  });
  document.getElementById("garage-container").innerHTML = garageList;
};
fillGarages();
