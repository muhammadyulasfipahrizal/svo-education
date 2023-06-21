<template>
    <div class="header">
        <div class="header-left">
            <div class="filter-dropdown">
              <button class="filter-toggle" @click="toggleFilter">
                <span class="filter-text">Filter</span>
                <i class="pi pi-chevron-down smaller-chevron"></i>
              </button>
              <div class="filter-options" :class="{ open: showFilterOptions }">
                <ul>
                  <li>option</li>
                  <li>option</li>
                  <li>option</li>
                </ul>
              </div>
            </div>
          </div>
      <div class="header-right">
        <div class="header-search">
          <i class="pi pi-search"></i>
          <span class="search-text">search...</span>
        </div>
        <div class="header-icon">
          <i class="pi pi-calendar"></i>
        </div>
        <div class="header-icon">
          <i class="pi pi-bell"></i>
        </div>
        <div class="header-icon">
          <i class="pi pi-shopping-cart"></i>
        </div>
        <div class="header-profile">
          <img src="profile-image.jpg" alt="Profile" class="profile-image">
          <span class="profile-name">Tracey Tam</span>
          <i class="pi pi-chevron-right"></i>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        showFilterOptions: false
      };
    },
    methods: {
      toggleFilter() {
        this.showFilterOptions = !this.showFilterOptions;
      }
    }
  };
  </script>
  
  <style scoped>
  .header {
    position: fixed;
    top: 0;
    left: 20%;
    width: 80%;
    height: 10%;
    padding: 0.5rem 1rem;
    background-color: #fff;
    z-index: 9999;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .header-left {
    display: flex;
    align-items: center;
  }
  
  .filter-dropdown {
    position: relative;
    margin-left: 0.25rem;
  }
  
  .filter-toggle {
    border: none;
    border-radius: 5px;
    background-color: #006785;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 0.5rem;
  }
  
  .filter-toggle i {
    margin: 0 0.5rem;
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
  }
  
  .header-profile {
    display: flex;
    align-items: center;
  }

  .header-search {
    margin-right: 0.5rem;
  }
  
  .search-text {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
  
  .profile-image {
    width: 30px;
    height: 30px;
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
  
  </style>
  