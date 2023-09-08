<script setup lang="ts">
import format from 'date-fns/format'
import router from "@/router";
import type { IEventItem } from '@/stores/events';
const props = defineProps<{ item: IEventItem }>();

const goToDetail = () => {
    router.push('/admin/event/' + props.item.id)
}
</script>

<template>
    <section class="flex flex-column gap-2 w-full md:w-4 lg:w-4 xl:w-4 sm:max-w-14rem item">
        <article class="border-1 surface-0 surface-border pt-2">
            <img src="/assets/img/event/innovations.png" class="col-12 py-0 w-full" />
            <h2 class="col-12 inter-normal black-1 py-0 m-0" style="font-size: 15px; font-weight: 700;">{{ props.item.name
            }}</h2>
            <p class="col-12 inter-normal grey-2 py-0 m-0" style="font-size: 12px; font-weight: 700;">at {{
                props.item.location }}</p>
            <div class="col-12 flex py-1 gap-2 align-items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
                    <path
                        d="M4.875 1.25C4.52982 1.25 4.25 1.52982 4.25 1.875V2.5H3.625C2.93464 2.5 2.375 3.05964 2.375 3.75V5H13.625V3.75C13.625 3.05964 13.0654 2.5 12.375 2.5H11.75V1.875C11.75 1.52982 11.4702 1.25 11.125 1.25H10.5C10.1548 1.25 9.875 1.52982 9.875 1.875V2.5H6.125V1.875C6.125 1.52982 5.84518 1.25 5.5 1.25H4.875Z"
                        fill="black" />
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M13.625 6.25H2.375V11.875C2.375 12.5654 2.93464 13.125 3.625 13.125H12.375C13.0654 13.125 13.625 12.5654 13.625 11.875V6.25ZM4.25 8.125C4.25 7.77982 4.52982 7.5 4.875 7.5H6.125C6.47018 7.5 6.75 7.77982 6.75 8.125V8.75C6.75 9.09518 6.47018 9.375 6.125 9.375H4.875C4.52982 9.375 4.25 9.09518 4.25 8.75V8.125Z"
                        fill="black" />
                </svg>
                <p class="inter-normal black-1 md:text-xs font-italic" style="font-weight: 400; font-size: 12px;">
                    {{ format(new Date(props.item.date), 'EEE, MMM Lo, yyyy') }}
                </p>
            </div>
            <div class="col-12 flex py-1 gap-2 align-items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
                    <path
                        d="M8 0C6.51664 0 5.06659 0.439867 3.83323 1.26398C2.59986 2.08809 1.63856 3.25943 1.07091 4.62987C0.50325 6.00032 0.354725 7.50832 0.644114 8.96317C0.933503 10.418 1.64781 11.7544 2.6967 12.8033C3.7456 13.8522 5.08197 14.5665 6.53683 14.8559C7.99168 15.1453 9.49968 14.9967 10.8701 14.4291C12.2406 13.8614 13.4119 12.9001 14.236 11.6668C15.0601 10.4334 15.5 8.98336 15.5 7.5C15.5 6.51508 15.306 5.53981 14.9291 4.62987C14.5522 3.71993 13.9997 2.89314 13.3033 2.1967C12.6069 1.50026 11.7801 0.947814 10.8701 0.570903C9.96019 0.193993 8.98492 0 8 0ZM8 13.5C6.81331 13.5 5.65328 13.1481 4.66658 12.4888C3.67989 11.8295 2.91085 10.8925 2.45673 9.7961C2.0026 8.69974 1.88378 7.49334 2.11529 6.32946C2.3468 5.16557 2.91825 4.09647 3.75736 3.25736C4.59648 2.41824 5.66558 1.8468 6.82946 1.61529C7.99335 1.38378 9.19975 1.5026 10.2961 1.95672C11.3925 2.41085 12.3295 3.17988 12.9888 4.16658C13.6481 5.15327 14 6.31331 14 7.5C14 9.0913 13.3679 10.6174 12.2426 11.7426C11.1174 12.8679 9.5913 13.5 8 13.5ZM8 3C7.80109 3 7.61032 3.07902 7.46967 3.21967C7.32902 3.36032 7.25 3.55109 7.25 3.75V7.065L5.675 7.9725C5.53052 8.05437 5.4173 8.18188 5.35309 8.33503C5.28888 8.48818 5.27732 8.65831 5.32021 8.81874C5.36311 8.97918 5.45804 9.12083 5.59011 9.2215C5.72219 9.32217 5.88394 9.37616 6.05 9.375C6.18138 9.3759 6.3107 9.34228 6.425 9.2775L8.375 8.1525L8.4425 8.085L8.5625 7.9875C8.59183 7.95037 8.61698 7.91013 8.6375 7.8675C8.66195 7.82723 8.68206 7.7845 8.6975 7.74C8.7179 7.69231 8.73056 7.64167 8.735 7.59L8.75 7.5V3.75C8.75 3.55109 8.67098 3.36032 8.53033 3.21967C8.38968 3.07902 8.19891 3 8 3Z"
                        fill="black" />
                </svg>
                <p class="inter-normal black-1 md:text-xs" style="font-weight: 400; font-size: 12px;">Start at {{ format(new
                    Date(props.item.date),
                    'hh:mm aa') }}</p>
            </div>
            <div class="col-12 flex py-1 gap-2 align-items-center">
                <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink">
                    <rect x="0.5" width="15" height="15" fill="url(#pattern0)" />
                    <defs>
                        <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image0_2039_141290" transform="scale(0.0104167)" />
                        </pattern>
                        <image id="image0_2039_141290" width="96" height="96"
                            xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAABw0lEQVR4nO2YTUokYRBEHzo7f+4xo5dQ0LPooDO0elJFvYq6CXGohYiLgW4rvsL3ILYNFZEZWV0gIiIiIiIiIiIiIiICUazjwdoYAAaQBQ+CG4AB1KcwbkDfiFhBfTNSkDcAA6hPYdyAvhGxgvpmpCBvAAZQn8K4AX0jYgX1zUhB3gAMoD6FcQP6RsQK6puRgrwBGEB9CuMG9I2IFdQ3IwV5A1h4ADvAAbAC7geYqAyuW+AP8GvybqNsTz/+MsCDZjA9AefAFjNwYgh8NP+Imfk7wNRlEJ1R4AfwMMDDZ4DOn6V2PuNqAANS1iVFDgcwIGX9bAawN4ABKWu3GcD+AAbkOwdgBfHvD1eNmwEmMGW9vY7Teg19HMCAlHU3fSGYndUAD59B9Htu80/9FMH7AJ6B47lq523y/RjHpyFcfEUd7U5vO9d+euB/b8Jq+oS/kVfUdr9m4TIADKA+hXED+kbECuqbkYK8ARhAfQrjBvSNiBXUNyMFeQMwgPoUxg3oGxErqG9GCvIGYAD1KYwb0DciVlDfjBTkDcAA6lMYN6BvRKygvhkpyBuAAdSnMG5A34gstYJERERERERERERERIRF8wr8OSY0XPGLmQAAAABJRU5ErkJggg==" />
                    </defs>
                </svg>
                <p class="inter-normal black-1 md:text-xs" style="font-weight: 400; font-size: 12px;">Start from RM {{
                    props.item.ticket_prize }}</p>
            </div>
            <div class="flex col-12">
                <Button label="BUY" class="btn-buy">
                    <template #default>
                        <div class="mx-auto">
                            <p class="inter-normal" style="font-size: 16px; font-weight: 600;">BUY</p>
                        </div>
                    </template>
                </Button>
            </div>
        </article>
        <div class="flex gap-2 align-items-center justify-content-center">
            <p class="inter-normal black-1" style="font-size: 20px; font-weight: 700;">Event 1</p>
            <div>
                <Button link size="small" @click="goToDetail" class="justify-content-center" style="width:20px">
                    <i class="pi pi-pencil text-700 text-sm"></i>
                </Button>
                <Button link size="small" class="justify-content-center" style="width:20px">
                    <i class="pi pi-trash text-700 text-sm"></i>
                </Button>
            </div>
        </div>
    </section>
</template>


<style scoped lang="scss">
.inter-normal {
    font-family: Inter;
    font-style: normal;
    font-weight: 700;
    line-height: 160%;
}

.dm-sans-normal {
    font-family: DM Sans;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.12px;
}

.poppins-normal {
    font-family: Poppins;
    font-style: normal;
    line-height: 160%;
}

.black-1 {
    color: var(--font-1, #001125);
}

.black-2 {
    color: #000;
}

.white-1 {
    color: var(--White, #FFF);
}

.grey-1 {
    color: #9F9F9F;
}

.grey-2 {
    color: #6E6893;
}

.suggested-orange {
    color: var(--Suggested-orange, #E96853);
}

.btn-buy {
    width: 100%;
    background-color: #E26954;
    border: 0;
}

.btn-buy:hover {
    background-color: #E26954;
}

.pi svg path {
    fill: black
}

.text-super-small {
    font-size: 8px;
}

@media only screen and (min-width: 768px) {
    .container {
        max-width: 225px;
    }
}

.item {
    min-width: 230px;

    article {
        padding: 5px;

        img {
            padding: 0;
            margin: 0;
        }
        h2, p, div {
            padding: 0;
        }
    }
}
</style>