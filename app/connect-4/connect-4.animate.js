angular
    .module('connect4')
    .animation('.disc-player', function phoneAnimationFactory() {
      return {
        addClass: animateIn
      };

      function animateIn(element, className, done) {
        if (className !== 'disc-player') return;

        element.
        css({
          position: 'relative',
          top: -300,
          opacity: 0
        }).
        animate({
          top: 0,
          opacity: 1
        }, 1000, done);

        return function animateInEnd(wasCanceled) {
          if (wasCanceled) element.stop();
        };
      }

    });
