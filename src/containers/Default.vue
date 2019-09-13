<template>
    <div id="app" class="container">
        <header-template/>
        <div class="main-and-sidebar-wrapper">
            <section class="main">
                <router-view></router-view>
            </section>
            <sidebar-template/>
        </div>
        <footer-template/>
    </div>
</template>

<script>
  import FooterTemplate from '../components/Footer'
  import HeaderTemplate from '../components/Header'
  import SidebarTemplate from '../components/Sidebar'

  export default {
    components: { FooterTemplate, HeaderTemplate, SidebarTemplate }
  }
</script>
