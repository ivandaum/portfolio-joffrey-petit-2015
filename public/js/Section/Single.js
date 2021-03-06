app.single = {
    init:function() {

            var img = document.getElementsByTagName('img');
            var singleContentWidth = 0;
            for(var i=0;i<img.length;i++) {
                singleContentWidth += img[i].offsetWidth + 100;
            }

            if(document.getElementById('next-post')) {
                singleContentWidth += document.getElementById('next-post').offsetWidth;
            }
            
            singleContentWidth += 100;

            document.getElementById('single-content').style.width = singleContentWidth + 'px';


            var offset = window.innerHeight / 2;
            var duration = singleContentWidth;

            var offsetLeft = singleContentWidth - window.innerWidth;
            var animation = TweenMax.fromTo('#single-content',duration,
                {left:document.getElementById('single-content').offsetTop + 'px',ease:Linear.ease},
                {left:'-' + offsetLeft + 'px',ease:Linear.ease});

            app.single.scene('single',animation,duration - offset,offset,'#single-content')

            TweenMax.staggerFromTo('img',0.2,{opacity:0},{opacity:1},0.2);

    },
    scene: function(triggerElement,tween,duration,offset,pin) {
        offset = offset || 0;

        var controller = new ScrollMagic.Controller();
        var scene = new ScrollMagic.Scene({
            triggerElement: '#' + triggerElement,
            duration: duration,
            offset:offset
        })
            .setTween(tween)
            .setPin(pin)
            .addTo(controller)

        app.scrollmagic.controllers.push(controller);
        app.scrollmagic.scenes.push(scene);
    },
}