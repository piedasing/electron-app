<script setup>
import { reactive, computed } from 'vue';
import { MoreFilled } from '@element-plus/icons-vue';
import dayjs from 'dayjs';

const formData = reactive({
    dateTimeRange: ['2024-12-01 12:25', '2024-12-03 10:20'],
});

const shortcuts = [
    {
        text: 'Today',
        value: new Date(),
    },
    {
        text: 'Yesterday',
        value: () => {
            const date = new Date();
            date.setDate(date.getDate() - 1);
            return date;
        },
    },
    {
        text: 'A week ago',
        value: () => {
            const date = new Date();
            date.setDate(date.getDate() - 7);
            return date;
        },
    },
];

const activities = computed(() => {
    const [dateTimeS, dateTimeE] = formData.dateTimeRange;
    // 結果陣列
    const result = [];
    let totalCost = 0;
    let dailyCost = 0;
    let currentDay = '';

    // 起始和結束時間
    const start = dayjs(dateTimeS);
    const end = dayjs(dateTimeE);

    // 分段按日計算費用
    for (let currentStart = start; currentStart.isBefore(end); ) {
        const endOfDay = currentStart.endOf('day');
        const nextInterval = end.isBefore(endOfDay) ? end : endOfDay;

        const durationMinutes = nextInterval.diff(currentStart, 'minute');
        const hours = Math.floor(durationMinutes / 60);
        const remainingMinutes = durationMinutes % 60;

        let dailyCost = hours * 20;
        if (remainingMinutes > 0) {
            dailyCost += remainingMinutes <= 30 ? 10 : 20;
        }

        // 每日上限200元
        dailyCost = Math.min(dailyCost, 200);
        totalCost += dailyCost;

        result.push({
            type: 'primary',
            size: 'large',
            timestamp: currentStart.format('YYYY-MM-DD'),
            date_s: currentStart.format('YYYY-MM-DD HH:mm:ss'),
            date_e: nextInterval.add(1, 'second').format('YYYY-MM-DD HH:mm:ss'),
            cost: dailyCost,
            hours: hours + (remainingMinutes > 30 ? 1 : 0.5),
        });

        currentStart = nextInterval.add(1, 'second');
    }

    console.log(result);

    return result;
});

// const activities = [
//     {
//         content: 'Custom icon',
//         timestamp: '2018-04-12 20:46',
//         size: 'large',
//         type: 'primary',
//     },
//     {
//         content: 'Custom color',
//         timestamp: '2018-04-03 20:46',
//         color: '#0bbd87',
//     },
//     {
//         content: 'Custom size',
//         timestamp: '2018-04-03 20:46',
//         size: 'large',
//     },
//     {
//         content: 'Custom hollow',
//         timestamp: '2018-04-03 20:46',
//         type: 'primary',
//         hollow: true,
//     },
//     {
//         content: 'Default node',
//         timestamp: '2018-04-03 20:46',
//     },
// ];
</script>

<template>
    <div class="tw-max-w-[600px]">
        <el-date-picker
            class="tw-mb-8"
            style="width: 100%"
            v-model="formData.dateTimeRange"
            type="datetimerange"
            :start-placeholder="'起始日期'"
            :end-placeholder="'結束日期'"
            :format="'YYYY-MM-DD HH:mm'"
            :value-format="'YYYY-MM-DD HH:mm'"
            unlink-panels />

        <el-timeline>
            <el-timeline-item
                v-for="(activity, index) in activities"
                :key="index"
                :placement="'top'"
                :icon="activity.icon"
                :type="activity.type"
                :color="activity.color"
                :size="activity.size"
                :hollow="activity.hollow"
                :timestamp="activity.timestamp">
                <el-card>
                    <div class="tw-py-6">
                        <h4 class="">
                            {{ activity.date_s }} ~ {{ activity.date_e }}<br />
                            一共 {{ activity.hours }} 小時<br />
                            費用 {{ activity.cost }} 元
                        </h4>
                    </div>
                </el-card>
            </el-timeline-item>
        </el-timeline>
    </div>
</template>

<style lang="scss" scoped></style>
