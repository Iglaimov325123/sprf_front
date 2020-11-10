// Import vue component
import FunctionalCalendar from './src/components/FunctionalCalendar';

// Creating a module value for Vue.use ()
var FunctionalCalendarPlugin = {
    install: function(Vue, options) {
        if(!options) {
            options = [];
        }
        Vue.prototype.$getOptions = function () {
            return options;
        };

        Vue.component('FunctionalCalendar', FunctionalCalendar);
    },
    FunctionalCalendar: FunctionalCalendar
}

// // Export component for use as a module (npm / webpack / etc.)
export default FunctionalCalendarPlugin;
export {FunctionalCalendar};