export default {
    configs: {
        sundayStart: false,
        leftAndRightDays: true,
        dateFormat: 'dd/mm/yyyy',
        dayNames: [],
        monthNames: []
    },
    formatDate: function(date) {
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();

        var formattedDate = this.configs.dateFormat.replace("dd", day.toString());
        formattedDate = formattedDate.replace("mm", month.toString());
        formattedDate = formattedDate.replace("yyyy", year.toString());

        return formattedDate;
    },
    getDateFromFormat: function(date) {
        var format = this.configs.dateFormat;

        if (format.indexOf('/') !== -1) {
            format = format.split('/');
            date = date.split('/');
        } else if (format.indexOf('-') !== -1) {
            format = format.split('-');
            date = date.split('-');
        } else if (format.indexOf('.') !== -1) {
            format = format.split('.');
            date = date.split('.');
        } else {
            alert('Your date format not valid. Please read documentation.!');
        }

        var year = format.indexOf('yyyy');
        var month = format.indexOf('mm');
        var day = format.indexOf('dd');

        return new Date(date[year], date[month] - 1, date[day]);
    },
    checkValidDate: function(val){
        val = this.getDateFromFormat(val);

        if(val != "Invalid Date"){
            return true;
        }

        return false;
    },
    getWeeksInMonth: function(month, year) {
        var weeks = [],
            firstDate = new Date(year, month, 1),
            lastDate = new Date(year, month + 1, 0),
            numDays = lastDate.getDate();

        var start = 1;


        var end = !this.configs.sundayStart ?
            (firstDate.getDay() === 0 ? 1 : 7 - firstDate.getDay() + 1)
            : 7 - firstDate.getDay();

        while (start <= numDays) {
            weeks.push({year: year, start: start, end: end, days: []});
            start = end + 1;
            end = end + 7;
            if (end > numDays)
                end = numDays;
        }
        return {weeks: weeks, month: lastDate.getMonth(), year: lastDate.getFullYear()};
    },
    getLeftMonthDays: function(month, year) {
        var weeks = this.getWeeksInMonth(month, year);
        var firstWeek = weeks.weeks[0];
        var weekDaysCount = firstWeek.end - firstWeek.start + 1;

        var days = [];
        var finalYear = 0;
        var finalMonth = 0;

        if (weekDaysCount !== 7) {
            var weeksLeftMonth = this.getWeeksInMonth(month - 1, year);

            var leftMonthLastWeek = weeksLeftMonth.weeks[weeksLeftMonth.weeks.length - 1];

            for (var i = leftMonthLastWeek.start; i <= leftMonthLastWeek.end; i++) {
                days.push(i);
            }

            finalMonth = weeksLeftMonth.month;
            finalYear = weeksLeftMonth.year;
        }

        return {days: days.reverse(), month: finalMonth, year: finalYear};
    },
    getRightMonthDays: function(month, year) {
        var weeks = this.getWeeksInMonth(month, year);
        var lastWeek = weeks.weeks[weeks.weeks.length - 1];

        var weekDaysCount = lastWeek.end - lastWeek.start + 1;

        var days = [];
        var finalYear = 0;
        var finalMonth = 0;

        if (weekDaysCount !== 7) {
            var weeksRightMonth = this.getWeeksInMonth(month + 1, year);
            var rightMonthFirstWeek = weeksRightMonth.weeks[0];

            for (var i = rightMonthFirstWeek.start; i <= rightMonthFirstWeek.end; i++) {
                days.push(i);
            }

            finalMonth = weeksRightMonth.month;
            finalYear = weeksRightMonth.year;
        }


        return {days: days, month: finalMonth, year: finalYear};
    },
    getFinalizedWeeks: function(month, year) {
        var thisObj = this;
        var monthWeeks = this.getWeeksInMonth(month, year);
        var leftMonthDays = this.getLeftMonthDays(month, year);
        var rightMonthDays = this.getRightMonthDays(month, year);

        // Push Current Month Week days
        monthWeeks.weeks.forEach(function (week) {
            for (var i = week.start; i <= week.end; i++) {
                week.days.push({
                    day: i,
                    month: monthWeeks.month,
                    year: monthWeeks.year,
                    hide: false,
                    hideLeftAndRightDays: false
                });
            }
        });


        // Left month days
        if (leftMonthDays.days.length) {
            leftMonthDays.days.forEach(function (day) {
                var hideLeftAndRightDays = false;

                if (!thisObj.configs.leftAndRightDays) {
                    day = '';
                    hideLeftAndRightDays = true;
                }

                monthWeeks.weeks[0].days.unshift({
                    day: day,
                    month: leftMonthDays.month,
                    year: leftMonthDays.year,
                    hide: true,
                    hideLeftAndRightDays: hideLeftAndRightDays
                });
            })
        }

        // Right month days
        if (rightMonthDays.days.length) {
            rightMonthDays.days.forEach(function (day) {
                var hideLeftAndRightDays = false;

                if (!thisObj.configs.leftAndRightDays) {
                    day = '';
                    hideLeftAndRightDays = true;
                }

                monthWeeks.weeks[monthWeeks.weeks.length - 1].days.push({
                    day: day,
                    month: rightMonthDays.month,
                    year: rightMonthDays.year,
                    hide: true,
                    hideLeftAndRightDays: hideLeftAndRightDays
                });
            })
        }

        // Remove Week Year
        monthWeeks.weeks.forEach(function (week) {
            delete week.year;
        });

        return monthWeeks.weeks;
    },
    mask: function(value) {
        var dayLength = this.getDateFromFormat(value).getDate().toString().length;
        var month = this.getDateFromFormat(value).getMonth();

        var dayMask = '00';
        if(dayLength===1){
            dayMask = '0';
        }

        var monthMask = '00';
        if(month+1 <= 9){
            monthMask = '0';
        }

        var mask = this.configs.dateFormat.replace('dd', dayMask).replace('mm', monthMask).replace('yyyy', '0000');
        // eslint-disable-next-line
        var literalPattern = /[0\*]/;
        var numberPattern = /[0-9]/;
        var newValue = "";

        for (var vId = 0, mId = 0; mId < mask.length;) {
            if (mId >= value.length)
                break;

            // Number expected but got a different value, store only the valid portion
            if (mask[mId] === '0' && value[vId].match(numberPattern) == null) {
                break;
            }

            // Found a literal
            while (mask[mId].match(literalPattern) == null) {
                if (value[vId] === mask[mId])
                    break;
                newValue += mask[mId++];
            }

            newValue += value[vId++];

            mId++;
        }

        return newValue;
    }
};