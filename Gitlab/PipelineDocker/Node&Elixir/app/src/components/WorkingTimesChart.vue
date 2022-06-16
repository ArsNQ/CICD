<template lang="html">
    <div class="column">
        <h1>Working times chart</h1>
        <apexchart type="bar" height="350" :options="options" :series="series"></apexchart>
    </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';
import moment from 'moment';


export default {
    name: 'WorkingTimesChart',
    components: {
        'apexchart': VueApexCharts
    },
    props: ["workingtimes"],
    data() {
        return({
            series: [{
                name: 'working times',
                data: []
            }]
        });
    },
    computed: {
        options: function() {
            let workingtimes = this.workingtimes || this.$store.getters["user/workingtimes"];
            if (workingtimes.length > 0) {
                return this.updateChart(workingtimes);
            } else {
                return {};
            }
        }
    },
    methods: {
        getDuration(start, end) {
            var format = "YYYY-MM-DD HH:mm:ss";
            var seconds = end.diff(start, 'seconds');
            return seconds;
        },
        getDateRange(startDate, endDate, type) {
            var startDate = startDate.clone().startOf('day');
            var endDate = endDate.clone().endOf('day');
            let diff = endDate.diff(startDate, type);
            let range = [];
            for (let i = 0; i <= diff; i++) {
                range.push(startDate.clone().add(i, type).format("YYYY-MM-DD"));
            }
            return range;
        },
        getCategories(workingTimes) {
            var times = [];
            var lowestDate = null;
            var highestDate = null;

            workingTimes.forEach(element => {
                var format = "YYYY-MM-DD HH:mm:ss";
                var startDay = moment(element.start, format);
                var endDay = moment(element.end, format);

                if (startDay < lowestDate || !lowestDate) {
                    lowestDate = startDay;
                }
                if (endDay < lowestDate || !lowestDate) {
                    lowestDate = endDay;
                }

                if (startDay > highestDate || !highestDate) {
                    highestDate = startDay;
                }
                if (endDay > highestDate || !highestDate) {
                    highestDate = endDay;
                }
            });

            times = this.getDateRange(lowestDate, highestDate, 'days');
            return times;
        },
        toHHSS(secs) {
            var sec_num = parseInt(secs, 10)
            var hours   = Math.floor(sec_num / 3600)
            var minutes = Math.floor(sec_num / 60) % 60
            var seconds = sec_num % 60

            return [hours,minutes,seconds]
                .map(v => v < 10 ? "0" + v : v)
                .filter((v,i) => v !== "00" || i > 0)
                .join(":")
        },
        getSeries(workingtimes) {
            var series = [];
            var format = "YYYY-MM-DD HH:mm:ss";
            var totalEnd = 0;

            workingtimes.forEach(element => {
                var startDay = moment(element.start, format);
                var endDay = moment(element.end, format);


                if (startDay.year() === endDay.year() && startDay.month() === endDay.month() && startDay.day() === endDay.day()) {
                    var diff = this.getDuration(startDay, endDay);
                    if (series.find(elem => elem.x === startDay.format('YYYY-MM-DD'))) {
                        series.find(elem => elem.x === startDay.format('YYYY-MM-DD')).y += diff;
                    } else {
                        series.push({
                            x: startDay.format('YYYY-MM-DD'),
                            y: diff
                        });
                    }
                } else {
                    var range = this.getDateRange(startDay, endDay, 'days');

                    var startEnd = startDay.clone().endOf('day');
                    var startDiff = this.getDuration(startDay, startEnd);
                    var endStart = endDay.clone().startOf('day');

                    var endDiff = this.getDuration(endStart, endDay);
                    if (endDay.format('YYYY-MM-DD') === '2020-10-31') {
                        totalEnd += endDiff;
                    }

                    if (series.find(elem => elem.x === startDay.format('YYYY-MM-DD'))) {
                        series.find(elem => elem.x === startDay.format('YYYY-MM-DD')).y += startDiff;
                    } else {
                        series.push({
                            x: startDay.format('YYYY-MM-DD'),
                            y: startDiff
                        });
                    }

                    if (series.find(elem => elem.x === endDay.format('YYYY-MM-DD'))) {
                        series.find(elem => elem.x === endDay.format('YYYY-MM-DD')).y += endDiff;
                    } else {
                        series.push({
                            x: endDay.format('YYYY-MM-DD'),
                            y: endDiff
                        });
                    }

                    range.forEach(element => {
                        if (element !== startDay.format('YYYY-MM-DD') && element !== endDay.format('YYYY-MM-DD')) {
                            if (series.find(elem => elem.x === element)) {
                                series.find(elem => elem.x === element).y += 24 * 60 * 60; // 24hours
                            } else {
                                series.push({
                                    x: element,
                                    y: 24 * 60 * 60 // 24hours
                                });
                            }
                        }
                    });
                }
            });

            series.sort((a, b) => {
                var start = moment(a.x, 'YYYY-MM-DD HH:mm:ss');
                var end = moment(b.x, 'YYYY-MM-DD HH:mm:ss');
                if (start > end) {
                    return 1;
                }
                return -1;
            });

            this.series = [{
                name: 'working times',
                data: series
            }];
        },
        updateChart(workingTimes) {
            var categories = this.getCategories(workingTimes);
            var series = this.getSeries(workingTimes);

            return {
                chart: {
                    id: 'vuechart-example'
                },
                xaxis: {
                    categories: categories
                },
                yaxis: {
                    labels: {
                        show: true,
                        formatter: (secs) => {
                            return this.toHHSS(secs);
                        }
                    }
                },
                dataLabels: {
                    enabled: true,
                    enabledOnSeries: undefined,
                    formatter: (secs, opts) => {
                        return this.toHHSS(secs);
                    }
                }
            };
        }
    },

};
</script>
