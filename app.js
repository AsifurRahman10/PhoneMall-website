let currentSearchValue = "iphone";
// call date
const callPhoneData = (status = false, searchValue = currentSearchValue) => {
    console.log(searchValue);
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchValue}`)
        .then(res => res.json())
        .then(data => {
            displayAllPhone(data.data, status)

        })
}

// search function
document.getElementById('btn-click').addEventListener('click', () => {
    const search = document.getElementById('search').value;
    currentSearchValue = search;
    callPhoneData(false, search)

})



// all phone show
const showAll = () => {
    callPhoneData(true);
}

// display data
const displayAllPhone = (phones, status) => {
    const allPhones = status ? phones : phones.slice(0, 6)
    document.getElementById('phone-container').innerHTML = ''
    allPhones.forEach(phone => {
        const phoneContainer = document.getElementById('phone-container');
        const div = document.createElement('div');
        div.classList = "card bg-[#1E3E62] shadow-xl rounded-lg";
        div.innerHTML = `
        <figure class="px-10 pt-10">
        <img
          src="${phone.image}"
          alt="Shoes"
          class="rounded-xl"
        />
      </figure>
      <div class="card-body items-center text-center">
        <h2 class="card-title text-white">${phone.phone_name}</h2>
        <p class ="font-bold">Brand : ${phone.brand}</p>
        <div class="card-actions">
          <button onclick="showDetails('${phone.slug}')" class="btn bg-[#FF6500] btn-primary border-none text-white">Show Details</button>
        </div>
      </div>
        `
        phoneContainer.appendChild(div)
    });
}

// view Details
const showDetails = (slags) => {
    fetch(`https://openapi.programming-hero.com/api/phone/${slags}`)
        .then(res => res.json())
        .then(data => {
            console.log(data.data)
            const modal = document.getElementById('my-modal');
            const modalTextContainer = document.getElementById('modal-text');
            modalTextContainer.innerHTML = `
            <h3 class="text-lg font-bold">${data.data.name}</h3>
                <img src="${data.data.image}" alt="">
                  <p class="py-4">${data.data.releaseDate}</p>
                  <div class="modal-action">
            `
            modal.showModal();


        })

}

callPhoneData();