<template lang="pug">
    div.popup-wrapper
        img(src='./../assets/img/logo.svg', alt='SteemContext', height='30')
        button.btn.btn-primary(type="primary" @click="tab") Settings
</template>
<script>
  // webextension polfill.
  if (typeof window.browser === 'undefined') {
    window.browser = window.chrome
  }

  const __ = chrome.i18n.getMessage

  export default {
    data: () => ({
    }),
    computed: { },
    created () {
      console.log(__('popup'))
    },
    mounted () { },
    methods: {
      tab () {
        // chrome.tabs.create({ url: 'pages/app.html' })
        window.browser.runtime.openOptionsPage()
      }
    }
  }
</script>
<style lang="scss">
    @import "~bootstrap/scss/functions";
    @import "~bootstrap/scss/variables";
    @import "~bootstrap/scss/mixins";

    $primary: #5b51a2;
    $font-family-base: 'Roboto', $font-family-base;
    $font-family-sans-serif: 'Roboto', $font-family-base;
    $theme-colors: map-merge((
            "primary": $primary,
    ), $colors);
    @import "~bootstrap/scss/bootstrap";


    div.popup-wrapper {
        padding: 100px;

        img {
            margin-bottom: 20px;
        }
    }
    .navbar {
        box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.1);
    }

    .form-options {
        h1 {
            font-size: 18px;
        }
    }
    .fields {
        //column-count: 3;
        //column-gap: 10px;

        .form-check {
            display: block;

        }
        .form-check {
            padding-top: 8px;
        }
        // column-rule: 1px solid black;
        //.control + .control {
        //  margin-top: 10px;
        //}
        a.app-link {
            display: block;
            font-size: 0.8em;
        }
        span.app-name {
            padding-left: 5px;
            min-width: 80px;
            // width: 50px;
            display: inline-block;
        }
    }
</style>
