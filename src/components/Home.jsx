import React from 'react'

import PHONE from '../assets/phoneMAIN.png'
import LIST from '../assets/listMAIN.png'
import LINK from '../assets/linkMAIN.png'
import MENTORLIST from '../assets/mentorListMAIN.png'
import MENTORIMG from '../assets/mentorListImgMAIN.png'
import MENTORLINK from '../assets/mentorLinkMAIN.png'

const Home = () => {
  return (
    <div>
      <div class="tw-text-center tw-items-center">
        <h1 class="display-2 tw-font-oceanwide tw-pt-[100px] tw-text-[#1D1D1D]">Learn and grow<br />with a Canadian mentor</h1>
        <h5 style={{fontWeight: "100"}} class="tw-font-oceanwide tw-font-light tw-text-[#40454F] tw-pt-2 tw-text-lg">Students in tech with mentors achieve, on average, a 67% higher rate of career advancement and satisfaction.</h5>
        <button style={{fontSize: "120%"}} class="tw-font-semibold tw-text-white tw-font-dmsans mt-3 tw-border-[#5685C9] tw-border-3 tw-py-3.5 tw-px-5 tw-font hover:tw-text-[#5685C9] tw-bg-[#5685C9] tw-rounded-xl tw-border-solid hover:tw-bg-white tw-duration-300" type="button">Find a mentor today</button>
      </div>

      <div class="container tw-pt-[100px]">
        <div class="row gx-0 gy-5">
          <div class="col-md-4 d-flex align-items-center justify-content-center">
            <img class="img-fluid" src={PHONE} alt=""></img>
          </div>
          <div class="col-md-6 offset-md-1 d-flex align-items-center justify-content-center">
            <div class="row-md-6">
              <img class="img-fluid" src={LIST} alt=""></img>
              <div class="row-md-2 mt-3">
                  <a href="/">
                    <img class="img-fluid" src={LINK} alt="" />
                  </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container tw-pt-[125px]">
        <div class="row gx-0 gy-5">
          <div class="col-md-6 d-flex align-items-center justify-content-center">
          <div class="row-md-6">
              <img class="img-fluid" src={MENTORLIST} alt=""></img>
              <div class="row-md-2 mt-3">
                  <a href="/">
                    <img class="img-fluid" src={MENTORLINK} alt="" />
                  </a>
              </div>
            </div>
          </div>
          <div class="col-md-4 offset-md-1 d-flex align-items-center justify-content-center">
            <img class="img-fluid" src={MENTORIMG} alt=""></img>
          </div>
        </div>
      </div>

    </div>

    
  )
}

export default Home
