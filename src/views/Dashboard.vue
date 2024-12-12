<script setup>
import { ref, reactive, computed, nextTick } from 'vue';
import dayjs from 'dayjs';

const formData = reactive({
    dateTimeRange: ['', ''],
    // dateTimeRange: ['2024-12-01 20:00', '2024-12-20 06:00'],
});

const isLoading = ref(false);
const activities = ref([]);

const totalPrice = computed(() => {
    return activities.value.reduce((total, activity) => {
        if (!activity.price) {
            return total;
        }
        return total + activity.price;
    }, 0);
});

const calculateCost = (start, end) => {
    const durationMinutes = dayjs(end).diff(dayjs(start), 'minute');
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;

    let dailyCost = hours * 20;
    if (minutes > 0) {
        dailyCost += minutes <= 30 ? 10 : 20;
    }

    return {
        hours,
        minutes,
        price: Math.min(dailyCost, 200), // 每日上限200元
    };
};

const toCurrency = (num) => {
    const n = Number(num);
    return `${n.toFixed(0).replace(/./g, (c, i, a) => {
        const currency =
            i && c !== '.' && (a.length - i) % 3 === 0
                ? `, ${c}`.replace(/\s/g, '')
                : c;
        return currency;
    })}`;
};

const sleep = (delay = 1000) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
};

const onQuery = async () => {
    isLoading.value = true;
    activities.value = [];

    const [dateTimeS, dateTimeE] = formData.dateTimeRange;

    if (!dateTimeS || !dateTimeE) {
        isLoading.value = false;
        return;
    }

    const dateS = dayjs(dateTimeS).format('YYYY-MM-DD');
    const dateE = dayjs(dateTimeE).format('YYYY-MM-DD');
    const days = dayjs(dateE).diff(dayjs(dateS), 'day');

    for (let i = 0; i <= days; i++) {
        const startDate = i === 0
            ? dayjs(dateTimeS).add(i, 'day').format('YYYY-MM-DD HH:mm')
            : dayjs(dateTimeS).add(i, 'day').format('YYYY-MM-DD 00:00'); // prettier-ignore
        const nextMidNight = dayjs(startDate).add(1, 'day').format('YYYY-MM-DD 00:00'); // prettier-ignore
        const endDate = dayjs(nextMidNight).isAfter(dateTimeE)
            ? dayjs(dateTimeE).format('YYYY-MM-DD HH:mm')
            : dayjs(nextMidNight).format('YYYY-MM-DD HH:mm'); // prettier-ignore

        const { hours, minutes, price } = calculateCost(startDate, endDate);
        if (hours === 0 && minutes === 0) {
            continue;
        }

        let priceCalcProcess = `${hours} * 20 = ${hours * 20} 元`;
        if (minutes > 0) {
            if (minutes <= 30) {
                priceCalcProcess = `${hours} * 20 + 1 * 10 (未滿半小時，以半小時計) = ${hours * 20 + 1 * 10} 元`;
            } else {
                priceCalcProcess = `${hours} * 20 + 1 * 20 (超過半小時，且未滿1小時，以1小時計) = ${hours * 20 + 1 * 20} 元`;
            }
        }

        await sleep(600);
        activities.value.push({
            type: 'primary',
            size: 'large',
            timestamp: dayjs(startDate).format('YYYY-MM-DD HH:mm'),
            dateRange: `${startDate} ～ ${endDate}`,
            price,
            hours,
            minutes,
            priceCalcProcess,
        });
        await nextTick();
        scrollToBottom();
    }

    await sleep(600);
    activities.value.push({
        type: 'primary',
        size: 'large',
        timestamp: dayjs(dateTimeE).format('YYYY-MM-DD HH:mm'),
    });
    await nextTick();
    scrollToBottom();

    isLoading.value = false;
};

const scrollToBottom = () => {
    document.querySelector('.el-main').scrollTo({
        top: document.querySelector('.el-main').scrollHeight,
        behavior: 'smooth',
    });
};
</script>

<template>
    <div class="tw-max-w-[600px] tw-pb-20">
        <div class="tw-mb-4 tw-flex tw-gap-x-4">
            <el-date-picker
                v-model="formData.dateTimeRange"
                type="datetimerange"
                :start-placeholder="'起始日期'"
                :end-placeholder="'結束日期'"
                :format="'YYYY-MM-DD HH:mm'"
                :value-format="'YYYY-MM-DD HH:mm:00'"
                unlink-panels />
            <el-button type="primary" @click="onQuery">查詢</el-button>
        </div>
        <template v-if="activities.length <= 0 && !isLoading">
            <div class="tw-bg-gray-200 tw-py-20 tw-text-center">
                <el-text type="danger" class="!tw-text-lg">
                    請先選擇起迄時間
                </el-text>
            </div>
        </template>
        <template v-else-if="activities.length > 0">
            <div class="tw-border tw-border-gray-200 tw-py-6">
                <div class="tw-px-6">
                    <el-timeline>
                        <transition-group name="fade">
                            <template
                                v-for="(activity, index) in activities"
                                :key="index">
                                <el-timeline-item
                                    :placement="'top'"
                                    :icon="activity.icon"
                                    :type="activity.type"
                                    :color="activity.color"
                                    :size="activity.size"
                                    :hollow="activity.hollow"
                                    :timestamp="activity.timestamp">
                                    <el-card v-if="activity.dateRange">
                                        <div
                                            class="tw-flex tw-flex-col tw-gap-y-2">
                                            <p class="">
                                                {{ activity.dateRange }}
                                            </p>
                                            <p class="">
                                                共
                                                <el-tag type="primary">
                                                    {{ activity.hours }}
                                                </el-tag>
                                                小時
                                                <el-tag type="primary">
                                                    {{ activity.minutes }}
                                                </el-tag>
                                                分
                                            </p>
                                            <p class="">
                                                金額為:<br />
                                                <span
                                                    class="tw-block tw-pl-4"
                                                    v-html="
                                                        activity.priceCalcProcess
                                                    "></span>
                                            </p>
                                            <p
                                                class="tw-absolute tw-right-0 tw-top-0">
                                                小計 $
                                                <el-tag type="danger">
                                                    {{
                                                        toCurrency(
                                                            activity.price,
                                                        )
                                                    }}
                                                </el-tag>
                                                元
                                            </p>
                                        </div>
                                    </el-card>
                                </el-timeline-item>
                            </template>
                        </transition-group>
                    </el-timeline>
                </div>
                <!--  -->
                <el-divider v-show="!isLoading">
                    <p class="tw-text-2xl">
                        總計 $
                        <el-text type="danger">
                            <span class="tw-text-2xl">
                                {{ toCurrency(totalPrice) }}
                            </span>
                        </el-text>
                        元
                    </p>
                </el-divider>
            </div>
        </template>
    </div>
</template>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 1s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
