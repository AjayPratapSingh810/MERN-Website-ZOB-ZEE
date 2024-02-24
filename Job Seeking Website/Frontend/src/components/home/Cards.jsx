function Cards() {
    return <>
        <div class="container px-4 py-1" id="custom-cards">

            <div class="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-1">
                <div class="col">
                    <div class="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg" style={{ backgroundImage: "url('unsplash-photo-1.jpg')" }}>
                        <div class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                            <h5 class="pt-1 mt-1 mb-4  lh-1">We understand that each candidate and employer has distinct needs. Our platform employs advanced algorithms to tailor recommendations, ensuring a personalized and efficient experience for everyone.</h5>

                        </div>
                    </div>
                </div>

                <div class="col">
                    <div class="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg" style={{ backgroundImage: "url('unsplash-photo-1.jpg')" }}>
                        <div class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                            <h5 class="pt-1 mt-1 mb-4  lh-1">Embracing the latest in technology, we facilitate a seamless hiring process for employers and offer robust tools for job seekers to showcase their skills and achievements.</h5>                        </div>
                    </div>
                </div>

                <div class="col">
                    <div class="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg" style={{ backgroundImage: "url('unsplash-photo-1.jpg')" }}>
                        <div class="d-flex flex-column h-100 p-5 pb-3 text-shadow-1">
                            <h5 class="pt-1 mt-1 mb-4  lh-1">ZOB ZEE is not just a platform; it's a thriving community of ambitious individuals and visionary companies. Join us in building networks that go beyond transactions, creating lasting professional relationships.</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Cards;