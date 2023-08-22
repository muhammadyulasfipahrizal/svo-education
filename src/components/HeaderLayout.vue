<template>
  <div id="app-header">

    <div v-show="!isMobile">
      <div class="flex justify-content-between mt-2 align-items-center surface-0 surface-border relative md:static px-2">
        <div class="flex">
          <div class="card flex justify-content-center">
            <div @click="toggleDropdown" class="cursor-pointer	flex flex-row align-items-center justify-content-between px-2 ml-2 filter-toggle w-9rem">
              <p class="font-semibold text-filter">Filter</p>
              <i class="text-lg pi pi-angle-down"></i>
            </div>

          </div>
        </div>
        <ul
          class="list-none p-0 m-0 md:flex md:align-items-center select-none md:flex-row surface-section border-1 md:border-none surface-border right-0 top-100 shadow-2 md:shadow-none md:static">
          <li>
            <div class="card flex flex-wrap justify-content-center gap-0 align-items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17Z"
                  stroke="#001125" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M19.9992 20.0031L14.9492 14.9531" stroke="#001125" stroke-width="1.5" stroke-linecap="round"
                  stroke-linejoin="round" />
                <path d="M20.5 20.5L17 17" stroke="#001125" stroke-width="1.5" stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg>
              <InputText v-model="search" placeholder="Search" class="border-none search py-2" />
            </div>
          </li>
          <li>
            <div class="v-border"></div>
          </li>
          <li><a href="/dashboard/calander"
              class="flex p-3 md:px-3 md:py-2 align-items-center text-600 hover:text-900 hover:surface-100 font-medium border-round cursor-pointer transition-duration-150 transition-colors p-ripple">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                class="text-base md:text-2xl mr-2 md:mr-0">
                <path
                  d="M12 17.0909C12.1582 17.0909 12.3129 17.0483 12.4445 16.9683C12.576 16.8884 12.6786 16.7748 12.7391 16.642C12.7997 16.5091 12.8155 16.3628 12.7846 16.2218C12.7538 16.0807 12.6776 15.9511 12.5657 15.8494C12.4538 15.7477 12.3113 15.6784 12.1561 15.6503C12.0009 15.6223 11.84 15.6367 11.6939 15.6917C11.5477 15.7468 11.4227 15.84 11.3348 15.9596C11.2469 16.0792 11.2 16.2198 11.2 16.3636C11.2 16.5565 11.2843 16.7415 11.4343 16.8779C11.5843 17.0143 11.7878 17.0909 12 17.0909ZM16 17.0909C16.1582 17.0909 16.3129 17.0483 16.4445 16.9683C16.576 16.8884 16.6786 16.7748 16.7391 16.642C16.7997 16.5091 16.8155 16.3628 16.7846 16.2218C16.7538 16.0807 16.6776 15.9511 16.5657 15.8494C16.4538 15.7477 16.3113 15.6784 16.1561 15.6503C16.0009 15.6223 15.84 15.6367 15.6939 15.6917C15.5477 15.7468 15.4227 15.84 15.3348 15.9596C15.2469 16.0792 15.2 16.2198 15.2 16.3636C15.2 16.5565 15.2843 16.7415 15.4343 16.8779C15.5843 17.0143 15.7878 17.0909 16 17.0909ZM16 14.1818C16.1582 14.1818 16.3129 14.1392 16.4445 14.0593C16.576 13.9793 16.6786 13.8658 16.7391 13.7329C16.7997 13.6 16.8155 13.4537 16.7846 13.3127C16.7538 13.1716 16.6776 13.042 16.5657 12.9403C16.4538 12.8386 16.3113 12.7693 16.1561 12.7412C16.0009 12.7132 15.84 12.7276 15.6939 12.7826C15.5477 12.8377 15.4227 12.9309 15.3348 13.0505C15.2469 13.1701 15.2 13.3107 15.2 13.4545C15.2 13.6474 15.2843 13.8324 15.4343 13.9688C15.5843 14.1052 15.7878 14.1818 16 14.1818ZM12 14.1818C12.1582 14.1818 12.3129 14.1392 12.4445 14.0593C12.576 13.9793 12.6786 13.8658 12.7391 13.7329C12.7997 13.6 12.8155 13.4537 12.7846 13.3127C12.7538 13.1716 12.6776 13.042 12.5657 12.9403C12.4538 12.8386 12.3113 12.7693 12.1561 12.7412C12.0009 12.7132 11.84 12.7276 11.6939 12.7826C11.5477 12.8377 11.4227 12.9309 11.3348 13.0505C11.2469 13.1701 11.2 13.3107 11.2 13.4545C11.2 13.6474 11.2843 13.8324 11.4343 13.9688C11.5843 14.1052 11.7878 14.1818 12 14.1818ZM17.6 5.45455H16.8V4.72727C16.8 4.53439 16.7157 4.3494 16.5657 4.21301C16.4157 4.07662 16.2122 4 16 4C15.7878 4 15.5843 4.07662 15.4343 4.21301C15.2843 4.3494 15.2 4.53439 15.2 4.72727V5.45455H8.8V4.72727C8.8 4.53439 8.71571 4.3494 8.56569 4.21301C8.41566 4.07662 8.21217 4 8 4C7.78783 4 7.58434 4.07662 7.43431 4.21301C7.28429 4.3494 7.2 4.53439 7.2 4.72727V5.45455H6.4C5.76348 5.45455 5.15303 5.68442 4.70294 6.09359C4.25286 6.50276 4 7.05771 4 7.63636V17.8182C4 18.3968 4.25286 18.9518 4.70294 19.361C5.15303 19.7701 5.76348 20 6.4 20H17.6C18.2365 20 18.847 19.7701 19.2971 19.361C19.7471 18.9518 20 18.3968 20 17.8182V7.63636C20 7.05771 19.7471 6.50276 19.2971 6.09359C18.847 5.68442 18.2365 5.45455 17.6 5.45455ZM18.4 17.8182C18.4 18.0111 18.3157 18.1961 18.1657 18.3324C18.0157 18.4688 17.8122 18.5455 17.6 18.5455H6.4C6.18783 18.5455 5.98434 18.4688 5.83431 18.3324C5.68429 18.1961 5.6 18.0111 5.6 17.8182V11.2727H18.4V17.8182ZM18.4 9.81818H5.6V7.63636C5.6 7.44348 5.68429 7.25849 5.83431 7.1221C5.98434 6.98571 6.18783 6.90909 6.4 6.90909H7.2V7.63636C7.2 7.82925 7.28429 8.01423 7.43431 8.15062C7.58434 8.28701 7.78783 8.36364 8 8.36364C8.21217 8.36364 8.41566 8.28701 8.56569 8.15062C8.71571 8.01423 8.8 7.82925 8.8 7.63636V6.90909H15.2V7.63636C15.2 7.82925 15.2843 8.01423 15.4343 8.15062C15.5843 8.28701 15.7878 8.36364 16 8.36364C16.2122 8.36364 16.4157 8.28701 16.5657 8.15062C16.7157 8.01423 16.8 7.82925 16.8 7.63636V6.90909H17.6C17.8122 6.90909 18.0157 6.98571 18.1657 7.1221C18.3157 7.25849 18.4 7.44348 18.4 7.63636V9.81818ZM8 14.1818C8.15823 14.1818 8.3129 14.1392 8.44446 14.0593C8.57602 13.9793 8.67855 13.8658 8.7391 13.7329C8.79965 13.6 8.8155 13.4537 8.78463 13.3127C8.75376 13.1716 8.67757 13.042 8.56569 12.9403C8.4538 12.8386 8.31126 12.7693 8.15607 12.7412C8.00089 12.7132 7.84003 12.7276 7.69385 12.7826C7.54767 12.8377 7.42273 12.9309 7.33482 13.0505C7.24692 13.1701 7.2 13.3107 7.2 13.4545C7.2 13.6474 7.28429 13.8324 7.43431 13.9688C7.58434 14.1052 7.78783 14.1818 8 14.1818ZM8 17.0909C8.15823 17.0909 8.3129 17.0483 8.44446 16.9683C8.57602 16.8884 8.67855 16.7748 8.7391 16.642C8.79965 16.5091 8.8155 16.3628 8.78463 16.2218C8.75376 16.0807 8.67757 15.9511 8.56569 15.8494C8.4538 15.7477 8.31126 15.6784 8.15607 15.6503C8.00089 15.6223 7.84003 15.6367 7.69385 15.6917C7.54767 15.7468 7.42273 15.84 7.33482 15.9596C7.24692 16.0792 7.2 16.2198 7.2 16.3636C7.2 16.5565 7.28429 16.7415 7.43431 16.8779C7.58434 17.0143 7.78783 17.0909 8 17.0909Z"
                  fill="black" />
              </svg>
              <span class="block md:hidden font-medium">Calendar</span><span class="p-ink" role="presentation"></span></a>
          </li>
          <li><a @click="toggleDekstopNotification"
              class="flex p-3 md:px-3 md:py-2 align-items-center text-600 hover:text-900 hover:surface-100 font-medium border-round cursor-pointer transition-duration-150 transition-colors p-ripple">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"
                class="text-base md:text-2xl mr-2 md:mr-0 p-overlay-badge">
                <g id="Group 6492">
                  <path id="Vector"
                    d="M9 1C10.5913 1 12.1174 1.63916 13.2426 2.77689C14.3679 3.91461 15 5.45769 15 7.06667V14H3V7.06667C3 5.45769 3.63214 3.91461 4.75736 2.77689C5.88258 1.63916 7.4087 1 9 1V1Z"
                    stroke="#001125" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path id="Vector_2"
                    d="M6.33333 14C6.33333 14.7956 6.61428 15.5587 7.11438 16.1213C7.61448 16.6839 8.29276 17 9 17C9.70724 17 10.3855 16.6839 10.8856 16.1213C11.3857 15.5587 11.6667 14.7956 11.6667 14M1 14H17H1Z"
                    stroke="#001125" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </g>
              </svg>
              <span class="block md:hidden font-medium">Notifications</span><span class="p-ink"
                role="presentation"></span></a>
          </li>

          <OverlayPanel ref="toggleNotificationDekstop" style="width: 700px" showCloseIcon > 
            <Panel header="Header">
              <div class="grid">
                <p class="col-12 text-lg font-bold text">Notification</p>
                <div v-for="(item, index) in notificationData" :key="index" class="grid col-12">
                  <p class="col-12 dark-grey text">{{ item.date }}</p>
                  <div v-for="(massage, notificationIndex) in item.massage" :key="notificationIndex" class="flex flex-row align-items-center justify-content-between col-12 px-4 py-1">
                    <div class="flex flex-row align-items-center gap-2">
                      <i class="pi pi-circle-fill blue text-xs"></i>
                      <p class="text">{{ massage.subject }} <span class="font-bold">{{massage.verb}}</span> {{ massage.object }}</p>
                    </div>
                    <p class="align-self-end dark-grey text">{{ massage.time }}</p>
                  </div>
                </div>
              </div>
            </Panel>
          </OverlayPanel>

          <li><a @click="toggleDekstop"
              class="flex p-3 md:px-3 md:py-2 align-items-center text-600 hover:text-900 hover:surface-100 font-medium border-round cursor-pointer transition-duration-150 transition-colors p-ripple">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
                class="text-base md:text-2xl mr-2 md:mr-0 p-overlay-badge">
                <path id="Vector"
                  d="M15.1767 11.1868H3.99387C3.78202 11.1868 3.57885 11.1027 3.42905 10.9528C3.27925 10.8029 3.19509 10.5997 3.19509 10.3878C3.19509 10.1759 3.27925 9.97261 3.42905 9.82276C3.57885 9.67291 3.78202 9.58872 3.99387 9.58872H12.3331C12.8672 9.58875 13.386 9.41029 13.8071 9.08166C14.2282 8.75304 14.5275 8.29309 14.6575 7.77486L15.9755 2.58895C16.0054 2.47102 16.008 2.34781 15.9831 2.22872C15.9581 2.10962 15.9064 1.9978 15.8317 1.90176C15.754 1.80326 15.6542 1.72445 15.5404 1.6717C15.4266 1.61895 15.302 1.59374 15.1767 1.59812H3.80216C3.63736 1.13183 3.33242 0.727943 2.92915 0.441831C2.52588 0.15572 2.04402 0.00138997 1.54962 0H0.798773C0.586925 0 0.383754 0.0841864 0.233955 0.234039C0.0841562 0.383892 0 0.587136 0 0.79906C0 1.01098 0.0841562 1.21423 0.233955 1.36408C0.383754 1.51393 0.586925 1.59812 0.798773 1.59812H1.54962C1.73209 1.5928 1.91087 1.65017 2.05621 1.76066C2.20154 1.87115 2.30466 2.02811 2.34839 2.20541L2.39632 2.58895L3.7782 7.9906C3.14265 8.01921 2.5445 8.29921 2.11533 8.769C1.68615 9.23879 1.46111 9.85988 1.48971 10.4957C1.51831 11.1314 1.79821 11.7298 2.26783 12.1591C2.73745 12.5885 3.35832 12.8136 3.99387 12.785H4.13764C4.00627 13.147 3.96406 13.5355 4.01458 13.9173C4.06509 14.2992 4.20685 14.6632 4.42785 14.9787C4.64885 15.2941 4.94258 15.5516 5.28416 15.7294C5.62575 15.9072 6.00513 16 6.39018 16C6.77524 16 7.15462 15.9072 7.4962 15.7294C7.83779 15.5516 8.13152 15.2941 8.35251 14.9787C8.57351 14.6632 8.71527 14.2992 8.76579 13.9173C8.81631 13.5355 8.77409 13.147 8.64272 12.785H10.5278C10.3965 13.147 10.3542 13.5355 10.4048 13.9173C10.4553 14.2992 10.597 14.6632 10.818 14.9787C11.039 15.2941 11.3328 15.5516 11.6743 15.7294C12.0159 15.9072 12.3953 16 12.7804 16C13.1654 16 13.5448 15.9072 13.8864 15.7294C14.228 15.5516 14.5217 15.2941 14.7427 14.9787C14.9637 14.6632 15.1055 14.2992 15.156 13.9173C15.2065 13.5355 15.1643 13.147 15.0329 12.785H15.1767C15.3885 12.785 15.5917 12.7008 15.7415 12.5509C15.8913 12.4011 15.9755 12.1978 15.9755 11.9859C15.9755 11.774 15.8913 11.5707 15.7415 11.4209C15.5917 11.271 15.3885 11.1868 15.1767 11.1868ZM14.3779 3.19624L13.1079 7.38332C13.0641 7.56061 12.961 7.71757 12.8157 7.82806C12.6703 7.93856 12.4916 7.99592 12.3091 7.9906H5.41568L4.21752 3.19624H14.3779ZM6.39018 14.3831C6.2322 14.3831 6.07777 14.3362 5.94641 14.2484C5.81505 14.1606 5.71267 14.0358 5.65221 13.8898C5.59176 13.7438 5.57594 13.5831 5.60676 13.4281C5.63758 13.2731 5.71366 13.1308 5.82537 13.019C5.93708 12.9073 6.0794 12.8311 6.23435 12.8003C6.3893 12.7695 6.5499 12.7853 6.69586 12.8458C6.84182 12.9063 6.96657 13.0087 7.05434 13.1401C7.14211 13.2715 7.18896 13.426 7.18896 13.584C7.18896 13.7959 7.1048 13.9992 6.955 14.149C6.8052 14.2989 6.60203 14.3831 6.39018 14.3831ZM12.7804 14.3831C12.6224 14.3831 12.468 14.3362 12.3366 14.2484C12.2052 14.1606 12.1029 14.0358 12.0424 13.8898C11.9819 13.7438 11.9661 13.5831 11.9969 13.4281C12.0278 13.2731 12.1038 13.1308 12.2155 13.019C12.3273 12.9073 12.4696 12.8311 12.6245 12.8003C12.7795 12.7695 12.9401 12.7853 13.086 12.8458C13.232 12.9063 13.3568 13.0087 13.4445 13.1401C13.5323 13.2715 13.5791 13.426 13.5791 13.584C13.5791 13.7959 13.495 13.9992 13.3452 14.149C13.1954 14.2989 12.9922 14.3831 12.7804 14.3831Z"
                  fill="black" />
              </svg>
              <span class="block md:hidden font-medium">Cart</span><span class="p-ink" role="presentation"></span></a>
          </li>

          <OverlayPanel ref="toggleCartDekstop" style="width:425px" showCloseIcon > 
            <Panel header="Header">
              <div class="grid">
                <p class="col-12 text-lg font-bold">Cart</p>
                <div class="grid w-full align-items-center">
                  <img src="/public/assets/img/course/ui-ux-design.png" alt="ui ux design course" 
                     class="col-6" style="width: 200px; height: 128px;">
                  <div class="col-6">
                    <p class="text-xl font-bold">UI UX Designing</p>
                    <p class="grey font-bold">by David Burn</p>
                  </div>
                </div>
                <Divider class="p-0 m-0"/>
                <div class="flex flex-row align-items-center gap-2 pt-2">
                  <p class="text-2xl font-bold">Total: <span class="font-bold orange">
                    RM 49.99 </span><span class="line-through light-grey">
                      RM 69.99</span></p>
                  <p class="font-bold cart-coupon">50% off</p>
                </div>
              </div>
              <a href="/dashboard/cart">
                <Button size="small" label="GO TO CART" class="w-full mt-2 btn-default" style="height: 40px;"/>
              </a>
            </Panel>
          </OverlayPanel>

          <li class="border-top-1 surface-border md:border-top-none">
            <a href="/dashboard/settings"
              class="flex p-3 md:px-3 md:py-2 gap-1 align-items-center hover:surface-100 font-medium border-round cursor-pointer transition-duration-150 transition-colors p-ripple"><img
                src="/assets/img/admin-profile-image.png" class="mr-3 md:mr-0" style="width: 32px; height: 32px;">
              <div class="block">
                <div class="text-900 text-black font-medium">Tracey Tim</div>
              </div>
              <i class="pi pi-angle-right icon-angle-right"></i>
              <span class="p-ink" role="presentation" style="height: 64px; width: 64px; top: -7.5px; left: -1px;"></span>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div v-show="isMobile">
      <div class="flex flex-column">

        <div class="flex flex-row align-items-center justify-content-between mx-3">
          <i class="pi pi-align-justify cursor-pointer" @click="visible = true"></i>
          <div class="flex flex-row align-items-center">
            <img src="/assets/img/svo-academy-logo.png" alt="Logo" class="logo-image">
            <h1 class="header-title">Education</h1>
          </div>
          <a
            class="flex p-3 align-items-center hover:surface-100 border-round cursor-pointer transition-duration-150 transition-colors p-ripple"><img
              src="/assets/img/admin-profile-image.png" style="width: 32px; height: 32px;">
          </a>
        </div>
        <Sidebar v-model:visible="visible" class="w-1/2">
          <template #header>
            <div class="flex flex-row align-items-center mr-4">
              <img src="/assets/img/svo-academy-logo.png" alt="Logo" class="logo-image">
              <h1 class="header-title">Education</h1>
            </div>
          </template>
          <SidebarNavigation />
        </Sidebar>

        <div class="flex flex-row align-items-center justify-content-between svo-primary px-2">
          <p class="text-white text-md: font-semibold	ml-2 page-title" id="dynamic-title">{{ dynamicPageTitle }}</p>
          <span class="p-input-icon-left">
            <i class="pi pi-search"></i>
            <InputText v-model="search" placeholder="Search" class="border-none search svo-primary" />
          </span>
        </div>

        <div class="flex flex-row align-items-center justify-content-between mt-2 px-2">
          <div class="card flex justify-content-center">
            <div @click="toggleDropdown" class="cursor-pointer	flex flex-row align-items-center justify-content-between px-2 ml-2 filter-toggle w-9rem">
              <p class="font-semibold text-filter">Filter</p>
              <i class="text-lg pi pi-angle-down"></i>
            </div>

            <OverlayPanel ref="toggleDashboardDropdown" class="w-max">
              <Panel>
                <div class="flex flex-column md:flex-row gap-4">
                  <div v-for="category in filterData" :key="category.label" class="flex flex-column align-items-start">
                    <p class="text-xl font-bold">{{ category.label }}</p>
                    <div v-for="item in category.items" :key="item.value" class="flex flex-row gap-2">
                      <input :id="item.value" :value="item.value" type="checkbox" :name="category.label">
                      <label :for="item.value">{{ item.value }}</label>
                    </div>
                    <p class="pt-1 font-bold cursor-pointer">Show more...</p>
                  </div>
                </div>
              </Panel>
            </OverlayPanel>
          </div>
          <ul
            class="list-right list-none p-0 m-0 hidden flex align-items-center select-none surface-section border-none surface-border right-0 top-100 shadow-none ">
            <li><a href="/dashboard/calander"
                class="flex px-3 py-2 align-items-center text-600 hover:text-900 hover:surface-100 font-medium border-round cursor-pointer transition-duration-150 transition-colors p-ripple"><i
                  class="pi pi-calendar text-2xl mr-2 mr-0"></i>
              </a>
            </li>
            <li><a @click="toggleMobileNotification"
                class="flex px-3 py-2 align-items-center text-600 hover:text-900 hover:surface-100 font-medium border-round cursor-pointer transition-duration-150 transition-colors p-ripple">
                <i class="pi pi-bell text-2xl mr-2 mr-0 p-overlay-badge"></i>
              </a>
            </li>

            <OverlayPanel ref="toggleNotificationMobile" style="width: 95vw" showCloseIcon> 
              <Panel header="Header">
                <div class="grid px-5">
                  <p class="col-12 text-2xl font-bold text">Notification</p>
                  <div v-for="(item, index) in notificationData" :key="index" class="grid col-12">
                    <p class="col-12 text-xl dark-grey text">{{ item.date }}</p>
                    <div v-for="(massage, notificationIndex) in item.massage" :key="notificationIndex" class="flex flex-column align-items-start col-12 px-4 py-1 text-xl">
                      <div class="flex flex-row align-items-center gap-2">
                        <i class="pi pi-circle-fill blue text-xs"></i>
                        <p class="text">{{ massage.subject }} <span class="font-bold">{{massage.verb}}</span> {{ massage.object }}</p>
                      </div>
                      <p class="dark-grey text">{{ massage.time }}</p>
                    </div>
                  </div>
                </div>
              </Panel>
            </OverlayPanel>

            <li><a @click="toggleMobile"
                class="flex px-3 py-2 align-items-center text-600 hover:text-900 hover:surface-100 font-medium border-round cursor-pointer transition-duration-150 transition-colors p-ripple"><i
                  class="pi pi-shopping-cart text-2xl mr-2 mr-0 p-overlay-badge"></i>
              </a>
            </li>
            <OverlayPanel ref="toggleCartMobile" style="width: 95vw" showCloseIcon > 
              <Panel header="Header">
                <div class="grid">
                  <p class="col-12 text-lg font-bold">Cart</p>
                  <div class="grid w-full align-items-center justify-content-center">
                    <img src="/public/assets/img/course/ui-ux-design.png" alt="ui ux design course" 
                       class="col-12">
                    <div class="col-12 flex flex-column w-full align-items-center">
                      <p class="text-4xl font-bold">UI UX Designing</p>
                      <p class="text-2xl grey font-bold">by David Burn</p>
                    </div>
                  </div>
                  <Divider class="p-0 m-0"/>
                  <div class="flex flex-column w-full text-4xl justify-content-center align-items-center gap-1 pt-2">
                    <p class="font-bold">Total:</p>
                    <p class="font-bold orange">RM 49.99</p>
                    <p class="line-through light-grey">RM 69.99</p>
                    <div class="flex cart-coupon w-full justify-content-center ">
                      <p class="text-2xl">50% off</p>
                    </div>
                    
                  </div>
                </div>
                <a href="/dashboard/cart">
                  <Button size="small" label="GO TO CART" class="w-full mt-2 btn-default" style="height: 50px;"/>
                </a>
              </Panel>
            </OverlayPanel>
          </ul>
        </div>

      </div>
    </div>


  </div>
</template>

<script setup lang="ts">
import Dropdown from 'primevue/dropdown';
import SidebarNavigation from './SidebarNavigation.vue';
import { ref, onMounted, watchEffect } from "vue";
import { notificationDummyData } from '../views/Admin/AdminDashboard/DashboardNotification/DashboardNotificatioDummyData';

interface Massage {
    subject: string;
    time: string;
    verb: string;
    object: string;
}

interface Inotif {
    date: string;
    massage: Massage[];
}

const notificationData = ref<Inotif[]>(notificationDummyData)

interface FilterItem {
  value: string;
}

interface FilterCategory {
  label: string;
  items: FilterItem[];
}

const filterData = ref<FilterCategory[]>([
  {
    label: 'Subject',
    items: [
      { value: 'Arts' },
      { value: 'IT' },
      { value: 'Marketing' },
    ],
  },
  {
    label: 'Level',
    items: [
      { value: 'Beginner' },
      { value: 'Intermediate' },
      { value: 'Advanced' },
    ],
  },
  {
    label: 'Time',
    items: [
      { value: '1 week' },
      { value: '1 month' },
      { value: '1 year' },
    ],
  },
]);

const search = ref();
onMounted(() => {

});

const isMobile = ref(window.matchMedia('(max-width: 768px)').matches);
const visible = ref()

const dynamicPageTitle = ref();

watchEffect(() => {
  const handleResize = () => {
    isMobile.value = window.matchMedia('(max-width: 768px)').matches;
  };

  const routeUrl = window.location.href;
  // TODO: update pageTitle 
  const pageTitle = routeUrl.split('/').pop() || '';
  dynamicPageTitle.value = pageTitle;

  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
  };
});

const toggleCartMobile = ref();
const toggleCartDekstop = ref();
const toggleNotificationDekstop = ref();
const toggleNotificationMobile = ref();
const toggleDashboardDropdown = ref();

const toggleDekstopNotification = (event: any) => {
  toggleNotificationDekstop.value.toggle(event);
}

const toggleMobileNotification = (event: any) => {
  toggleNotificationMobile.value.toggle(event);
}

const toggleDekstop = (event: any) => {
  toggleCartDekstop.value.toggle(event);
}
const toggleMobile = (event: any) => {
  toggleCartMobile.value.toggle(event);
}
const toggleDropdown = (event: any) => {
  toggleDashboardDropdown.value.toggle(event);
}
</script>

<style scoped lang="scss">
.header-left {
  display: flex;
  align-items: center;
}

.text {
  font-family: Inter;
  font-style: normal;
  line-height: 160%
}

.filter-dropdown {
  position: relative;
  margin-left: 0.25rem;
}

::v-deep(.filter-toggle) {
  background: #006785;
  border-radius: 6px;
  color: white;
  height: 32px;

  .p-dropdown-label {
    color: white !important;
    padding: 5px 10px 5px 10px;
    font-family: Inter;
    font-size: 16px;
    font-weight: 600;
    line-height: 19px;
    letter-spacing: 0em;
    text-align: left;
  }

  .p-dropdown-items {
    display: flex;
    flex-direction: row;
  }

  .p-dropdown-trigger svg path {
    fill: white;
  }

  i {
    margin: 0 0.5rem;
  }
}


.filter-text {
  margin-left: 0.2rem;
}

.filter-options {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #f4f4f4;
  padding: 0.5rem;
  display: none;
}

.filter-options.open {
  display: block;
}

.filter-options ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.filter-options li {
  padding: 0.5rem;
}

.header-right {
  display: flex;
  align-items: center;
  margin-right: 15px;
}

.header-search,
.header-icon {
  margin-right: 1.5rem;
  font-size: 1rem;
  display: flex;
  align-items: center;
}

.header-search i {
  margin-right: 0.5rem;
}

.header-profile {
  display: flex;
  align-items: center;
}

.search {
  border: none;
  width: 110px;
  outline: none;
  transition: width 300ms ease-in-out;
  color: white;
  color: #6D7382;
  font-family: Inter;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%;
  /* 20.8px */

  @media screen and (max-width: 768px) {
    margin: 10px 0;
  }
}

.search:focus {
  width: 400px;
  outline: none;

  @media screen and (max-width: 768px) {
    width: 200px;
  }
}

.profile-image {
  width: 25px;
  height: 25px;
  margin-right: 0.5rem;
}

.profile-name {
  font-weight: bold;
  margin-right: 0.25rem;
}

.pi.pi-chevron-right {
  font-size: 0.75rem;
  margin-left: 0.25rem;
}

.pi.pi-chevron-down {
  font-size: 0.75rem;
}

.list-right {
  height: 32px;
}

.v-border {
  height: 32px;
  width: 1px;
  border-left: 1px solid #2C52A51A;
}

.svo-primary {
  background-color: #006785;
}

.blue {
  color: #00C0DD;
}

.grey {
  color: #9F9F9F;
}

.light-grey {
  color: #D9D9D9;
}

.dark-grey {
  color: #6D7382;
}

.orange {
  color: #E26954;
}

.icon-angle-right {
  &::before {
    color: black;
  }
}

.cart-coupon {
  background: #E26954;
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
}

::v-deep(.p-button-label) {
  font-weight: 500;
}

::v-deep(.p-overlaypanel) {
  .p-overlaypanel-close {
    top: 1rem;
    right: 1rem;
    background: white;
    color: black;
  } 
}

.text-filter{
  color: var(--backgrounds-primary, #FFF);
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-transform: uppercase;
}
</style>
