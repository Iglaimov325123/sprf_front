export var propsAndData = {
    props: {
        configs: {
            type: Object,
            default: function() {  }
        },
        sundayStart: {
            type: Boolean,
            default: function() { return undefined }
        },
        placeholder: {
            type: [String, Boolean],
            default: function() { return undefined }
        },
        dateFormat: {
            type: String
        },
        isMultiple: {
            type: Boolean,
            default: function() { return undefined }
        },
        isSeparately: {
            type: Boolean,
            default: function() { return undefined }
        },
        isDatePicker: {
            type: Boolean,
            default: function() { return undefined }
        },
        isMultipleDatePicker: {
            type: Boolean,
            default: function() { return undefined }
        },
        isDateRange: {
            type: Boolean,
            default: function() { return undefined }
        },
        withTimePicker: {
            type: Boolean,
            default: function() { return undefined }
        },
        calendarsCount: {
            type: Number
        },
        isModal: {
            type: Boolean,
            default: function() { return undefined }
        },
        isTypeable: {
            type: Boolean,
            default: function() { return undefined }
        },
        changeMonthFunction: {
            type: Boolean,
            default: function() { return undefined }
        },
        changeYearFunction: {
            type: Boolean,
            default: function() { return undefined }
        },
        changeYearStep: {
            type: Number,
            default: function() { return 12 }
        },
        applyStylesheet: {
            type: Boolean,
            default: function() { return undefined }
        },
        newCurrentDate: {
            type: Date
        },
        markedDates: {
            type: Array,
            default: function() { return [] }
        },
        markedDateRange: {
            type: Object
        },
        disabledDayNames: {
            type: Array
        },
        disabledDates: {
            type: Array
        },
        limits: {
            type: [Object, Boolean],
            default: function() { return undefined }
        },
        minSelDays: {
            type: [Number, Boolean],
            default: function() { return undefined }
        },
        maxSelDays: {
            type: [Number, Boolean],
            default: function() { return undefined }
        },
        dayNames: {
            type: Array,
        },
        monthNames: {
            type: Array
        },
        shortMonthNames: {
            type: Array
        },
        showWeekNumbers: {
            type: Boolean,
            default: function() { return undefined }
        },
        value: {
            type: Object
        },
        transition: {
            type: Boolean,
            default: function() { return undefined }
        },
        hiddenElements: {
            type: Array
        },
        isAutoCloseable: {
            type: Boolean,
            default: undefined,
        },
        isDark: {
            type: Boolean,
            default: undefined
        }
    },
    data: function() {
        return {
            defaultDateFormat: {
                date: false,
                dateTime: false,
                hour: '00',
                minute: '00',
            },
            calendar: {
                currentDate: new Date(),
                selectedDate: false,
                selectedDateTime: false,
                selectedHour: '00',
                selectedMinute: '00',
                selectedDates: [],
                dateRange: {
                    start: {
                        date: false,
                        dateTime: false,
                        hour: '00',
                        minute: '00',
                    },
                    end: {
                        date: false,
                        dateTime: false,
                        hour: '00',
                        minute: '00',
                    }
                }
            },
            input: {
                selectedDate: '',
                dateRange: {
                    start: {
                        date: '',
                        dateTime: '',
                        hour: '',
                        minute: ''
                    },
                    end: {
                        date: '',
                        dateTime: '',
                        hour: '',
                        minute: ''
                    }
                }
            },
            calendarsKey: 0,
            transitionPrefix: 'left',
            showCalendar: true,
            showMonthPicker: false,
            showYearPicker: false,
            showTimePicker: false,
            allowPreDate: true,
            allowNextDate: true,
            listCalendars: [],
            fConfigs: {
                sundayStart: false,
                placeholder: false,
                dateFormat: 'dd/mm/yyyy',

                isDatePicker: false,
                isMultipleDatePicker: false,
                isDateRange: false,
                withTimePicker: false,
                isMultiple: false,
                calendarsCount: 1,
                isSeparately: false,

                isModal: false,
                isTypeable: false,

                changeMonthFunction: false,
                changeYearFunction: false,
                changeYearStep: 12,

                applyStylesheet: true,

                markedDates: [],
                markedDateRange: {
                    start: false,
                    end: false
                },

                limits: false,
                minSelDays: false,
                maxSelDays: false,

                disabledDates: [],
                disabledDayNames: [],

                dayNames: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
                monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                shortMonthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],

                showWeekNumbers: false,
                transition: true,
                hiddenElements: [],
                isAutoCloseable: false,
                isDark: false
            }
        }
    }
};
