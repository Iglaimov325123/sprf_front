export default function ({ app }) {
    /*
    ** Include Yandex.Metrika counter
    */
   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
   /*
    ** Set the current page
    */
    ym(25037612, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true
    });
    /*
    ** Every time the route changes (fired on initialization too)
    */
    app.router.afterEach = (to, from) => {
      /*
      ** We tell Google Analytics to add a `pageview`
      */
      ym('set', 'page', to.fullPath)
      ym('send', 'pageview')
    }
}